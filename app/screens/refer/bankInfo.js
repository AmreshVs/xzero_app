import React, { useState } from 'react';
import { Text } from 'react-native';

import Box from 'components/box';
import Card from 'components/card';
import Column from 'components/column';
import Row from 'components/row';
import Button from 'components/button';
import ViewBankInfo from './viewBankInfo';
import styles from './styles';
import EditBankInfo from './editBankInfo';

const BankInfo = () => {
  const [edit, setEdit] = useState(false);

  return (
    <Card marginTop={10}>
      <Row>
        <Box width="70%">
          <Column marginBottom={10}>
            <Text style={styles.referTitle}>Bank Details</Text>
            <Text style={styles.caption}>Please check your bank information before withdraw</Text>
          </Column>
        </Box>
        <Box width="30%" paddingLeft={10}>
          {!edit && <Button size="small" icon="pen" onPress={() => setEdit(true)}>Edit</Button>}
        </Box>
      </Row>
      {!edit ?
        <ViewBankInfo />
        :
        <EditBankInfo setEdit={setEdit} />
      }
    </Card>
  );
};

export default BankInfo;