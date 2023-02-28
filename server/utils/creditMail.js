const creditMail = (sender, receiver, amount) => {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Money Received!</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #333333;
      }

      .container {
        text-align: center;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
      }

      .logo {
        text-align: center;
        margin-bottom: 20px;
      }

      .logo img {
        max-width: 300px;
        width: 200px;
      }

      h1 {
        font-size: 24px;
        margin: 0 0 10px;
        color: #000000;
      }

      p {
        margin: 0 0 10px;
        line-height: 1.5;
      }

      .footer {
        text-align: center;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #CCCCCC;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
            <img src="https://ppay.blob.core.windows.net/p-pay-logo/ppay-logo.png" alt="Logo">
      </div>
      <h1>You've Received Money!</h1>
      <p>Congratulations <strong style="color: #000000;">@${receiver}</strong>! You've received money from  <strong style="color: #000000;">@${sender}</strong>.</p>
      <p>The amount you received is <strong style="display: block;font-size: 1.4rem;color: #000000;">₦${amount}</strong></p>
      <div class="footer">
        <p>This email was sent by P-PAY.</p>
      </div>
    </div>
  </body>
</html>
`;
};

module.exports = creditMail;
