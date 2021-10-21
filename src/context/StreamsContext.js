import React from 'react';

export const StreamsContext = React.createContext({
  streams: '',
  processing: false,
  setStreams: () => {},
  setProcessing: () => {},
});
