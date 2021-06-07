var nodemailer = require('nodemailer');

var mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bvsolk@ukr.net',
    pass: 'gelik2002'
  }
});

var mailOptions = {
   from: 'bvsolk@ukr.net',
   to: 'mister02.rv@gmail.com, rv.volovik88@gmail.com',
   subject: 'Why not try your hand at trading!',
   text: 'Hello, dear trader! I want to share with you my forex trading experience, excellent broker Weltrade \
Weltrade are your well Life \
\
Link for Weltrade: https://weltrade.com.ua/?r1=ipartner&r2=38688 \
And also Code: 38688 \
\
From trader as you are.'
}

mail.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
});
