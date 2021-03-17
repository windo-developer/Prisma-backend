// parse hashtags
export const processHashtags = (caption) => {
  //no #tags => [] empty array
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
