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

export const inputs = [
  { name: 'bank_name', icon: 'university' },
  { name: 'holder_name', icon: 'user' },
  { name: 'account_number', icon: 'grip-horizontal' },
  { name: 'IBAN_number', icon: 'grip-horizontal' },
];
