const email = `
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
            <p style="line-height:1.5">Please verify your email account with the link below to start writing on Author's Haven.</p>
        </div>
        <div style="width:100%"><a href="{url}" style="background-color: orange; padding: 10px 20px; border-radius: 30px; color: white; text-decoration-line: none; display: block; text-align: center;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.10); transition: all 0.3s cubic-bezier(.25,.8,.25,1);">Verify Account</a></div>       
    </div>
  
</body>
</html>
`;
export default email;
