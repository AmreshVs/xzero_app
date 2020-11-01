import { object, string } from 'yup';
import AsyncStorage from '@react-native-community/async-storage';

export const inputsValidationSchema = () =>
  object().shape({
    email: string().email().required().label('Email'),
    password: string().required().label('Password'),
  });

export const saveUserDataLocally = async (key = 'xzero_user', value) => {
  try {
    await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
  } catch (e) {
    // console.log(e);
  }
};
