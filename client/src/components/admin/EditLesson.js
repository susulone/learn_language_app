import React, { useContext, useEffect } from 'react';
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
  Textarea,
  Select,
  useToast,
} from '@chakra-ui/react';

const EditLesson = () => {
  const {
    responsiveContainerLg,
    responsiveBodyTextSm,
    responsiveHeadingMd,
    responsiveHeadingLg,
  } = useContext(StylesContext);
  let {
    lessonId,
    categories,
    editCategory_id,
    editDescription,
    lessons,
    editTitle,
    setEditTitle,
    setEditCategory_id,
    setEditDescription,
    setLessons,
    setLesson,
  } = useContext(GlobalContext);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function getLessonById() {
      try {
        let response = await axios.get(`/api/lessons/${lessonId}`);
        let data = await response.data;
        setLesson(data);
        setEditTitle(data.title);
        setEditDescription(data.description);
        setEditCategory_id(data.category_id);
      } catch (err) {
        console.log(err.response);
      }
    }
    console.log('getLessonById - edit ran');
    getLessonById();
  }, [lessonId]);

  // clear all fields and redirect user to the admin/lessons page
  const handleCancel = () => {
    setEditTitle('');
    setEditDescription('');
    setEditCategory_id(null);
    navigate('/admin/lessons/');
  };

  const handleEdit = async e => {
    const editedLesson = {
      title: editTitle,
      description: editDescription,
      category_id: editCategory_id,
      parent_id: 1,
      parent_category: 'numbers',
    };
    try {
      const response = await axios.put(
        `/api/lessons/${lessonId}/`,
        editedLesson
      );
      setLessons(
        lessons.map(lesson =>
          lesson.id === lessonId ? { ...response.data } : lesson
        )
      );
      setEditTitle('');
      setEditDescription('');
      setEditCategory_id(null);
      toast({
        title: 'Lesson created.',
        description: 'The lesson has been added to the database.',
        duration: 5000,
        isClosable: true,
      });
      navigate('/admin/lessons/');
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
            Lets edit <br /> the lesson:
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
              <Flex direction="row" width="100%" justify="left">
                <Heading as="h4" fontSize={responsiveHeadingMd} pl="2">
                  Lesson info:
                </Heading>
              </Flex>

              <FormControl>
                <FormLabel
                  htmlFor="title"
                  fontSize={responsiveBodyTextSm}
                  fontWeight="normal"
                  px="2"
                >
                  Title:
                </FormLabel>
                <Input
                  id="title"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  px="2"
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="description"
                  fontSize={responsiveBodyTextSm}
                  fontWeight="normal"
                  px="2"
                  mb="1"
                >
                  Description:
                </FormLabel>
                <Textarea
                  id="description"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  px="2"
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="category"
                  fontSize={responsiveBodyTextSm}
                  fontWeight="normal"
                  px="2"
                >
                  Related category:
                </FormLabel>
                <Select
                  id="category"
                  value={editCategory_id}
                  onChange={e => setEditCategory_id(e.target.value)}
                  variant="filled"
                  maxWidth="100%"
                >
                  {categories.map(category => (
                    <option value={category.id}>{category.category}</option>
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
                <Button type="submit" mt="3" onClick={handleEdit}>
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

export default EditLesson;
