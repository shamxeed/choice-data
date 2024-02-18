export const name = {
  pattern: (value) => value?.trim()?.length >= 3,
  message: 'Please enter a valid name!',
};

export const amount = {
  pattern: (value) => Number(value) >= 100,
  message: 'Please enter a valid amount!',
};

export const thousand = {
  pattern: (value) => Number(value) >= 1000,
  message: 'Please enter a valid amount!',
};

export const mobileNum = {
  pattern: (value) => value?.trim()?.length === 11,
  message: 'Please enter a valid mobile number!',
};

export const pin = {
  pattern: (value) => value?.trim()?.length === 4,
  message: 'Please enter a valid pin!',
};

export const otp = {
  pattern: (value) =>
    value?.trim()?.length === 5 || value?.trim()?.length === 6,
  message: 'Please enter a valid OTP!',
};

export const nin = {
  pattern: (value) => value?.trim()?.length === 11,
  message: 'Please enter a valid NIN!',
};

export const elevenChars = {
  pattern: (value) => value?.trim()?.length === 11,
  message: 'Please enter a valid ',
};

export const trackingId = {
  pattern: (value) => value?.trim()?.length === 16,
  message: 'Please enter a valid tracking ID!',
};

export const email = {
  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  message: 'Please enter a valid email address!',
};

export const password = {
  pattern: /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/,
  shortMessage: 'Please enter a valid password',
  message:
    'Oops! Passwords must include at least 1 letter, 1 number and minimum of 6 characters overall.',
};
