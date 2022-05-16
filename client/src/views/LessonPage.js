import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../contexts/Globals';
import StylesContext from '../contexts/Styles';
import {
  Box,
  IconButton,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { FiArrowRightCircle } from 'react-icons/fi';
import LoadIndicator from '../components/LoadIndicator';
import WordPractice from '../components/wordPractice/WordPractice';

const LessonPage = () => {
  let { contentIsLoading, lesson } = useContext(GlobalContext);
  const {
    responsiveBodyText,
    responsiveContainerLg,
    responsiveHeadingMd,
    responsiveHeadingLg,
  } = useContext(StylesContext);

  let navigate = useNavigate();

  return (
    <Flex direction="column" align="center" textAlign="left" m="2" p="2">
      {contentIsLoading === true && <LoadIndicator />}
      {contentIsLoading === false && (
        <Box width={responsiveContainerLg} direction="column" p="4">
          <Heading as="h2" maxWidth="80%" fontSize={responsiveHeadingLg} py="4">
            {lesson.title}
          </Heading>
          <Divider border="1px" />
          <Text as="body" fontSize={responsiveBodyText} mt="5">
            {lesson.description}
          </Text>
          <Text as="body" fontSize={responsiveBodyText} mt="2">
            Let's start by going through the words for this lesson.
          </Text>
          <Text as="body" fontSize={responsiveBodyText} mt="2">
            Langbot will be helping you by showing you the word first in English
            and if you give them a little poke they will show the word's Swedish
            translation.
          </Text>
          <Box align="center">
            <WordPractice />
          </Box>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            mt="5"
          >
            <Heading maxWidth="70%" fontSize={responsiveHeadingMd}>
              Let's test what you have learned?
            </Heading>
            <IconButton
              aria-label="Go to quiz"
              onClick={() => {
                navigate(`/lessons/quiz`);
              }}
              variant="link"
              fontSize="4xl"
              icon={<FiArrowRightCircle />}
              _hover={{
                transform: 'scale(0.9)',
                color: '#bec3c9',
              }}
            />
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default LessonPage;
