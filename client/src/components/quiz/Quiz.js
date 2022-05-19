import React, { useContext, useState } from 'react';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';
import { Box, Flex, Heading, IconButton, Input } from '@chakra-ui/react';
import { FiArrowRightCircle } from 'react-icons/fi';

const Quiz = () => {
  const { responsiveContainerLg, responsiveHeadingSm, responsiveHeadingLg } =
    useContext(StylesContext);
  let {
    engByLesson,
    languageId,
    matchesByLesson,
    score,
    setQuizState,
    setScore,
    sweByLesson,
  } = useContext(GlobalContext);

  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [answer, setAnswer] = useState('');

  const nextQuestion = () => {
    if (languageId === 1) {
      if (engByLesson[currentQuestion].eng_word === answer) {
        setScore(score + 1);
      }
      if (currentQuestion === matchesByLesson.length - 1) {
        setQuizState('endScreen');
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      if (sweByLesson[currentQuestion].swe_word === answer) {
        setScore(score + 1);
      }
      if (currentQuestion === matchesByLesson.length - 1) {
        setQuizState('endScreen');
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  return (
    <Flex direction="column" align="center" m="2" p="2">
      <Box width={responsiveContainerLg} direction="column" p="4">
        {languageId === 1 && (
          <Heading
            as="h2"
            maxWidth="100%"
            fontSize={responsiveHeadingLg}
            py="4"
          >
            What is {sweByLesson[currentQuestion].swe_word} in English?
          </Heading>
        )}
        {languageId === 2 && (
          <Heading
            as="h2"
            maxWidth="100%"
            fontSize={responsiveHeadingLg}
            py="4"
          >
            What is {engByLesson[currentQuestion].eng_word} in Swedish?
          </Heading>
        )}
        <Input
          size="lg"
          placeholder="write your answer here..."
          isRequired
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <Flex direction="row" align="center" justify="center" mt="5">
          <Heading maxWidth="50%" fontSize={responsiveHeadingSm} mr="5">
            Next Question
          </Heading>
          <IconButton
            aria-label="Next Question"
            variant="link"
            fontSize="4xl"
            icon={<FiArrowRightCircle />}
            _hover={{
              transform: 'scale(0.9)',
              color: '#bec3c9',
            }}
            onClick={() => {
              setAnswer('');
              nextQuestion();
            }}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Quiz;
