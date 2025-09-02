const crypto = require("crypto");
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 24);
const iv = Buffer.alloc(16, 0);

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
}

module.exports = { encrypt, decrypt };
