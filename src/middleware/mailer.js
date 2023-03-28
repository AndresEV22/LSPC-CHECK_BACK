const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rogelio.rath33@ethereal.email',
        pass: 'BbsFzJMMzGWNtu1Uqe'
    }
})

transporter.verify().then(() => {
    console.log('Listo para enviar emails 😎');
});

const sendEmail = async(message)=>{
    try {
        await transporter.sendMail(message);
    } catch (error) {
        console.log(error);
    }
};

module.exports ={sendEmail};
