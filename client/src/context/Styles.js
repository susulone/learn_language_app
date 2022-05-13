import React, { createContext } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

const StylesContext = createContext({});

export const StylesProvider = ({ children }) => {
  const responsiveLayout = useBreakpointValue({ base: 'column', md: 'row' });

  const responsiveHeadingSm = useBreakpointValue({
    base: 'lg',
    md: 'xl',
    lg: '2xl',
  });

  const responsiveHeadingXl = useBreakpointValue({
    base: '3xl',
    md: '4xl',
    lg: '5xl',
  });

  return (
    <StylesContext.Provider
      value={{
        responsiveLayout,
        responsiveHeadingSm,
        responsiveHeadingXl,
      }}
    >
      {children}
    </StylesContext.Provider>
  );
};

export default StylesContext;
