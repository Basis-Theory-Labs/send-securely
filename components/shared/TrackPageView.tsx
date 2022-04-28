/* eslint-disable react/no-danger */
import React from 'react';

interface Props {
  url?: string;
}

export const TrackPageView = ({ url }: Props) => {
  const plausibleTrackingScript = url
    ? `plausible('pageview', { u: '${url}' });`
    : "plausible('pageview');";

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: plausibleTrackingScript,
      }}
    />
  );
};

/* eslint-enable react/no-danger */
