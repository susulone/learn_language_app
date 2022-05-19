import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

const EditWords = () => {
  const {
    responsiveBodyTextSm,
    responsiveButtonMd,
    responsiveButtonSm,
    responsiveContainerLg,
    responsiveHeadingLg,
    responsiveHeadingMd,
  } = useContext(StylesContext);
  let {
    allWordMatches,
    id,
    lessons,
    setWordMatch,
    setAllWordMatches,
    setEngWord,
    setId,
    setLesson_id,
    setSweWord,
    setWordMatches,
    setWordMatchId,
    wordMatch,
    wordMatchId,
    wordMatches,
  } = useContext(GlobalContext);
  const toast = useToast();
  const { matchId } = useParams();
  const navigate = useNavigate();

  let [editEngWord, setEditEngWord] = useState('');
  let [editSweWord, setEditSweWord] = useState('');
  let [editLesson_id, setEditLesson_id] = useState(null);

  useEffect(() => {
    async function getWordMatchById() {
      setWordMatchId(matchId);
      try {
        let response = await axios.get(`/api/words/${wordMatchId}`);
        let data = await response.data;
        setWordMatch(data);
        console.log(data);
        console.log('getWordMatchById to edit');
        setEditEngWord(data.eng_word);
        setEditSweWord(data.swe_word);
        setEditLesson_id(data.lesson_id);
      } catch (err) {
        console.log(err.response);
      }
    }
    getWordMatchById();
  }, [wordMatchId]);

  // clear all fields and redirect user to the lessons page
  const handleCancel = () => {
    setEditEngWord('');
    setEditSweWord('');
    setEditLesson_id(null);
    navigate('/admin/words/');
  };

  const handleEdit = async e => {
    e.preventDefault();
    const editedWordMatch = {
      wordId: id,
      engWord: editEngWord,
      sweWord: editSweWord,
      lessonId: editLesson_id,
    };
    console.log(editedWordMatch);
    try {
      const response = await axios.put(
        `/api/words/${wordMatchId}`,
        editedWordMatch
      );
      setAllWordMatches(
        allWordMatches.map(match =>
          match.id === wordMatchId ? { ...response.data } : match
        )
      );
      setEditEngWord('');
      setEditSweWord('');
      setEditLesson_id(null);

      toast({
        title: 'Success.',
        description: 'The word pair has been updated.',
        duration: 5000,
        isClosable: true,
      });
      navigate(`/admin/words/`);
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = async e => {
    try {
      const response = await axios.delete(`/api/words/${wordMatchId}`);
      const wordMatchList = wordMatches.filter(
        match => match.id !== wordMatchId
      );
      setAllWordMatches(wordMatchList);
      toast({
        title: 'Word match deleted.',
        description: 'This word match has been deleted from the database.',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  //   const handleSubmit = async e => {
  //     e.preventDefault();
  //     const newWordPair = {
  //       eng_word: engWord,
  //       swe_word: sweWord,
  //       lesson_id: lesson_id,
  //     };
  //     try {
  //       const newWordPairRes = await axios.post('/api/words', newWordPair);
  //       const updatedWords = [...wordMatches, newWordPairRes.data];
  //       setWordMatches(updatedWords);
  //       setSweWord('');
  //       setEngWord('');

  //       toast({
  //         title: 'Words added.',
  //         description: 'The words have been added to the database.',
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //       navigate('/admin/words');
  //     } catch (err) {
  //       if (err.response) {
  //         // Not in the 200 response range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   };

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
            Edit the word match:
          </Heading>

          <form method="PUT">
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
                  Edit words:
                </Heading>
                <Text as="h4" fontSize={responsiveBodyTextSm} pl="2">
                  You can change the lesson this word pair belongs to. This will
                  enables the words to be shown in the lessons different
                  activities.
                </Text>
              </Flex>
              <FormControl>
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
                  value={editEngWord}
                  onChange={e => setEditEngWord(e.target.value)}
                  px="2"
                />
              </FormControl>

              <FormControl>
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
                  value={editSweWord}
                  onChange={e => setEditSweWord(e.target.value)}
                  px="2"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="lessonId" fontWeight="medium" pl="4" mb="1">
                  Select related lesson:
                </FormLabel>
                <Select
                  id="lessonId"
                  value={editLesson_id}
                  onChange={e => setEditLesson_id(e.target.value)}
                  maxWidth="100%"
                  variant="filled"
                >
                  {lessons.map(lesson => (
                    <option value={lesson.id}>{lesson.title}</option>
                  ))}
                </Select>
              </FormControl>

              <Flex direction="row" width="100%" justify="space-evenly" mt="3">
                <>
                  <Button
                    onClick={onOpen}
                    _hover={{
                      transform: 'scale(0.98)',
                      color: 'red.300',
                    }}
                    size={responsiveButtonSm}
                    variant="ghost"
                  >
                    Delete this word match
                  </Button>
                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Delete this word match
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => {
                              handleDelete();
                              onClose();
                              navigate('/admin/words/');
                            }}
                            ml={3}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </>
                <Button
                  type="cancel"
                  onClick={handleCancel}
                  _hover={{
                    transform: 'scale(0.98)',
                  }}
                  size={responsiveButtonMd}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={handleEdit}
                  _hover={{
                    transform: 'scale(0.98)',
                  }}
                  size={responsiveButtonMd}
                >
                  Save
                </Button>
              </Flex>
            </Flex>
          </form>
        </>
      </Box>
    </Flex>
  );
};

export default EditWords;
