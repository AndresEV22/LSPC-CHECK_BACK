const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const db = require("../config/sequelize");
const { Op } = require('sequelize');
const User = db.user;
const {sendEmail}=require('../middleware/mailer');

exports.sendPasswordResetEmail = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({where: {email}}); // update model name
    if (!user) {
        return res.status(400).json({message: 'No existe ningún usuario con ese correo electrónico'});
    }

    // Generar un token de un solo uso con una duración de 1 hora
    const token = crypto.randomBytes(20).toString('hex');
    const expireAt = new Date(Date.now() + 60 * 60 * 1000);

    // Almacenar el token en la base de datos para su verificación posterior
    await user.update({resetPasswordToken: token, resetPasswordTokenExpiresAt: expireAt});

    const resetUrl = `https://lspc-check.github.io/reset-password/${token}`;
    const message = {
        from: '"LSPC-CHECK"<jjear.lspc.check.adms@gmail.com>',
        to: email,
        subject: 'Restablecimiento de contraseña',
        html: `
            <div style="width: 500px; text-align: center;">
                <h1 style=" margin: auto; font-family: Verdana, Geneva, Tahoma, sans-serif; border-bottom: solid 3px rgb(0, 11, 160); width: 245px; border-radius: .3rem;">Soporte LSPC</h1>
                <b style=" margin: auto; margin-top: 50px; font-size: smaller; font-family: Verdana, Geneva, Tahoma, sans-serif;">Por favor ingresa a este link para reestablecer la contraseña: <a href="${resetUrl}">${resetUrl}</a></b>
                <p style=" margin: auto; width: 300px; background-color: rgb(248, 248, 248); border-radius: 1rem; border-bottom: 2px solid black; font-family: Verdana, Geneva, Tahoma, sans-serif; font-weight: 500; padding: 1rem; text-align: justify; margin-top: 3rem;">©2023 Todos los derechos reservados. Este correo electrónico y su contenido son propiedad exclusiva de LSPC-CHECK, y están destinados únicamente al destinatario original. Si usted no es el destinatario original, por favor notifique al remitente y destruya cualquier copia de este correo electrónico o su contenido. La información contenida en este correo electrónico es confidencial y puede contener información privilegiada. Cualquier divulgación, distribución o reproducción no autorizada está estrictamente prohibida. LSPC-CHECK no acepta ninguna responsabilidad por cualquier pérdida o daño que pueda surgir de cualquier persona que actúe o se base en la información contenida en este correo electrónico o su contenido.</p>
                <div style=" margin: auto; width: 100%; margin-top: 3rem; display: flex; justify-content: space-around; align-items: center; ">
                    <img src="https://imagizer.imageshack.com/img924/382/S093ZF.jpg" style="width: 150px; height: 75px; margin: auto;">
                    <img src="https://imagizer.imageshack.com/img924/9905/ZfIaUq.png" style="width: 150px; height: 150px; margin: auto;">
                </div>
            </div>
        `
    };

    await sendEmail(message);

    res.status(200).json({message: 'El correo electrónico para restablecer la contraseña ha sido enviado'});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Error del servidor'});
  }
};

exports.resetPassword = async(req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        // Buscar un usuario que tenga el token de restablecimiento de contraseña y que no haya expirado
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordTokenExpiresAt: {
                    [Op.gt]: Date.now()
                }
            }
        });      

        if (!user) {
            return res.status(400).json({message: 'El token de restablecimiento de contraseña es inválido o ha expirado'});
        }

        // Hashear la nueva contraseña y guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);
        await user.update({password: hashedPassword, resetPasswordToken: null, resetPasswordTokenExpiresAt: null});

        res.status(200).json({message: 'La contraseña ha sido restablecida con éxito'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error del servidor'});
    }
};
