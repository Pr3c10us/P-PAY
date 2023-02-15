const verificationMail = (code, email, authenticationRoute) => {
    if (authenticationRoute !== 'emailVerification') {
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
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to P-PAY</h1>
      <p>Please complete the verification/authentication process by entering the provided code in the app:</p>
      <p class="otp">{{ ${code} }}</p>
      <p>This CODE is valid for 10 minutes. If you did not sign up for P-PAY, please ignore this email.</p>
    </div>
  </body>
    </html>`;
    }
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
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to P-PAY</h1>
      <p>Please complete the verification/authentication process by entering the provided code in the app:</p>
      <p class="otp">{{ ${code} }}</p>
      <p>This CODE is valid for 10 minutes. If you did not sign up for P-PAY, please ignore this email.</p>
      <a href='${process.env.CLIENT_ORIGIN}/${authenticationRoute}?email=${email}' class="action-button">Confirm</a>
    </div>
  </body>
    </html>`;
};

module.exports = verificationMail;
