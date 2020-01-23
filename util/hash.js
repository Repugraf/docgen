const bcrypt = require('bcrypt')

module.exports = password => {
  return new Promise((resolve, reject) => {
    const saltRounds = 14;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if(err) reject(err);
        resolve(hash);
      })
    })
  })
}