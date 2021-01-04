import { getAuthenticationHeader, getJWT, getUserData } from "constants/commonFunctions";
import { ADD_FAVOURITE } from 'graphql/mutations';

const addFavourite = async (client, offer_id, center) => {
  const userData = await getUserData();
  const jwt = await getJWT();

  let input = {
    user_id: Number(userData?.id),
    offer_id: Number(offer_id),
  };

  if (center) {
    input = {
      ...input,
      center: Number(center),
    }
  }

  let { data } = await client.mutate({
    mutation: ADD_FAVOURITE,
    variables: input,
    ...getAuthenticationHeader(jwt)
  });

  return data?.AddAsFavourite?.status;
}

export default addFavourite;