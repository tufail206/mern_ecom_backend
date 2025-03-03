const emailTemplate = (verifyToken) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              text-align: center;
          }
          h2 {
              color: #333;
          }
          p {
              font-size: 16px;
              color: #555;
          }
          .btn {
              display: inline-block;
              padding: 12px 24px;
              margin-top: 20px;
              font-size: 16px;
            
               color: #fff;
               
              background: #007BFF;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
          }
            a{
               color: #fff;
               }
          .btn:hover {
              background: #0056b3;
               color: #fff;
          }
          .footer {
              margin-top: 20px;
              font-size: 14px;
             
          }
        .white{
        color: #fff;}
      </style>
  </head>
  <body>
      <div class="container">
          <h2>Welcome to Our Service!</h2>
          <p>Thank you for signing up. Please verify your email to activate your account.</p>
          <a href="${process.env.CLIENT_URL}/verify-email?token=${verifyToken}" class="btn white">Verify Your Email</a>
          <p class="footer">If you did not create an account, please ignore this email.</p>
      </div>
  </body>
  </html>
  `;
};

module.exports= emailTemplate;
