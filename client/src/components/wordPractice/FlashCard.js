/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
import React, { useContext, useState } from 'react';
import StylesContext from '../../contexts/Styles';
import {
  Box,
  Heading,
  Image,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import LangBotWithEnglishFlag from '../../assets/langbot-with-english-flag.svg';
import LangBotWithSwedishFlag from '../../assets/langbot-with-swedish-flag.svg';

const FlashCard = ({ wordInEng, wordInSwe }) => {
  const { responsiveImg } = useContext(StylesContext);
  let [showFlag, setShowFlag] = useState('English');

  const responsiveMargin = useBreakpointValue({
    base: '0',
    md: '5',
    lg: '10',
  });

  const handleClick = () => {
    if (showFlag === 'English') {
      setShowFlag('Swedish');
    } else {
      setShowFlag('English');
    }
  };

  return (
    <Box onClick={handleClick} maxW="100%">
      {showFlag === 'English' && (
        <Stack
          direction="row"
          align="start"
          justify="left"
          mx={responsiveMargin}
        >
          <Image
            height={responsiveImg}
            src={LangBotWithEnglishFlag}
            alt="Langbot holding up the English flag"
          />
          <Heading size="3xl" pt="14">
            {wordInEng}
          </Heading>
        </Stack>
      )}
      {showFlag === 'Swedish' && (
        <Stack
          direction="row"
          align="start"
          justify="left"
          mx={responsiveMargin}
        >
          <Image
            height={responsiveImg}
            src={LangBotWithSwedishFlag}
            alt="Langbot holding up the English flag"
          />
          <Heading size="3xl" pt="14">
            {wordInSwe}
          </Heading>
        </Stack>
      )}
    </Box>
  );
};

export default FlashCard;
