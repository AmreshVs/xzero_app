import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation userLogin($identifier: String!, $password: String!){
    userlogin(input:{
      identifier: $identifier,
      password: $password
    }){
      jwt
      user{
        id
        username
        email
        mobile_number
        dob
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createNewUser($username: String!, $email: String!, $mobile_number: Long!, $password: String!, $notification_token: String!, $dob: DateTime){
    createNewUser(
      username: $username,
      email: $email,
      mobile_number: $mobile_number
      password: $password
      notification_token: $notification_token,
      dob: "",
      birthday: $dob
    ){
      jwt
      user{
        id
        username
        email
        mobile_number
        birthday
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($user_id: ID!, $email: String!, $mobile_number: Long!, $password: String, $dob: DateTime! ){
    updateUser(input: {
      where: {
        id: $user_id
      },
      data: {
        email: $email,
        mobile_number: $mobile_number,
        password: $password,
        birthday: $dob
      }
    }){
      user{
        id
        username
        email
        mobile_number
        dob
      }
    }
  }
`;

export const UPDATE_USER_WITHOUT_PASS = gql`
  mutation updateUser($user_id: ID!, $email: String!, $mobile_number: Long! ){
    updateUser(input: {
      where: {
        id: $user_id
      },
      data: {
        email: $email,
        mobile_number: $mobile_number
      }
    }){
      user{
        id
        username
        email
        mobile_number
      }
    }
  }
`;

export const ADD_FAVOURITE = gql`
  mutation addFavourite($user_id: Int!, $offer_id: Int!){
    addFavourite(user_id: $user_id, offer_id: $offer_id)
  }
`;

export const CLEAR_FAVOURITES = gql`
  mutation clearFavourites($user_id: ID!){
    updateUser(
      input: {
        where: { id: $user_id },
        data: { favourites: "" }
      }
    ){
      user{
        favourites
      }
    }
  }
`;

export const UPDATE_NOTIFICATION_TOKEN = gql`
  mutation updateNotificationToken($user_id: ID!, $notification_token: String!, $app_version: String, $platform: String, $provider: String ){
    updateUser(input: {
      where: {
        id: $user_id
      },
      data: {
        notification_token: $notification_token,
        app_version: $app_version,
        platform: $platform,
        provider: $provider
      }
    }){
      user{
        id
        notification_token
      }
    }
  }
`;

export const GENERATE_MEMBESHIP = gql`
  mutation generateMembership($user_id: ID!, $amount: Int!){
    generateMembership(user_id: $user_id, amount: $amount){
      id
      serial
      expiry
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!){
    forgotPassword(email: $email){
      ok
    }
  }
`;

export const GENERATE_GIFT = gql`
  mutation GenerateGift($user_id: Int!){
    GenerateGift(user_id: $user_id){
      won
      gift{
        id
        name_en
        name_ar
        featured_img{
          url
        }
      }
    }
  }
`;