import React, { useContext, useEffect } from 'react';
import axios from 'axios';
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
import AdminPanel from '../components/admin/AdminPanel';

const LessonPage = id => {
  let {
    availability,
    contentIsLoading,
    lesson,
    userRole,
    lessonId,
    setMatchesByLesson,
    setLesson,
    setAvailability,
    // setWordPairs,
    setMaxScore,
  } = useContext(GlobalContext);
  const {
    responsiveBodyText,
    responsiveContainerLg,
    responsiveHeadingSm,
    responsiveHeadingMd,
    responsiveHeadingLg,
  } = useContext(StylesContext);

  let navigate = useNavigate();

  useEffect(() => {
    async function getWordMatchesByLessonId() {
      try {
        let response = await axios.get(`/api/words/lesson${lessonId}`);
        if (response && response.data) {
          let data = await response.data;
          setMatchesByLesson(data);
          setMaxScore(data.length);
          setAvailability(true);
        }
      } catch (err) {
        if (err.response.data === false) {
          setAvailability(false);
        }
      }
    }
    console.log('getWordMatchesByLessonId ran');
    getWordMatchesByLessonId();
  }, [lessonId]);

  useEffect(() => {
    async function getLessonById() {
      let response = await axios.get(`/api/lessons/${lessonId}`);
      let data = await response.data;
      setLesson(data);
      console.log('getLessonById ran');
    }
    getLessonById();
  }, [lessonId]);

  return (
    <Flex direction="column" align="center" textAlign="left" m="2" p="2">
      {userRole === 'teacher' && <AdminPanel />}
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
          {availability ? (
            <>
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
            </>
          ) : (
            <Heading as="h3" fontSize={responsiveHeadingSm} mt="3">
              Sadly LangBot is not here yet! Come back later!
            </Heading>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default LessonPage;
