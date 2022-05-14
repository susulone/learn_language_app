import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StylesContext from '../contexts/Styles';
import { Button, Flex, Heading, Stack } from '@chakra-ui/react';

const ErrorPage = () => {
  let { responsiveBodyTextLg } = useContext(StylesContext);
  return (
    <Flex
      //border='2px' // for testing only
      justify="center"
      align="center"
      minHeight="80vh"
      m="2"
    >
      <Stack
        //border='1px' // for testing only
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
    </Flex>
  );
};

export default ErrorPage;

// <Flex
// //border='2px' // for testing only
// justify="center"
// align="center"
// minHeight="80vh"
// m="2"
// >
// <Stack
//   //border='1px' // for testing only
//   direction="column"
//   align="center"
//   spacing="10"
//   pt="10"
//   width="fit-content"
// >
//   <Stack
//     direction="column"
//     align="center"
//     width="fit-content"
//     spacing="0"
//   >
//     <Heading as="h3" size="4xl">
//       404
//     </Heading>
//     <Heading mt="-10" as="h3" size="lg">
//       There's nothing here!
//     </Heading>
//   </Stack>
//   <Button size="md" borderRadius="full" px="5">
//     <Link to="/"> Home </Link>
//   </Button>
// </Stack>
// </Flex>
