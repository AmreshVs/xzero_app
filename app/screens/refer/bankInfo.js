import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import Row from 'components/row';
import Button from 'components/button';
import ViewBankInfo from './viewBankInfo';
import styles from './styles';
import EditBankInfo from './editBankInfo';

const BankInfo = ({ data, loading, reload }) => {
  const [edit, setEdit] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (data === null) {
      setEdit(true);
    }
  }, [data]);

  return (
    <Card>
      <Row>
        <Box width="70%">
          <Column marginBottom={10}>
            <Text style={styles.referTitle}>{t('bank_details')}</Text>
            <Text style={styles.caption}>{t('before_withdraw')}</Text>
          </Column>
        </Box>
        <Box width="30%" paddingLeft={10}>
          {!edit && <Button size="small" icon="pen" onPress={() => setEdit(true)}>{t('edit')}</Button>}
        </Box>
      </Row>
      <Box loading={loading}>
        {!edit ?
          <ViewBankInfo data={data} />
          :
          <EditBankInfo data={data} setEdit={setEdit} reload={reload} />
        }
      </Box>
    </Card>
  );
};

export default BankInfo;