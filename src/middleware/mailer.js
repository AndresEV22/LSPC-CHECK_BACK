const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        user: 'lspc.check@gmail.com',
        pass: 'cvyotelonrujjkib'
    }
})

const sendEmail = async(message)=>{
    try {
        await transporter.sendMail(message);
    } catch (error) {
        console.log(error);
    }
};

module.exports ={sendEmail};