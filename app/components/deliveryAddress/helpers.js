import { object, string } from 'yup';

export const inputsValidationSchema = () =>
  object().shape({
    fullname: string().required().label('Fullname'),
    address: string().required().label('Address'),
  });

export const inputs = [
  { name: 'fullname', icon: 'user' },
  { name: 'address', icon: 'map' },
];
