import React, { useContext } from 'react';
import GlobalContext from '../contexts/Globals';
import { Flex } from '@chakra-ui/react';
import Quiz from '../components/quiz/Quiz';
import QuizEndScreen from '../components/quiz/QuizEndScreen';
import QuizMenu from '../components/quiz/QuizMenu';

const QuizView = () => {
  let { quizState } = useContext(GlobalContext);

  return (
    <Flex direction="column" align="center" m="2" p="2">
      {quizState === 'menu' && <QuizMenu />}
      {quizState === 'quiz' && <Quiz />}
      {quizState === 'endScreen' && <QuizEndScreen />}
    </Flex>
  );
};

export default QuizView;
