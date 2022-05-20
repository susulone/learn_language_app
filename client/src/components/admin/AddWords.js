/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
import React, { useContext, useState } from 'react';
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
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';

const AddWords = () => {
  const {
    responsiveContainerLg,
    responsiveBodyTextSm,
    responsiveHeadingLg,
    responsiveHeadingMd,
  } = useContext(StylesContext);
  let { lessons, allWordMatches, setAllWordMatches } =
    useContext(GlobalContext);

  let [sweWord, setSweWord] = useState('');
  let [engWord, setEngWord] = useState('');
  let [lesson_id, setLesson_id] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();

  /**
   * handleCancel function will clear the fields in the form
   * by reverting all the used setStates values back to their defaults.
   * Lastly it will redirect the user to the /admin/words page.
   * @function handleCancel
   */
  const handleCancel = () => {
    setEngWord('');
    setSweWord('');
    setLesson_id(null);
    navigate('/admin/words');
  };

  /**
   * @async
   * @function handleSubmit
   * @param {event} e
   */
  const handleSubmit = async e => {
    e.preventDefault();
    /**
     * newWordPair will take the user given input values from the form and
     * configures them into an object to be sent to the backend within the
     * post request.
     * @type {{eng_word: string, swe_word: string, lesson_id: number}}
     * @memberof handleSubmit
     */
    const newWordPair = {
      eng_word: engWord,
      swe_word: sweWord,
      lesson_id: lesson_id,
    };
    try {
      const newWordPairRes = await axios.post('/api/words', newWordPair);
      const updatedWords = [...allWordMatches, newWordPairRes.data];
      setAllWordMatches(updatedWords);
      setSweWord('');
      setEngWord('');

      toast({
        title: 'Words added.',
        description: 'The words have been added to the database.',
        duration: 9000,
        isClosable: true,
      });
      navigate('/admin/words');
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
            Lets add new words:
          </Heading>

          <form method="POST" onSubmit={handleSubmit}>
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
              <Flex direction="column" gap="2">
                <Heading as="h4" fontSize={responsiveHeadingMd} pl="2">
                  Add both translations:
                </Heading>
                <Text as="h4" fontSize={responsiveBodyTextSm} pl="2">
                  Write the word's both translations into the correct fields.
                  Currently we only support adding one new word at a time.
                </Text>
              </Flex>
              <FormControl isRequired>
                <FormLabel
                  htmlFor="language1_id"
                  fontSize={responsiveBodyTextSm}
                  fontWeight="normal"
                  px="2"
                >
                  English translation:
                </FormLabel>
                <Input
                  id="language1_id"
                  type="text"
                  value={engWord}
                  onChange={e => setEngWord(e.target.value)}
                  placeholder="Give the English translation..."
                  px="2"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel
                  htmlFor="language2_id"
                  fontSize={responsiveBodyTextSm}
                  fontWeight="normal"
                  px="2"
                >
                  Swedish translation:
                </FormLabel>
                <Input
                  id="language2_id"
                  type="text"
                  value={sweWord}
                  onChange={e => setSweWord(e.target.value)}
                  placeholder="Give the Swedish translation..."
                  px="2"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="lessonId" fontWeight="medium" pl="4" mb="1">
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

export default AddWords;
