const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        user: 'jjear.lspc.check.adms@gmail.com',
        pass: 'xjgbhukqhbzddqwr'
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
