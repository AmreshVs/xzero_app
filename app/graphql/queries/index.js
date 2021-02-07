import { gql } from '@apollo/client';

export const GET_USER = gql`
  query User($ID: ID!){
    user(id: $ID){
      id
      username
      email
      mobile_number
      blocked
      language
      notification_token
      favourites
      dob
      birthday
      created_at
      address
      show_popup
      confirmed
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query getUsersByEmail($email: String!){
    users(where: {
      email: $email
    }){
      id
      username
      email
      mobile_number
      blocked
      language
      notification_token
      favourites
      address
      show_popup
    }
  }
`;

export const GET_HOME = gql`
  query GetHome($user_id: Int!, $user: ID!){
    HomeCounts(user: $user_id)
    user(id: $user) {
      membership {
        expiry
      }
    }
    notificationCount(user: $user_id)
    banners {
      id
      banner_img_en {
        url
      }
      banner_img_ar {
        url
      }
    }
    categoriesWithCenterCount
    topCenters(where: { homescreen: true })
  }
`;

export const GET_CENTERS = gql`
  query TopCenters($where: JSON){
    topCenters(where: $where)
  }
`;

export const OFFERS_LIST = gql`
  query offersList($where: JSON, $user_id: Int){
    offerListWithFavourites(where: $where, user_id: $user_id){
      id
      title_en
      title_ar
      desc_en
      desc_ar
      discount
      actual_price
      discounted_price
      is_favourite
      featured_img{
        url
      }
      center{
        id
      }
    }
  }
`;

export const OFFERS_DETAIL = gql`
  query offerDetail($offer_id: ID!, $id: Int!, $user_id: Int!){
    offer(id: $offer_id){
      id
      discount
      center{
        id
        title_en
        title_ar
      }
      desc_en
      desc_ar
      place
      city
      latitude
      longitude
      mobile_number
      actual_price
      discounted_price
      google_map_location
    }
    offerGuideline{
      text_en
      text_ar
    }
    offerIsFavourite(offer_id: $id, user_id: $user_id)
  }
`;

export const FAVOURITES_BY_USER = gql`
  query favouritesByUser($user_id: Int!){
    favouritesByUser(user_id: $user_id){
      id
      title_en
      title_ar
      desc_en
      desc_ar
      featured_img{ 
        url  
      }
      discount
      actual_price
      discounted_price
    }
  }
`;

export const GET_MEMBERSHIP_BY_USER = gql`
  query membershipByUser($user_id: ID!){
    getMembershipExpiryDays(user_id: $user_id)
    memberships(where:{
      user: $user_id
    }){
      id
      serial
      expiry
      qrcode_url
      package{
        id
        color
        name_en
        name_ar
        featured_img{
          url
        }
      }
      user{
        username
        email
      }
    }
    membershipCardInfo{
			text_en
      text_ar
    }
    membershipBenefit{
      text_en
      text_ar
    }
  }
`;

export const SPECIALISTS_BY_CENTER = gql`
  query specialistByCenter($where: JSON){
    specialists(where: $where){
      id
      featured_img{
        url
      }
      name_en
      name_ar
      desc_en
      desc_ar
      specialization_en
      specialization_ar
      center{
        place
        city
      }
    }
  }
`;

export const SPECIALIST = gql`
  query specialist($id: ID!){
    specialist(id: $id){
      featured_img{
        url
      }
      name_en
      name_ar
      specialization_en
      specialization_ar
      desc_en
      desc_ar
      mobile_number
      center{
        id
        featured_img{
          url
        }
        title_en
        title_ar
        place
        city
      }
    }
  }
`;

export const CATEGORIES = gql`
  query{
    categoriesWithCenterCount(specialist: true)
  }
`;

export const NOTIFICATIONS = gql`
  query{
    notifications{
      id
      title_en
      title_ar
      desc_en
      desc_ar
      created_at
    }
  }
`;

export const PRIVACY_POLICY = gql`
  query{
    privacyPolicy{
      privacy_en
      privacy_ar
    }
  }
`;

