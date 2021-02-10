import { LIKE_ARTICLE, SAVE_ARTICLE } from "graphql/mutations";
import { Share } from "react-native";

export const getPosition = (index, categoriesLength, xPosition, selected, id) => {
  let position = 0;

  if (id > selected) {
    if (index === categoriesLength - 1) {
      position = index * 90;
    }
    else {
      position = index * 100;
    }
  }
  else {
    if (index === 0) {
      position = 0;
    }
    else {
      position = xPosition - 130;
    }
  }

  return position;
}

export const saveArticle = async (client, user_id, article_id) => {
  const data = await client.mutate({
    mutation: SAVE_ARTICLE,
    variables: {
      user_id,
      article_id
    }
  });

  if (data && data?.SaveForLater) {
    return data?.SaveForLater?.status;
  }

  return false;
}

export const likeArticle = async (client, user_id, article_id) => {
  const data = await client.mutate({
    mutation: LIKE_ARTICLE,
    variables: {
      user_id,
      article_id
    }
  });

  if (data && data?.Like) {
    return data?.Like?.status;
  }

  return false;
}

export const handleShare = async (data) => {
  let message = `${data?.title_en}\n\nRead the full post on Xzero App \nhttps://xzero.app/open?q=xzero://DHome/Main/OfferDetail`;

  try {
    await Share.share({
      message: message,
      title: message,
      subject: message,
      dialogTitle: ''
    });
  } catch (error) {
    // console.log('Share Offer error', error);
  }
}