import nodemailer from 'nodemailer';
import _ from 'lodash';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jslandclan@gmail.com',
        pass: '1117Yubizach'
    }
});
const mail = {
    from: 'jslandclan@gmail.com',
    to: 'flyboring@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    cc: '',
    bcc: '',
    html: '<p>jslandclan@gmail.com</p>',
    attachments: []
};

const createMail = options;
const mailer = (req, res, next) => {
    next();
};

/**   
 * attachments option in the message object that contains an array of attachment objects.

Attachment object consists of the following properties:

filename - filename to be reported as the name of the attached file.Use of unicode is allowed.
    content - String, Buffer or a Stream contents for the attachment
path - path to the file if you want to stream the file instead of including it(better for larger attachments)
    href – an URL to the file(data uris are allowed as well)
contentType - optional content type for the attachment, if not set will be derived from the filename property
contentDisposition - optional content disposition type for the attachment, defaults to ‘attachment’
cid - optional content id for using inline images in HTML message source
encoding - If set and content is string, then encodes the content to a Buffer using the specified encoding.Example values: ‘base64’, ‘hex’, ‘binary’ etc.Useful if you want to use binary attachments in a JSON formatted email object.
    headers - custom headers for the attachment node.Same usage as with message headers
raw - is an optional special value that overrides entire contents of current mime node including mime headers.Useful if you want to prepare node contents yourself
Attachments can be added as many as you want. */
