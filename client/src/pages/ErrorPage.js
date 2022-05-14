import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StylesContext from '../contexts/Styles';
import { Button, Flex, Heading, Image, Stack } from '@chakra-ui/react';
import SadLangBot from '../assets/langbot-404.svg';

const ErrorPage = () => {
  let { responsiveBodyTextLg, responsiveContainerLg, responsiveImg } =
    useContext(StylesContext);
  return (
    <Flex
      maxWidth={responsiveContainerLg}
      // border="2px" // for testing only
      direction="column"
      justify="center"
      align="center"
      minHeight="90vh"
      m="2"
      border="solid"
    >
      <Stack
        // border="1px" // for testing only
        direction="column"
        align="center"
        spacing="10"
        pt="10"
        width="fit-content"
      >
        <Stack
          direction="column"
          align="center"
          width="fit-content"
          spacing="0"
        >
          <Heading as="h3" size="4xl">
            404
          </Heading>
          <Heading mt="-10" as="h3" size={responsiveBodyTextLg}>
            There's nothing here!
          </Heading>
        </Stack>
        <Button size="md" borderRadius="full" px="5">
          <Link to="/"> Home </Link>
        </Button>
      </Stack>
      <Flex width="100%" justify="right" mt="16">
        <Image
          boxSize={responsiveImg}
          src={SadLangBot}
          alt="Langbot looking sad and saying 'we are lost, let's go back home!'"
        />
      </Flex>
    </Flex>
  );
};

export default ErrorPage;
