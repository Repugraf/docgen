const mail = require('../util/mailer');

exports.welcomeMail = async (to, username) => {
  const html = `
  <p style="padding:1rem;">
  Dear <strong>${username}</strong>.<br>
  Welcome to Docgen. Thank you for registering! <br/>
  Have a nice day =)
  </p>
  `
  return await mail(to, html, 'Welcome to Docgen');
}