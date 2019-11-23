const ServerVerifyMailConfig = (tokens, auth) => {
    // const html = HomeTemplate(
    //     {
    //         field: {
    //             text: 'Please Verify Your Email',
    //             href: 'https://dev.askmirror.local:5001/api/auth/email/verify/callback?status=success&method=verifyMail&token=' + tokens.accessToken
    //         },
    //         greeding: 'Hi ' + auth.user.name + ' Welcome'
    //     },
    //     { title: 'Verify' }
    // );
    const verifyMailConfig = {
        from: ' no-relpy-jslandclan@gmail.com',
        to: auth.username,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        cc: '',
        bcc: '',
        html: '',
        attachments: []
    };
    return verifyMailConfig;
};

module.exports = ServerVerifyMailConfig;
