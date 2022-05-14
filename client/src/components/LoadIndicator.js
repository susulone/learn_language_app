import React, { useContext } from 'react';
import StylesContext from '../contexts/Styles';
import { Box, Spinner } from '@chakra-ui/react';

const LoadIndicator = () => {
  const { responsiveContainerSm } = useContext(StylesContext);

  return (
    <Box maxWidth={responsiveContainerSm} align="center" pt="4">
      <Spinner
        size="xl"
        thickness="4px"
        speed="1s"
        emptyColor="gray.200"
        color="blue.500"
      />
    </Box>
  );
};

export default LoadIndicator;
