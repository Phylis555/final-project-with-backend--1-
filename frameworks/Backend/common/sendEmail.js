const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const sendgridTransport = require('nodemailer-sendgrid-transport');

const username = "instantgivingproject@gmail.com";
const senderEmail = "instantgivingproject@gmail.com";
const password = "1728394652Instant!";


const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  },
}));
var transporter2 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: username,
    pass: password,
  },
});

var transporter3 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: username,
    pass: password,
  },
});

var transporter4 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: username,
    pass: password,
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
      html: '<h1>You successfully singed up!</h1>'
    })
  };
  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
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
  sendAcceptedEmail,
  sendRejectedEmail,
  sendDonationDeletedEmail,
  sendOrganizationEmail,
};
