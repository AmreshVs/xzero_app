import { object, string } from 'yup';
import { phoneRegExp } from 'constants/common';

export const inputsValidationSchema = () =>
  object().shape({
    fullname: string().required().label('Fullname'),
    phone: string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required()
      .label('Phone Number'),
    address: string().required().label('Address'),
  });

export const inputs = [
  { name: 'fullname', icon: 'user' },
  { name: 'phone', icon: 'phone-alt' },
  { name: 'address', icon: 'map' },
];
