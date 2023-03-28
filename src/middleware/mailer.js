const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        user: 'mensajeriajl2@gmail.com',
        pass: 'oinxehfwqxduocxe'
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
