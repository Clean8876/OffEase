// import crypto from 'crypto';

// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ; // 32 bytes
// const IV_LENGTH = 16;

// export function encrypt(text) {
//   const iv = crypto.randomBytes(IV_LENGTH);
//   const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return iv.toString('hex') + ':' + encrypted.toString('hex');
// }

// export function decrypt(text) {
//   const [ivStr, encryptedText] = text.split(':');
//   const iv = Buffer.from(ivStr, 'hex');
//   const encrypted = Buffer.from(encryptedText, 'hex');
//   const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
//   let decrypted = decipher.update(encrypted);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }
