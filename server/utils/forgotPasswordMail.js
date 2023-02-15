const forgotPasswordMail = (token, name) => {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>P-PAY Verification code</title>
    <style>
      body {
        background-color: #f2f2f2;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 30px;
        text-align: center;
        border-radius: 10px;
      }
      h1 {
        font-size: 36px;
        color: #333;
        margin-bottom: 20px;
      }
      p {
        font-size: 18px;
        color: #333;
        margin-bottom: 20px;
      }
      .otp {
        font-size: 36px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
      }
      .action-button {
        background-color: #00baf7;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        margin-top: 20px;
        display: inline-block;
      }
      span {
       font-size: 24px;
        color: #00baf7; 
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Reset Password</h1>
      <p>Hi <span>${name}</span> We've received a request to reset your password for your P-PAY account.
      If you did not make this request, please ignore this email.</p>
      <p>This Link is valid for only 10 minutes. If you did not sign up for P-PAY, please Contact us </p>
      <a href='${process.env.CLIENT_ORIGIN}/resetPassword?token=${token}' class="action-button">Reset Password</a>
    </div>
  </body>
    </html>`;
};

module.exports = forgotPasswordMail;
