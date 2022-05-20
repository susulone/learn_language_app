/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
import React, { useContext } from 'react';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';
import {
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Image,
} from '@chakra-ui/react';
import LangBot100 from '../../assets/langbot-score-100.svg';
import LangBot80 from '../../assets/langbot-score-80.svg';
import LangBot50 from '../../assets/langbot-score-50.svg';
import LangBot30 from '../../assets/langbot-score-30.svg';
import LangBot0 from '../../assets/langbot-score-0.svg';

const QuizScore = () => {
  let { score, maxScore } = useContext(GlobalContext);

  const {
    responsiveImg,
    responsiveLayoutReverse,
    responsiveHeadingLg,
    responsiveHeadingSm,
  } = useContext(StylesContext);

  let result = (score / maxScore) * 100;
  return (
    <Flex direction={responsiveLayoutReverse} justify="center" mt="12">
      <Flex direction="column" gap="5">
        <Flex direction="column" align="center">
          <Heading as="h2" fontSize={responsiveHeadingSm}>
            {result === 100 && 'Wow!'}
            {result >= 80 && result < 100 && 'Exellent!'}
            {result >= 50 && result < 80 && 'Well done!'}
            {result >= 30 && result < 50 && "Let's try again!"}
            {result < 30 && "Let's practise more!"}
          </Heading>
          <Heading as="h2" fontSize={responsiveHeadingSm}>
            Your score was:
          </Heading>
        </Flex>
        <CircularProgress
          max={maxScore}
          value={score}
          size="125px"
          color="blue.400"
          thickness="0.5rem"
        >
          <CircularProgressLabel>
            <Flex direction="row" align="baseline" justify="center">
              <Heading as="h3" fontSize={responsiveHeadingLg}>
                {score}/
              </Heading>
              <Heading as="h3" fontSize={responsiveHeadingSm}>
                {maxScore}
              </Heading>
            </Flex>
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
      <Flex direction="column" align="center" pt="6">
        {result === 100 && (
          <Image
            height={responsiveImg}
            src={LangBot100}
            alt="Langbot looking extatic"
          />
        )}
        {result >= 80 && result < 100 && (
          <Image
            height={responsiveImg}
            src={LangBot80}
            alt="Langbot looking very happy"
          />
        )}
        {result >= 50 && result < 80 && (
          <Image
            height={responsiveImg}
            src={LangBot50}
            alt="Langbot looking happy"
          />
        )}
        {result >= 30 && result < 50 && (
          <Image
            height={responsiveImg}
            src={LangBot30}
            alt="Langbot looking encouraging"
          />
        )}
        {result < 30 && (
          <Image
            height={responsiveImg}
            src={LangBot0}
            alt="Langbot looking sad"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default QuizScore;
