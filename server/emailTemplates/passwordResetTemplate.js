import dotenv from 'dotenv';

dotenv.config();

const resetTemplate = (token) => {
  const template = `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mentee</title>
    </head>
    <body style="background-color: #eee; padding:30px 0">
        <div style=" margin: 50px auto; width: 400px; background-color: white;padding: 20px;color: rgb(90, 89, 89); border-radius: 5px;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.10); transition: all 0.3s cubic-bezier(.25,.8,.25,1)">
            <h2 style="color:navy; text-align: center">Author's Haven</h2>
            <div style="margin-bottom: 30px;">
                <p style="line-height:1.5">Please click the button below to reset your password on the Authors Haven platform.</p>
            </div>
            <div style="width:100%"><a href="${process.env.FRONT_END_URL}/resetpassword/?token=${token}" style="background-color: orange; padding: 10px 20px; border-radius: 30px; color: white; text-decoration-line: none; display: block; text-align: center;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.10); transition: all 0.3s cubic-bezier(.25,.8,.25,1);">Click here to reset your password</a></div>
        </div>

    </body>
    </html>
    `;
  return template;
};
export default resetTemplate;
