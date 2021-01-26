import { useApolloClient } from "@apollo/client";

import { useReduxAction } from "constants/commonFunctions";
import { LOG_PAYMENT } from "graphql/mutations";
import { BASIC_INFORMATION } from "graphql/queries";

export default function usePaymentLog() {
  const userData = useReduxAction(state => state?.userReducer?.user);
  const client = useApolloClient();

  const logPayment = async (params) => {
    const { data } = await client.query({
      query: BASIC_INFORMATION
    });

    if (data?.appBasicInformation?.payment_logging) {
      try {
        await client.mutate({
          mutation: LOG_PAYMENT,
          variables: {
            data: {
              user: Number(userData?.id),
              ...params
            }
          }
        });
      }
      catch (error) {
        // console.log('Log Payment Error', error);
      }

    }
    else {
      return;
    }
  }

  return {
    logPayment
  }
}