export const TERMS_AND_CONDITIONS = gql`
  query{
    appBasicInformation{
      app_version
      version_check
      android_app_version
      android_version_check
      iso_app_version
      ios_version_check
    }
  }
`;

export const BASIC_INFORMATION = gql`
  query{
    appBasicInformation{
      app_version,
      version_check,
      error_logging,
      payment_logging
    }
  }
`;

export const GET_GIFTS = gql`
  query GetGifts($membership_plan: Int, $user_id: Int){
    memberships(where: {
      user: $user_id
    }){
      id
      is_gift_generated
  	}
    AvailableGifts(where: {
      membership_plan: $membership_plan,
      user: $user_id,
      _limit: -1,
      status: true
    }){
      gifts{
        id
        name_en
        name_ar
        desc_en
        desc_ar
        featured_img{
          url
        }
      }
      AvailedGifts{
        id
        name_en
        name_ar
        desc_en
        desc_ar
        is_delivered
        featured_img{
          url
        }
      }
    }
  }
`;

export const VOUCHERS = gql`
  query Vouchers($where: JSON!){
    vouchers(where: $where){
      id
      featured_img{
        url
      }
      buy_title_en
      buy_title_ar
      win_title_en
      win_title_ar
      desc_en
      desc_ar
      cost
      cost_for_non_members
      limit
      total_bought
      draw_status
      membership_plans(where: {
        status: 1
      }){
        name_en
        name_ar
      }
    }
  }
`;

export const VOUCHER_DETAIL = gql`
  query Voucher($id: ID!){
    voucher(id: $id){
      id
      featured_img{
        url
      }
      buy_title_en
      buy_title_ar
      win_title_en
      win_title_ar
      desc_en
      desc_ar
      draw_status
      cost
      cost_for_non_members
      limit
      total_bought
      product(where:{
        status: 1
      }){
        id
        featured_imgs{
          url
        }
        title_en
        title_ar
        desc_en
        desc_ar
        cost
      }
      membership_plans(where: {
        status: 1
      }){
        id
        featured_img{
          url
        }
        duration
        name_en
        name_ar
        desc_en
        desc_ar
      }
      assured_gift(where: {
        status: 1
      }){
        id
        featured_img{
          url
        }
        title_en
        title_ar
        desc_en
        desc_ar
      }
      draw_gift(where: {
        status: 1
      }){
        id
        featured_imgs{
          url
        }
        title_en
        title_ar
        desc_en
        desc_ar
        quantity
      }
    }
    voucherRule{
      id
      title_en
      title_ar
    }
  }
`;

export const MY_VOUCHER_BOUGHT = gql`
  query VoucherAvailed($user_id: Int!){
    voucherAvaileds(where: {
      user: $user_id,
      is_won: 0
    }){
      id
      voucher{
        id
        featured_img{
          url
        }
        buy_title_en
        buy_title_ar
        win_title_en
        win_title_ar
        cost
      }
      paid_amount
      user{
        id
      }
    }
  }
`;

export const MY_VOUCHER_WON = gql`
  query VoucherAvailed($user_id: Int!){
    voucherAvaileds(where: {
      user: $user_id,
      is_won: 1
    }){
      id
      voucher{
        id
        featured_img{
          url
        }
        buy_title_en
        buy_title_ar
        win_title_en
        win_title_ar
        cost
      }
      paid_amount
      user{
        id
      }
    }
  }
`;

export const MEMBERSHIP_PLANS = gql`
  query{
    membershipPlans( sort: "price:desc" ,where: { status: true }){
      id
      featured_img{
        url
      }
      name_en
      name_ar
      desc_en
      desc_ar
      duration
      price
      color
    }
  }
`;

export const GET_ADDRESS = gql`
  query GetAddress($user_id: ID!){
    user(id: $user_id){
      username
      mobile_number
      address
    }
  }
`;

