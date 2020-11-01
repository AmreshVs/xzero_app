import { PROFILE_TAB_SCREEN, MEMBERSHIP_TAB_SCREEN, FAVOURITES_TAB_SCREEN, HOME_TAB_SCREEN } from "navigation/routes";

export default function getIconName(routeName) {
  switch (routeName) {
    case HOME_TAB_SCREEN:
      return 'home';
    case PROFILE_TAB_SCREEN:
      return 'user';
    case MEMBERSHIP_TAB_SCREEN:
      return 'id-card';
    case FAVOURITES_TAB_SCREEN:
      return 'heart';
    default:
      return 'archive';
  }
};
