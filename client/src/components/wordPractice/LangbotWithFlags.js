import React, { useContext, useState } from 'react';
import StylesContext from '../../contexts/Styles';
import { Box, Heading, Image, Stack } from '@chakra-ui/react';
import LangBotWithEnglishFlag from '../../assets/langbot-with-english-flag.svg';
import LangBotWithSwedishFlag from '../../assets/langbot-with-swedish-flag.svg';

const LangBotWithFlags = ({ wordInEng, wordInSwe }) => {
  const { responsiveBodyText } = useContext(StylesContext);
  let [showFlag, setShowFlag] = useState('English');
  let [oppositeLang, setOppositeLang] = useState('Swedish');

  const handleClick = () => {
    if (showFlag === 'English') {
      setShowFlag('Swedish');
      setOppositeLang('English');
    } else {
      setShowFlag('English');
      setOppositeLang('Swedish');
    }
  };

  return (
    <Box onClick={handleClick} maxW="100%">
      {showFlag === 'English' && (
        <Stack direction="row" align="start" justify="left">
          <Image
            boxSize="200px"
            src={LangBotWithEnglishFlag}
            alt="Langbot holding up the English flag"
          />
          <Heading size="4xl" pt="14">
            {wordInEng}
          </Heading>
        </Stack>
      )}
      {showFlag === 'Swedish' && (
        <Stack direction="row" align="start" justify="left">
          <Image
            boxSize="200px"
            src={LangBotWithSwedishFlag}
            alt="Langbot holding up the English flag"
          />
          <Heading size="4xl" pt="14">
            {wordInSwe}
          </Heading>
        </Stack>
      )}
      {/* <Stack textAlign="left">
        <Heading
          fontSize={responsiveBodyText}
        >{`Remember you can give Langbot a poke to see the word in ${oppositeLang}`}</Heading>
      </Stack> */}
    </Box>
  );
};

export default LangBotWithFlags;
