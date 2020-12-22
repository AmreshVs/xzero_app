import { object, string } from 'yup';
import AsyncStorage from '@react-native-community/async-storage';

export const inputsValidationSchema = () =>
  object().shape({
    email: string().email().required().label('Email'),
    password: string().required().label('Password'),
  });

export const saveUserDataLocally = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key || 'xzero_user'}`, JSON.stringify(value));
  } catch (error) {
    console.log('Saving User Data error', error);
  }
};
