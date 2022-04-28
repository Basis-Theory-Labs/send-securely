import React from 'react';

interface Props {
  title: string;
  isSharingSecret: boolean;
}

export const OpenGraphTags = ({ title, isSharingSecret }: Props) => {
  const description = isSharingSecret
    ? 'You were sent a secret!'
    : 'Send passwords, keys, and other sensitive data with a single-use link.';

  const image = isSharingSecret
    ? 'https://cdn.basistheory.com/images/seo/sendsecurely-secret-opengraph.png'
    : 'https://cdn.basistheory.com/images/seo/sendsecurely-opengraph.png';

  return (
    <>
      <meta content={title} property="og:title" />
      <meta content={description} name="description" />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />

      <meta content={title} property="twitter:title" />
      <meta content={description} property="twitter:description" />
      <meta content={image} property="twitter:image" />
      <meta content="summary_large_image" name="twitter:card" />

      <meta content="website" property="og:type" />
    </>
  );
};
