import React, { useEffect } from 'react';

const ExternalRedirect = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null;
};

export default ExternalRedirect;