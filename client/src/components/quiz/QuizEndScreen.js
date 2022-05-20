/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';
import { Box, IconButton, Flex, Heading } from '@chakra-ui/react';
import { FiArrowRightCircle } from 'react-icons/fi';
import QuizScore from './QuizScore';

const QuizEndScreen = () => {
  const { responsiveContainerLg, responsiveHeadingLg, responsiveHeadingSm } =
    useContext(StylesContext);
  let { setQuizState, setScore, setLessonId } = useContext(GlobalContext);
  let navigate = useNavigate();

  const emptyQuizMemory = () => {
    setScore(0);
    setQuizState('menu');
  };
  return (
    <Flex direction="column" align="center" justify="center" m="2" p="2">
      <Box width={responsiveContainerLg} direction="column">
        <Heading as="h1" maxWidth="85%" fontSize={responsiveHeadingLg} pt="4">
          Quiz Finished!
        </Heading>
        <QuizScore />
        <Flex
          width="60%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt="5"
          pb="3"
        >
          <Heading maxW="70%" fontSize={responsiveHeadingSm}>
            Back to Lessons
          </Heading>
          <IconButton
            aria-label="Back to Lessons"
            onClick={() => {
              setLessonId();
              emptyQuizMemory();
              navigate('/lessons/latest');
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
    </Flex>
  );
};

export default QuizEndScreen;
