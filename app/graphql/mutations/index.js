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
        confirmed
        membership{
          id
          package{
            id
            name_en
            name_ar
          }
        }
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
        confirmed
        membership{
          id
          package{
            id
            name_en
            name_ar
          }
        }
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
        confirmed
        membership{
          id
          package{
            id
            name_en
            name_ar
          }
        }
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
        confirmed
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
  mutation generateMembership($user_id: ID!, $plan: Int!, $code: String){
    generateMembership(user_id: $user_id, plan: $plan, code: $code){
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
  mutation BuyVoucher($user_id: ID!, $voucher_id: Int!, $code: String){
    BuyVoucher(user_id: $user_id, voucher_id: $voucher_id, code: $code){
      disabled
      bought
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

export const WITHDRAW_AMOUNT = gql`
  mutation WithdrawMoney($user_id: Int!, $withdraw_amount: Int!){
    WithdrawMoney(user: $user_id, withdrawAmount: $withdraw_amount){
      msg
      withdrawal{
        id
        withdraw_amount
        remaining_amount
      }
    }
  }
`;

export const CREATE_BANK_INFO = gql`
  mutation CreateBankDetail($user_id: ID!, $bank_name: String!, $account_number: String!, $iban: String!, $holder_name: String!){
    createBankDetail(input: {
      data: {
        user: $user_id,
        bank_name: $bank_name,
        account_number: $account_number,
        iban: $iban,
        holder_name: $holder_name
      }
    }){
      bankDetail{
        id
        holder_name
        bank_name
        account_number
        iban
      }
    }
  }
`;

export const UPDATE_BANK_INFO = gql`
  mutation UpdateBankDetail($id: ID!, $bank_name: String!, $account_number: String!, $iban: String!, $holder_name: String!){
    updateBankDetail(input: {
      where: {
        id: $id
      },
      data: {
        bank_name: $bank_name,
        account_number: $account_number,
        iban: $iban,
        holder_name: $holder_name
      }
    }){
      bankDetail{
        id
        holder_name
        bank_name
        account_number
        iban
      }
    }
  }
`;

export const LOG_ERROR = gql`
  mutation CreateErrorLog($data: ErrorLogInput){
    createErrorLog(input: {
      data: $data
    }){
      errorLog{
        id
      }
    }
  }
`;

export const LOG_PAYMENT = gql`
  mutation CreatePaymentResponse($data: PaymentResponseInput){
    createPaymentResponse(input: {
      data: $data
    }){
      paymentResponse{
        id
      }
    }
  }
`;

export const SEND_SMS = gql`
  mutation SendSms($user: Int!, $mobile: Long, $lang: String){
    SendSms(user: $user, mobile: $mobile, lang: $lang){
      otp
      msg
      balance
    }
  }
`;