import React from 'react';
import { Image, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';

import { handlelogout } from 'screens/user/profileView';
import colors from 'constants/colors';
import Box from 'components/box';
import Row from 'components/row';
import Button from 'components/button';
import RippleFX from 'components/rippleFx';
import ProgressiveImage from 'components/progressiveImage';
import { sendWhatsappMessage, useReduxAction } from 'constants/commonFunctions';
import { WHATSAPP_CONTACT } from 'constants/common';
import useErrorLog from 'hooks/useErrorLog';
import { LOGIN_SCREEN } from 'navigation/routes';

export default function CustomDrawer(props) {
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { logError } = useErrorLog();
  const { t } = useTranslation();
  const reduxDispatch = useDispatch();

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    itemStyle: {
      borderRadius: 10
    },
    drawerText: {
      marginLeft: -20,
    },
    logoContainer: {
      width: 30,
      height: 30,
      borderRadius: 5,
      marginRight: 15,
      overflow: 'hidden'
    },
    logo: {
      width: '100%',
      height: '100%',
    },
    footer: {
      position: 'absolute',
      bottom: 0 + insets.bottom,
      width: '100%'
    },
    content: {
      height: '100%',
      paddingTop: 0
    },
    heading: {
      fontWeight: '700',
      color: colors.text_dark,
      paddingTop: 20,
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      paddingTop: Platform.OS === 'ios' ? insets.top : 30,
    },
    headerContainer: {
      height: 160,
      margin: 0,
    },
    headText: {
      fontWeight: '700',
      color: colors.white,
      marginVertical: 5,
      fontSize: 17
    },
    headingText: {
      fontWeight: '700',
      color: colors.white,
      marginVertical: 5,
    },
    gradient: {
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
    profile_pic: {
      width: 65,
      height: 65,
      borderRadius: 50,
    },
    imgContainer: {
      backgroundColor: colors.white,
      borderRadius: 50,
      overflow: 'hidden'
    },
  });

  const getIcon = (index) => {
    switch (index) {
      case 0:
        return 'home';
      case 1:
        return 'ticket-alt';
      case 2:
        return 'bullhorn';
      case 3:
        return 'gifts';
      case 4:
        return 'user-shield';
      case 5:
        return 'check-square';
      default:
        return 'ad';
    }
  }

  const handlePress = () => {
    let dispatch = props.navigation.dispatch;

    props.navigation.toggleDrawer();
    if (userData) {
      props.navigation.navigate(LOGIN_SCREEN);
      handlelogout({ dispatch, reduxDispatch, logError });
    }
    else {
      props.navigation.navigate(LOGIN_SCREEN);
    }

  }

  const handleContact = () => {
    return sendWhatsappMessage(`${t('whatsapp1')} ${userData?.username} ${t('drawer_contact')}`, WHATSAPP_CONTACT)
  }

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.content}
      {...props}
    >
      <Box style={styles.headerContainer}>
        <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
        <Box style={styles.header} padding={20}>
          <Text style={styles.headingText}>{t('hello')}</Text>
          {userData?.profile_pic ?
            <View style={styles.imgContainer}>
              <ProgressiveImage
                style={styles.profile_pic}
                thumbnailSource={{ uri: userData?.profile_pic }}
                source={{ uri: userData?.profile_pic }}
              />
            </View>
            :
            <FontAwesomeIcon icon="user-circle" color={colors.white} size={45} />
          }
          <Text style={styles.headText}>{userData?.username}</Text>
        </Box>
      </Box>
      {props.state.routeNames.map((item, index) => {
        const Item = () => (
          <DrawerItem
            label={({ focused, color }) => <Text style={[{ color: focused ? colors.primary : color }, styles.drawerText]}>{t(item)}</Text>}
            icon={({ focused, color, size }) => <FontAwesomeIcon icon={getIcon(index)} color={focused ? colors.primary : color} size={size} />}
            focused={props.state.index === index}
            onPress={() => props.navigation.navigate(item, { drawer: 1 })}
            activeBackgroundColor="#FFF"
          />
        );

        if (userData === null && !['My Draws', 'Refer', 'Gifts'].includes(item)) {
          return <Item key={index} />
        }

        if (userData !== null) {
          return <Item key={index} />
        }

        return null;
      })}
      <Box style={styles.footer} padding={20}>
        <Button
          size="small"
          status="success"
          width="100%"
          icon={faWhatsapp}
          onPress={() => handleContact()}
          outline
        >
          {t('contact')}
        </Button>
        <Box marginBottom={10} />
        <Button
          size="small"
          status={userData ? 'danger' : 'chip_1'}
          width="100%"
          icon={userData ? 'sign-out-alt' : 'sign-in-alt'}
          onPress={() => handlePress()}
          outline
        >
          {userData ? t('logout') : t('login')}
        </Button>
        <Text style={styles.heading}>{t('follow_us')}</Text>
        <Row marginTop={10}>
          <RippleFX style={styles.logoContainer} onPress={() => Linking.openURL('https://www.facebook.com/xzeroapp')}>
            <Image style={styles.logo} source={require('../../../assets/facebook-logo.png')} />
          </RippleFX>
          <RippleFX style={styles.logoContainer} onPress={() => Linking.openURL('https://www.instagram.com/xzero.official/')}>
            <Image style={styles.logo} source={require('../../../assets/instagram-logo.png')} />
          </RippleFX>
          <RippleFX style={styles.logoContainer} onPress={() => Linking.openURL('https://www.linkedin.com/company/66666966')}>
            <Image style={styles.logo} source={require('../../../assets/linkedin-logo.png')} />
          </RippleFX>
        </Row>
      </Box>
    </DrawerContentScrollView>
  )
}