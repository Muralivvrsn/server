const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'muralivvrsn75683@gmail.com',
      pass: 'yhemcpiajbyysfsb'
    }
  });

const sendOTP = async(req,res,next)=>{
    console.log(req.body.email)
    const otp = Math.floor(Math.random() * 900000) + 100000;
      let mailOptions = {
        from: 'muralivvrsn75683@gmail.com',
        to: req.body.email,
        subject: 'OTP for login',
        text: `Your OTP for login is ${otp}. It is valid for 5 minutes.`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
      
      res.json(otp);
  }

  
module.exports ={
    sendOTP
}