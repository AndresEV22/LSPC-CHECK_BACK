const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const db = require("../config/sequelize");
const { Op } = require('sequelize');
const User = db.user;
const {sendEmail}=require('../middleware/mailer');

exports.sendPasswordResetEmail = async (req, res) => {
  try {
    const {email} = req.body;
    console.log("User model:", User); // check if tbl_users is defined
    console.log('email:', email); // check if email is defined
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
        from: 'lspc.check@gmail.com',
        to: email,
        subject: 'Restablecimiento de contraseña',
        html: `Por favor ingresa a este link para reestablecer la contraseña: <a href="${resetUrl}">${resetUrl}</a>`
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