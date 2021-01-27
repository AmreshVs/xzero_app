import { object, string } from 'yup';

export const inputsValidationSchema = () =>
  object().shape({
    bank_name: string().required().label('Bank Name'),
    holder_name: string().required().label('Holder Name'),
    account_number: string().required().label('Account Name'),
    IBAN_number: string().required().label('IBAN Number'),
  });

export const inputs = [
  { name: 'bank_name', icon: 'university' },
  { name: 'holder_name', icon: 'user' },
  { name: 'account_number', icon: 'grip_horizontal' },
  { name: 'IBAN_number', icon: 'grip_horizontal' },
];
