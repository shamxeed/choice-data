import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
  if (password.length < 6) throw new Error('Password is too short!');
  return bcrypt.hash(password, 10);
};
