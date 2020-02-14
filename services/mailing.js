const mail = require('../util/mailer');

exports.welcomeMail = async (to, username) => {
  const html = `
  <p style="padding:1rem;">
  Dear <strong>${username}</strong>.<br/>
  Welcome to Docgen. Thank you for registering! <br/>
  Have a nice day =)
  </p>
  `;
  return await mail(to, html, 'Welcome to Docgen');
}

exports.sendLink = async (to, user) => {
  const url = `${user.url}/change-password?code=${user.code}&email=${user.email}`
  const html = `
  <p style="padding:1rem;">
  Hello ${user.name}!
  <br>
  You have requested the change of your password. <br/><br/>
  To change your password please follow this link: <a href="${url}">${url}<a>
  <br/><br/>If you haven't requested it please ignore this message.
  </p>
  `;
  return await mail(to, html, 'Change password request');
}