import { object, string, ref } from 'yup';
import { phoneRegExp } from 'constants/common';

export const inputsValidationSchema = () =>
  object().shape({
    fullname: string().required().label('Fullname'),
    email: string().email().required().label('Email'),
    phone: string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required()
      .label('Phone Number'),
    password: string().required().label('Password'),
    repassword: string().oneOf([ref('password'), null], 'Passwords must match').required().label('Retype Password'),
    dob: string().required().label('Date of Birth'),
  });

export const inputs = [
  { name: 'fullname', icon: 'user', marginTop: 0 },
  { name: 'email', icon: 'at' },
  { name: 'phone', icon: 'phone_alt' },
  { name: 'password', icon: 'key' },
  { name: 'repassword', icon: 'key' },
  { name: 'dob', placeholder: 'DOB - DD-MM-YYYY', icon: 'birthday_cake' },
];