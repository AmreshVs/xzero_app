import React, { memo, useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Linking from 'expo-linking';
import { useApolloClient } from '@apollo/client';

import Card from 'components/card';
import RippleFX from 'components/rippleFx';
import { MARK_NOTIFICATION } from 'graphql/mutations';
import { NotificationCountContext, UserDataContext } from 'context';
import styles from './styles';

const Notification = (data) => {
  const { i18n } = useTranslation();
  const client = useApolloClient();
  const [read, setRead] = useState(data?.is_read);
  const { userData } = useContext(UserDataContext);
  const { setNotificationCount } = useContext(NotificationCountContext);
  let language = i18n.language;

  const handlePress = async (notificationData) => {

    if (!read) {
      const { data: response } = await client.mutate({
        mutation: MARK_NOTIFICATION,
        variables: {
          user_id: Number(userData?.id),
          notification_id: Number(notificationData?.id)
        }
      });
      if (response?.MarkAsRead?.status) {
        setRead(response?.MarkAsRead?.status);
        setNotificationCount(Number(response?.MarkAsRead?.notificationCount || 0));
      }
    }

    if (notificationData?.data?.type === 'appLink') {
      try {
        Linking.openURL(notificationData?.data?.link)
      }
      catch (error) {
        console.log('Unable to open URL from notifications screen');
      }
    }
  }

  return (
    <Card style={read ? styles.readContainer : styles.container}>
      <RippleFX onPress={() => handlePress(data)}>
        {!read && <View style={styles.unread} />}
        <Text style={styles.title}>{data?.[`title_${language}`]}</Text>
        <Text style={styles.desc}>{data?.[`desc_${language}`]}</Text>
        <Text style={styles.timestamp}>{new Date(data?.created_at).toLocaleString()}</Text>
      </RippleFX>
    </Card>
  );
}

export default memo(Notification);