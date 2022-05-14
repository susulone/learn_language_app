import React, { createContext } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

const StylesContext = createContext({});

export const StylesProvider = ({ children }) => {
  const responsiveLayout = useBreakpointValue({ base: 'column', md: 'row' });

  const responsiveContainerSm = useBreakpointValue({
    base: 'sm',
    md: 'md',
    lg: 'lg',
  });

  const responsiveContainerLg = useBreakpointValue({
    base: 'md',
    md: 'lg',
    lg: 'xl',
  });

  const responsiveBodyText = useBreakpointValue({
    base: 'md',
    md: 'lg',
    lg: 'lg',
  });

  const responsiveBodyTextLg = useBreakpointValue({
    base: 'lg',
    md: 'xl',
    lg: 'xl',
  });

  const responsiveHeadingSm = useBreakpointValue({
    base: 'lg',
    md: 'xl',
    lg: '2xl',
  });

  const responsiveHeadingMd = useBreakpointValue({
    base: 'xl',
    md: '2xl',
    lg: '3xl',
  });

  const responsiveHeadingLg = useBreakpointValue({
    base: '2xl',
    md: '3xl',
    lg: '4xl',
  });

  const responsiveHeadingXl = useBreakpointValue({
    base: '3xl',
    md: '4xl',
    lg: '5xl',
  });

  const responsiveButtonSm = useBreakpointValue({
    sm: 'sm',
    md: 'md',
  });

  const responsiveButtonMd = useBreakpointValue({
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  });

  const responsiveButtonLg = useBreakpointValue({ base: 'md', md: 'lg' });

  const responsiveImg = useBreakpointValue({
    base: '200px',
    md: '225px',
    lg: '250px',
  });

  return (
    <StylesContext.Provider
      value={{
        responsiveLayout,
        responsiveContainerSm,
        responsiveContainerLg,
        responsiveBodyText,
        responsiveBodyTextLg,
        responsiveHeadingSm,
        responsiveHeadingMd,
        responsiveHeadingLg,
        responsiveHeadingXl,
        responsiveButtonSm,
        responsiveButtonMd,
        responsiveButtonLg,
        responsiveImg,
      }}
    >
      {children}
    </StylesContext.Provider>
  );
};

export default StylesContext;
