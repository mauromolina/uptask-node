const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass,
    }
  });

const generateHtml = (htmlFile, opt = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/emails/${htmlFile}.pug`, opt);
  return juice(html);
}

exports.send = async opt => {

  const html = generateHtml(opt.htmlFile, opt);
  const text = htmlToText.fromString(html)
  
  let info = transport.sendMail({
      from: '"UpTaskMM 👻" <noreply@uptaskmm.com>',
      to: opt.user.email,
      subject: opt.subject,
      text,
      html
    });

}
