/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
import React, { useContext } from 'react';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import LangBotWithEnglishFlag from '../../assets/langbot-with-english-flag.svg';
import LangBotWithSwedishFlag from '../../assets/langbot-with-swedish-flag.svg';

const QuizMenu = () => {
  let { setQuizState, language, setLanguageId, languageId } =
    useContext(GlobalContext);
  const { responsiveContainerLg, responsiveHeadingLg, responsiveImg } =
    useContext(StylesContext);

  const handleClick = () => {
    if (languageId === 1) {
      setLanguageId(2);
    } else {
      setLanguageId(1);
    }
  };

  return (
    <Flex direction="column" justify="center" m="2" p="2" textAlign="left">
      <Box width={responsiveContainerLg} direction="column" p="4">
        <Heading as="h2" maxWidth="80%" fontSize={responsiveHeadingLg} py="4">
          I want to test myself on {language.language.toUpperCase()} words
        </Heading>
        <Flex onClick={handleClick} justify="center" mt="3">
          {languageId === 1 && (
            <Image
              height={responsiveImg}
              src={LangBotWithEnglishFlag}
              alt="Langbot holding up the English flag"
            />
          )}
          {languageId === 2 && (
            <Image
              height={responsiveImg}
              src={LangBotWithSwedishFlag}
              alt="Langbot holding up the English flag"
            />
          )}
        </Flex>
        <Text
          as="body"
          fontSize={{ base: 'md', md: 'lg', lg: 'lg' }}
          fontWeight="medium"
          lineHeight="tall"
          mt="5"
        >
          Langbot will shown you a word in English and you need to write the
          word correctly in Swedish.
        </Text>
        <Text
          as="body"
          fontSize={{ base: 'md', md: 'lg', lg: 'lg' }}
          fontWeight="medium"
          lineHeight="tall"
          mt="5"
        >
          For every correct answer you will get one point. And at the end of the
          quiz Langbot will tell you your score.
        </Text>
        <Text
          as="body"
          fontSize={{ base: 'md', md: 'lg', lg: 'lg' }}
          fontWeight="medium"
          lineHeight="tall"
          mt="3"
        >
          Are you ready? Let’s test what you have learned!
        </Text>
        <Button mt="5" onClick={() => setQuizState('quiz')}>
          Start Quiz
        </Button>
      </Box>
    </Flex>
  );
};

export default QuizMenu;
