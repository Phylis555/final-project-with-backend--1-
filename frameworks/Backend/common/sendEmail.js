const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const sendgridTransport = require('nodemailer-sendgrid-transport');

const username = "foodforallplatform@gmail.com"
const senderEmail = "foodforallplatform@gmail.com"
const password = "loqwplnxvfonmfyi"

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  },
}));
var transporter2 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "foodforallplatform@gmail.com",
    pass: "loqwplnxvfonmfyi",
  },
});

var transporter3 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "foodforallplatform@gmail.com",
    pass: "loqwplnxvfonmfyi",
  },
});

var transporter4 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "foodforallplatform@gmail.com",
    pass: "loqwplnxvfonmfyi",
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    viewPath: "./common/views/",
  })
);
transporter2.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    viewPath: "./common/views/accepted",
  })
);
transporter3.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    viewPath: "./common/views/rejected",
  })
);
transporter4.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    viewPath: "./common/views/deleted",
  })
);
function sendEmail(email, text) {
    transporter.sendMail({
      to: email,
      from: 'instantgivingproject@gmail.com',
      subject: 'Signup succeeded!',
      html: '<h1>You successfully signed up!</h1>'
    })
}
function sendResetEmail(email, token) {
  console.log(email);
  console.log(token);
  transporter.sendMail({
    to: email,
    from: 'instantgivingproject@gmail.com',
    subject: 'איפוס סיסמה',
    html: `
    <div dir="rtl" style="font-family: 'Arial', sans-serif;  text-align: center; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #007bff; text-align: center;">בקשת איפוס סיסמה</h2>
    <p style="font-size: 18px;">שלום,</p>
    <p style="font-size: 18px;">קיבלנו בקשה לאיפוס הסיסמה שלך.</p>
    <p style="font-size: 18px;">לחץ על הלינק הבא כדי לאפס את הסיסמה שלך:</p>
    <a href="http://localhost:3000/user/changePassword/${token}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; text-align: center; margin-top: 20px;">אפס סיסמה</a>
    <p style="font-size: 16px; margin-top: 20px; color: #555;">אם אינך מזהה את בקשה זו, ניתן להתעלם מהודעה זו</p>
  </div>
  
  `
  })
}

function sendAcceptedEmail(email, text) {
  var mailOptions = {
    from: "foodforallplatform@gmail.com",
    to: email,
    subject: "Your request has been accepted",
    text: `${text}`,
    template: "index",
    context: {
      name: text,
    },
  };
  transporter2.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function sendRejectedEmail(email, text) {
  var mailOptions = {
    from: "foodforallplatform@gmail.com",
    to: email,
    subject: "Your request has been rejected",
    text: `${text}`,
    template: "index",
    context: {
      name: text,
    },
  };
  transporter3.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function sendDonationDeletedEmail(email, text) {
  var mailOptions = {
    from: "foodforallplatform@gmail.com",
    to: email,
    subject: "The donation you have sent a request has been deleted",
    text: `${text}`,
    template: "index",
    context: {
      name: text,
    },
  };
  transporter4.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}


// For organization emails
var transporterOrganizationEmails = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: username,
    pass: password,
  },
});

transporterOrganizationEmails.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    viewPath: "./common/views/organizationEmails",
  })
)

function sendOrganizationEmail(email, emailSubject, text) {
  var mailOptions = {
    from: senderEmail,
    to: email,
    subject: emailSubject,
    text: `${text}`,
    template: "index",
    context: {
      emailText: text,
    },
  };
  transporterOrganizationEmails.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  sendEmail,
  sendResetEmail,
  sendAcceptedEmail,
  sendRejectedEmail,
  sendDonationDeletedEmail,
  sendOrganizationEmail,
};
