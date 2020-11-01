import { object, string, ref } from 'yup';
import { phoneRegExp } from 'constants/common';

export const inputsValidationSchema = () =>
  object().shape({
    email: string().email().required().label('Email'),
    phone: string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required()
      .label('Phone Number'),
    dob: string().required().label('Date of Birth'),
  });

export const passwordValidationSchema = () =>
  object().shape({
    email: string().email().required().label('Email'),
    phone: string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required()
      .label('Phone Number'),
    dob: string().required().label('Date of Birth'),
    password: string().required().label('Password'),
    repassword: string()
      .oneOf([ref('password'), null], 'Passwords must match')
      .required()
      .label('Retype Password'),
  });

export const passwordInputs = [
  { name: 'password', icon: 'key' },
  { name: 'repassword', icon: 'key' },
];

export const inputs = [
  { name: 'email', icon: 'at' },
  { name: 'phone', icon: 'phone-alt' },
  { name: 'dob', icon: 'birthday-cake' },
];
