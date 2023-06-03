import React from 'react';
import { loadingAndErrorType } from '../../types';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingAndError = (props: loadingAndErrorType) => {
  const { error, children, loading, page = 0, componentName = 'none' } = props;

  if (page > 1) {
    return <div role="childrenDiv">{children}</div>;
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: `${componentName === 'tiles' ? '30%' : '100%'}`,
          height: `${componentName === 'tiles' ? '5vh' : '100vh'}`,
          justifyContent: 'center',
          alignContent: 'center',
          flexWrap: 'wrap',
        }}
        role="loading-element"
      >
        <CircularProgress
          size={componentName === 'tiles' ? 30 : 150}
          role="loader"
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        variant={componentName === 'tiles' ? 'h6' : 'h1'}
        component="h2"
        color={'red'}
        role="errormessage"
      >
        Oops Something Went Wrong
      </Typography>
    );
  }
  return <div role="childrenlist">{children}</div>;
};

export default LoadingAndError;
