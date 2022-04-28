import React from 'react';
import Head from 'next/head';

interface Props {
  description: string;
  image: string;
}

export const MetaTags = ({ description, image }: Props) => {
  const title = 'sendsecure.ly - Share secrets without the digital footprint.';

  return (
    <Head>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <meta content={description} name="description" />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />

      <meta content={title} property="twitter:title" />
      <meta content={description} property="twitter:description" />
      <meta content={image} property="twitter:image" />
      <meta content="summary_large_image" name="twitter:card" />

      <meta content="website" property="og:type" />
    </Head>
  );
};
