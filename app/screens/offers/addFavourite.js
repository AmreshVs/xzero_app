import { getUserData } from "constants/commonFunctions";
import { ADD_FAVOURITE } from 'graphql/mutations';

const addFavourite = async (client, offer_id, center) => {
  const userData = await getUserData();

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
  console.log(input);

  let { data } = await client.mutate({
    mutation: ADD_FAVOURITE,
    variables: input
  });

  return data?.AddAsFavourite?.status;
}

export default addFavourite;