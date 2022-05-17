import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Select,
  useToast,
} from '@chakra-ui/react';

const AddWordMatches = () => {
  const {
    responsiveContainerLg,
    responsiveBodyTextSm,
    responsiveHeadingLg,
    responsiveHeadingMd,
  } = useContext(StylesContext);
  let {
    lessons,
    sweWords,
    engWords,
    lang1WordId,
    setLang1WordId,
    lang2WordId,
    setLang2WordId,
    lesson_id,
    setLesson_id,
    wordMatches,
    setWordMatches,
  } = useContext(GlobalContext);

  const toast = useToast();
  const navigate = useNavigate();

  // clear all fields and redirect user to the lessons page
  const handleCancel = () => {
    setLang1WordId(null);
    setLang2WordId(null);
    setLesson_id(null);
    navigate('/lessons/latest');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newWordMatch = {
      language1_id: 1,
      language1_word_id: lang1WordId,
      language2_id: 2,
      language2_word_id: lang2WordId,
      lesson_id: lesson_id,
    };
    try {
      const wordMatchResponse = await axios.post('/api/pairs', newWordMatch);
      const allWordMatches = [...wordMatches, wordMatchResponse.data];
      setWordMatches(allWordMatches);
      setLang1WordId(null);
      setLang2WordId(null);
      setLesson_id(null);

      toast({
        title: 'Words added.',
        description: 'The words have been added to the database.',
        duration: 9000,
        isClosable: true,
      });
      navigate('/lessons/latest');
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  return (
    <Flex justify="center" textAlign="left">
      <Box width={responsiveContainerLg} justify="center">
        <>
          <Heading
            as="h2"
            fontSize={responsiveHeadingLg}
            py="2"
            pl="5"
            mt="4"
            mb="6"
          >
            Lets create <br /> a new word match:
          </Heading>
          <form method="POST" onSubmit={handleSubmit} border="solid">
            <Flex
              direction="column"
              gap="4"
              align="center"
              maxWidth={responsiveContainerLg}
              textAlign="left"
              borderWidth="1px"
              borderRadius="lg"
              p="5"
              overflow="hidden"
              shadow="md"
            >
              <Flex direction="row" width="100%" justify="left">
                <Flex direction="column" gap="2">
                  <Heading as="h4" fontSize={responsiveHeadingMd} pl="2">
                    Set words as a match:
                  </Heading>
                  <Text as="h4" fontSize={responsiveBodyTextSm} pl="2">
                    Select the matching translations from the lists and assign
                    them to a lesson. This step will form the "word match" that
                    ables you to build the practices and quizzes.
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap="4" p="3">
                <FormControl isRequired>
                  <FormLabel
                    htmlFor="engWord"
                    fontWeight="medium"
                    pl="4"
                    mb="1"
                  >
                    English translation:
                  </FormLabel>
                  <Select
                    id="sweWord"
                    value={lang1WordId}
                    onChange={e => setLang1WordId(e.target.value)}
                    placeholder="Select translation"
                    isRequired="true"
                    maxWidth="100%"
                    variant="filled"
                  >
                    {engWords.map(engWord => (
                      <option value={engWord.id}>{engWord.word}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel
                    htmlFor="sweWord"
                    fontWeight="medium"
                    pl="4"
                    mb="1"
                  >
                    Swedish translation:
                  </FormLabel>
                  <Select
                    id="sweWord"
                    value={lang2WordId}
                    onChange={e => {
                      setLang2WordId(e.target.value);
                    }}
                    placeholder="Select translation"
                    isRequired="true"
                    maxWidth="100%"
                    variant="filled"
                  >
                    {sweWords.map(sweWord => (
                      <option value={sweWord.id}>{sweWord.word}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel
                    htmlFor="lessonId"
                    fontWeight="medium"
                    pl="4"
                    mb="1"
                  >
                    Select related lesson:
                  </FormLabel>
                  <Select
                    id="lessonId"
                    value={lesson_id}
                    onChange={e => setLesson_id(e.target.value)}
                    placeholder="Select lesson"
                    isRequired="true"
                    maxWidth="100%"
                    variant="filled"
                  >
                    {lessons.map(lesson => (
                      <option value={lesson.id}>{lesson.title}</option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>

              <Flex direction="row" width="100%" justify="space-evenly">
                <Button
                  type="cancel"
                  variant="outline"
                  mt="3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="submit" mt="3">
                  Submit
                </Button>
              </Flex>
            </Flex>
          </form>
        </>
      </Box>
    </Flex>
  );
};

export default AddWordMatches;
