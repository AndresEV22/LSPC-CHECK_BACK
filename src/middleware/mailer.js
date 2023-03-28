const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'dee.west@ethereal.email',
        pass: 'SxMZSvk8N4NWV3N1EN'
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
