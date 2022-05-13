import React, { createContext } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

const StylesContext = createContext({});

export const StylesProvider = ({ children }) => {
  const responsiveLayout = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <StylesContext.Provider
      value={{
        responsiveLayout,
      }}
    >
      {children}
    </StylesContext.Provider>
  );
};

export default StylesContext;
