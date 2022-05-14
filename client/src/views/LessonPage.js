import React, { useContext } from 'react';
import GlobalContext from '../contexts/Globals';
import StylesContext from '../contexts/Styles';
import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import LoadIndicator from '../components/LoadIndicator';

const LessonPage = () => {
  let { contentIsLoading, lesson } = useContext(GlobalContext);
  const { responsiveBodyText, responsiveContainerLg, responsiveHeadingLg } =
    useContext(StylesContext);

  return (
    <Flex direction="column" align="center" m="2" p="2">
      {contentIsLoading === true && <LoadIndicator />}
      {contentIsLoading === false && (
        <Box width={responsiveContainerLg} direction="column" p="4">
          <Heading as="h2" maxWidth="80%" fontSize={responsiveHeadingLg} py="4">
            {lesson.title}
          </Heading>
          <Divider />
          <Text
            as="body"
            fontSize={responsiveBodyText}
            fontWeight="medium"
            lineHeight="tall"
            mt="5"
          >
            {lesson.description}
          </Text>
          <Button mt="5">Let's Practise</Button>
        </Box>
      )}
    </Flex>
  );
};

export default LessonPage;
