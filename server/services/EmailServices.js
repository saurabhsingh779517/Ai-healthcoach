const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationUrl =
    `${process.env.CLIENT_URL}/verify-email/${token}`;

  const mailOptions = {
    from: `"AI Health Coach" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your AI Health Coach Account",

    html: `
      <div>
        <h2>Welcome to AI Health Coach</h2>

        <p>
          Thank you for creating an account.
        </p>

        <p>
          Please click the button below to verify your email address.
        </p>

        <a
          href="${verificationUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #0011ffe4;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          "
        >
          Verify My Account
        </a>

        <p>
          This verification link will expire in 15 minutes.
        </p>

        <p>
          If you did not create this account, you can ignore this email.
        </p>
      </div>
    `,
  };

const info =  await transporter.sendMail(mailOptions);
   console.log("MESSAGE ID:", info.messageId);
console.log("RESPONSE:", info.response);
console.log("ACCEPTED:", info.accepted);
console.log("REJECTED:", info.rejected); 

return info;
};

module.exports = sendVerificationEmail;