import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation userLogin($input: UserLoginInput!){
    userlogin(input: $input){
      jwt
      user{
        id
        username
        email
        mobile_number
        dob
        confirmed
        provider
        address
        show_popup
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
  mutation createNewUser($input: UserInput!){
    createNewUser(
      input: $input
    ){
      jwt
      user{
        id
        username
        email
        mobile_number
        birthday
        confirmed
        provider
        address
        show_popup
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
    updateUserData(input: {
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
        provider
        address
        show_popup
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
        provider
        address
        mobile_number
        show_popup
      }
    }
  }
`;

export const ADD_FAVOURITE = gql`
  mutation addAsFavourite($user_id: Int!, $offer_id: Int!, $center: Int){
    AddAsFavourite(user: $user_id, offer: $offer_id, center: $center)
  }
`;

export const CLEAR_FAVOURITES = gql`
  mutation clearFavourites($user_id: Int!){
    ClearAllFavourites(user: $user_id)
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
      disabled
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
  mutation EditAddress($user_id: ID!, $username: String!, $address: String!){
    updateUserData(input: {
      where: {
        id: $user_id
      },
      data: {
        username: $username,
        address: $address
      }
    }){
      user{
        username
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
  mutation SendSms($user: Int!, $mobile: String, $lang: String){
    SendSms(user: $user, mobile: $mobile, lang: $lang){
      otp
      msg
      balance
      status
    }
  }
`;

export const VOUCHER_QUEUE = gql`
  mutation VoucherQueue($user: Int!, $voucher: Int!){
    VoucherQueue(user: $user, voucher: $voucher){
      queueCount
      disabled
      msg
    }
  }
`;

export const CREATE_NON_USER = gql`
  mutation CreateNonUser($data: NonUserInput){
    createNonUser(input: {
      data: $data
    }){
      nonUser{
        id
      }
    }
  }
`;

export const UPDATE_USER_NEW = gql`
  mutation updateUser($user_id: ID!, $data: editUserInput ){
    updateUser(input: {
      where: {
        id: $user_id
      },
      data: $data
    }){
      user{
        id
        language
      }
    }
  }
`;

export const MARK_NOTIFICATION = gql`
  mutation MarkNotification($user_id: Int!, $notification_id: Int!){
    MarkAsRead(user: $user_id, notification: $notification_id)
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation updateUser($user_id: ID!, $language: String! ){
    updateUser(input: {
      where: {
        id: $user_id
      },
      data: {
        language: $language,
      }
    }){
      user{
        id
        language
      }
    }
  }
`;