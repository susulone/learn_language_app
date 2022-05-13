import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StylesContext from '../../context/Styles';
import {
  Container,
  Flex,
  Heading,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import MenuButton from './MenuButton';
import SelectUser from './SelectUser';

const NavBar = () => {
  let { responsiveHeadingSm } = useContext(StylesContext);

  const responsiveNav = useBreakpointValue({
    base: '100%',
    md: '90%',
    lg: '80%',
  });

  return (
    <Container maxWidth={responsiveNav} centerContent p="2">
      <Flex
        direction="row"
        w="100%"
        align="center"
        justify="space-between"
        px="2"
        gap="2"
      >
        <Heading as="h3" size={responsiveHeadingSm}>
          <Link to={'/'}> Beep Boop </Link>
        </Heading>
        <MenuButton />
        <Spacer />
        <SelectUser />
        <ColorModeSwitcher />
      </Flex>
    </Container>
  );
};

export default NavBar;
