import Constants from 'expo-constants';
import { useApolloClient } from "@apollo/client";

import { LOG_ERROR } from "graphql/mutations";
import { BASIC_INFORMATION } from "graphql/queries";
import { useReduxAction } from "constants/commonFunctions";

export default function useErrorLog() {
  const userData = useReduxAction(state => state?.userReducer?.user);
  const client = useApolloClient();

  const logError = async (params) => {
    const { data } = await client.query({
      query: BASIC_INFORMATION
    });

    if (data?.appBasicInformation?.error_logging) {
      await client.mutate({
        mutation: LOG_ERROR,
        variables: {
          data: {
            user: Number(userData?.id),
            app_version: parseFloat(Constants.nativeAppVersion),
            ...params
          }
        }
      });
    }
  }

  return {
    logError
  }
}