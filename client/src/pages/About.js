import React, { useContext } from 'react';
import StylesContext from '../contexts/Styles';
import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import LangBot from '../assets/langbot-score-30.svg';

const About = () => {
  const {
    responsiveContainer2xl,
    responsiveBodyText,
    responsiveHeadingMd,
    responsiveImg,
  } = useContext(StylesContext);
  return (
    <Flex
      maxWidth={responsiveContainer2xl}
      direction="column"
      // justify="center"
      align="center"
      minHeight="85vh"
      m="2"
      mt="10"
    >
      <Stack
        direction="column"
        maxWidth="80%"
        textAlign="left"
        width="fit-content"
        spacing="3"
      >
        <Heading as="h3" size="2xl">
          Hi there!
        </Heading>
        <Heading as="h3" fontSize={responsiveHeadingMd}>
          My name is Langbot and I'm here to help you learn new words in
          Swedish!
        </Heading>
        <Text fontSize={responsiveBodyText} fontWeight="medium">
          You can head to the <b>Lessons</b> section to start practicing your
          new vocabulary.
        </Text>
        <Text fontSize={responsiveBodyText} fontWeight="medium">
          Each lesson has a practice section where you can practice the words
          with my help! And after you feel like you are ready, you can test what
          you have leand on the quiz section!
        </Text>
        <Flex justify="center">
          <Image
            height={responsiveImg}
            src={LangBot}
            alt="Langbot looking happy that you are here!"
          />
        </Flex>
        <Stack spacing="1" pt="2">
          <Heading fontSize={responsiveHeadingMd}>PSST! Hey teacher!</Heading>
          <Text fontSize={responsiveBodyText} fontWeight="medium">
            Dont forget that to access the admin tools you must select the{' '}
            <b>teacher mode</b> from the top of the page. This will reveal you
            the hidden options on the menu!
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default About;
