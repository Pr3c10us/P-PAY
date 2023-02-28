const debitMail = (sender, receiver, amount, date, id) => {
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
        <h1>Payment Confirmation</h1>
        <p>Dear <strong style="color: #000000;">@${sender}</strong> you have successfully sent <strong
                style="color: #000000;font-size: 1.2rem;">₦${amount}</strong> to <strong
                style="color: #000000;">@${receiver}</strong>.</p>
        <p style="text-align: left;">Transaction Details:</p>
        <p><strong>Amount:</strong> <strong style="color: #000000;font-size: 1.5rem;">₦${amount}</strong></p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Reference Id:</strong> ${id}</p>
        <p>If you have any questions regarding this transaction, please don't hesitate to contact us.</p>
        <p>Thank you for using our service!</p>
        </p>
        <div class="footer">
            <p>This email was sent by P-PAY.</p>
        </div>
    </div>
  </body>
</html>
`;
};

module.exports = debitMail;
