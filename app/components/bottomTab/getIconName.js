import { PROFILE_TAB_SCREEN, MEMBERSHIP_TAB_SCREEN, FAVOURITES_TAB_SCREEN, HOME_TAB_SCREEN, VOUCHERS } from "navigation/routes";

export default function getIconName(routeName) {
  switch (routeName) {
    case HOME_TAB_SCREEN:
      return 'home';
    case PROFILE_TAB_SCREEN:
      return 'user';
    case MEMBERSHIP_TAB_SCREEN:
      return 'id_card';
    case FAVOURITES_TAB_SCREEN:
      return 'heart';
    case VOUCHERS:
      return 'ticket_alt';
    default:
      return 'archive';
  }
};
