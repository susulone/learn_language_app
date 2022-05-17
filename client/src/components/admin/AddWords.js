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
  Input,
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
  let {
    sweWord,
    sweWords,
    setSweWord,
    setSweWords,
    engWord,
    engWords,
    setEngWord,
    setEngWords,
  } = useContext(GlobalContext);

  const toast = useToast();
  const navigate = useNavigate();

  // clear all fields and redirect user to the lessons page
  const handleCancel = () => {
    setEngWord('');
    setSweWord('');
    navigate('/lessons/latest');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newSweWord = {
      word: sweWord,
    };
    const newEngWord = {
      word: engWord,
    };
    try {
      const sweResponse = await axios.post('/api/swe', newSweWord);
      const allSweWords = [...sweWords, sweResponse.data];
      setSweWords(allSweWords);
      setSweWord('');

      const engResponse = await axios.post('/api/eng', newEngWord);
      const allEngWords = [...engWords, engResponse.data];
      setEngWords(allEngWords);
      setEngWord('');

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
