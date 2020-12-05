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
  mutation generateMembership($user_id: ID!, $plan: Int!, $promocode: String){
    generateMembership(user_id: $user_id, plan: $plan, promocode: $promocode){
      expiry
      membership{
        id
        serial
        expiry
      }
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

export const BUY_VOUCHER = gql`
  mutation BuyVoucher($user_id: Int!, $voucher_id: Int!, $promocode: String){
    BuyVoucher(user_id: $user_id, voucher_id: $voucher_id, promocode: $promocode){
      disabled
      bought
      VoucherAvailed{
        id
        user{
          username
          email
        }
        is_won
      }
    }
  }
`;

export const APPLY_CODE = gql`
  mutation ApplyCode($receiver: Int!, $price: Int!, $code: String!){
    ApplyCode(receiver: $receiver, price: $price, code: $code){
      discount
      applied
      codeApplied
      discountYouGet
      discountedPrice
    }
  }
`;

export const EDIT_ADDRESS = gql`
  mutation EditAddress($user_id: ID!, $username: String, $mobile_number: Long, $address: String){
    updateUser(input: {
      where: {
        id: $user_id
      },
      data: {
        username: $username,
        mobile_number: $mobile_number,
        address: $address
      }
    }){
      user{
        id
        username
        mobile_number
        address
      }
    }
  }
`;

// export const WITHDRAW_AMOUNT = gql`

// `;