export const GET_REFER_HISTORY = gql`
  query GetReferHistory($user_id: Int!, $user: ID!){
    user(id: $user){
      enable_refer_and_earn
    }
    GetReferHistory(referrer: $user_id) {
      label
      referralCode
      totalEarned
      totalReferred
      balance
      referProgram{
        status
				discount
        allowed_maximum_discount
        minimum_withdrawal_amount
      }
    }
  }
`;

export const REFER_HISTORY = gql`
  query ReferralCodeTransactions($referrer: Int!){
    referralCodeTransactions(where: {
      referrer: $referrer
    }){
      id
      user{
        id
        username
        mobile_number
      }
      referrer_credit
      created_at
    }
  }
`;

export const APPLY_CODE = gql`
  query ApplyCode($receiver: Int!, $code: String!, $plan: Int, $voucher: Int){
    ApplyCode(receiver: $receiver, code: $code, plan: $plan, voucher: $voucher){
      discount
      applied
      codeApplied
      discountYouGet
      discountedPrice
      msg
    }
  }
`;

export const WITHDRAW_HISTORY = gql`
  query TranscationInfo($user_id: Int!){
    GetReferHistory(referrer: $user_id) {
      label
      referralCode
      totalEarned
      totalReferred
      balance
      referProgram{
				discount
        allowed_maximum_discount
        minimum_withdrawal_amount
      }
    }
    TransactionInfo(user: $user_id){
      userBankDetails{
        id
        holder_name
        bank_name
        account_number
        iban
      }
      withdrawalHistory{
        id
        withdraw_amount
        remaining_amount
        total_amount
        withdrawal_status
        created_at
      }
    }
  }
`;

export const HOME_SEARCH = gql`
  query HomeSearch($where: JSON, $swhere: JSON){
    specialists(where: $swhere){
      id
      title_en: name_en
      title_ar: name_ar
    }
    centers(where: $where){
      id
      title_en
      title_ar
    }
    offers(where: $where){
      id
      title_en
      title_ar
    }
  }
`;

export const POPUP = gql`
  query{
    popUp{
      id
      featured_imgs{
        url
      }
      status
    }
  }
`;

export const GET_GIFT_WINNERS = gql`
  query GetGiftWinners($where: JSON!){
    voucherAvaileds(where: $where){
      id
      user{
        username
      }
    }
  }
`;

export const GET_MEMBER_DATA = gql`
  query User($ID: ID!){
    user(id: $ID){
      id
      username
      email
      mobile_number
      blocked
      language
      notification_token
      address
      confirmed
      provider
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
`;

export const VERIFY_OTP = gql`
  query VerifyOtp($user: ID!, $otp: Int){
    verifyOtp(user: $user, otp: $otp){
      msg
      status
    }
  }
`;

export const APP_INTROS = gql`
  query{
    appIntros(where: {
      status: 1
    }){
      id
      title_en
      title_ar
      desc_en
      desc_en
      featured_img{
        url
      }
    }
  }
`;

export const NON_USER_CHECK = gql`
  query NonUserCheck($device_id: String!){
    users(where: {
      device_id: $device_id
    }){
      id
      notification_token
      language
    }

    nonUsers(where: {
      device_id: $device_id
    }){
      id
      notification_token
      language
    }
  }
`;

export const NOTIFICATIONS_BY_USER = gql`
  query NotificationsByUser($user_id: Int){
    NotificationsByUser(user_id: $user_id){
      id
      title_en
      title_ar
      desc_en
      desc_ar
      data
      is_read
      created_at
    }
  }
`;

export const RECENT_ARTICLES = gql`
  query{
    RecentArticles{
      recentArticles{
        id
        featured_img{
          url
        }
        title_en
        title_ar
        desc_en
        desc_ar
        views
        likes
        article_category{
          category_name_en
          category_name_ar
          color_code
        }
      }
      recentVideos{
        id
        featured_img{
          url
        }
        title_en
        title_ar
        video_url
        desc_en
        desc_ar
        views
        likes
        article_category{
          category_name_en
          category_name_ar
          color_code
        }
      }
    }
  }
`;