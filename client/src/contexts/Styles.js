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

  const responsiveContainerXl = useBreakpointValue({
    base: 'lg',
    md: 'xl',
    lg: '2xl',
  });

  const responsiveContainer2xl = useBreakpointValue({
    base: 'xl',
    md: '2xl',
    lg: '3xl',
  });

  const responsiveBodyTextSm = useBreakpointValue({
    base: 'sm',
    md: 'md',
  });

  const responsiveBodyText = useBreakpointValue({
    base: 'sm',
    md: 'md',
    lg: 'lg',
  });

  const responsiveBodyTextLg = useBreakpointValue({
    base: 'lg',
    md: 'xl',
    lg: 'xl',
  });

  const responsiveHeadingXs = useBreakpointValue({
    base: 'lg',
    md: 'xl',
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

  // const responsiveButtonSm = useBreakpointValue({
  //   sm: 'sm',
  //   md: 'md',
  // });

  const responsiveButtonMd = useBreakpointValue({
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  });

  const responsiveButtonLg = useBreakpointValue({ base: 'md', md: 'lg' });

  const responsiveImg = useBreakpointValue({
    base: '180px',
    md: '200px',
    lg: '220px',
  });

  return (
    <StylesContext.Provider
      value={{
        responsiveLayout,
        responsiveContainerSm,
        responsiveContainerLg,
        responsiveContainerXl,
        responsiveContainer2xl,
        responsiveBodyTextSm,
        responsiveBodyText,
        responsiveBodyTextLg,
        responsiveHeadingXs,
        responsiveHeadingSm,
        responsiveHeadingMd,
        responsiveHeadingLg,
        responsiveHeadingXl,
        // responsiveButtonSm,
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
