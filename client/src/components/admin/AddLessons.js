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
  Textarea,
  Select,
  useToast,
} from '@chakra-ui/react';

const AddLessons = () => {
  const {
    responsiveContainerLg,
    responsiveBodyTextSm,
    responsiveHeadingMd,
    responsiveHeadingLg,
  } = useContext(StylesContext);
  let {
    categories,
    category_id,
    description,
    lessons,
    title,
    setCategory_id,
    setDescription,
    setLessons,
    setTitle,
  } = useContext(GlobalContext);

  const toast = useToast();
  const navigate = useNavigate();

  // clear all fields and redirect user to the admin/lessons page
  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setCategory_id(null);
    navigate('/admin/lessons/');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newLesson = {
      title: title,
      description: description,
      category_id: category_id,
    };
    try {
      const response = await axios.post('/api/lessons/', newLesson);
      const allLessons = [...lessons, response.data];
      setLessons(allLessons);
      setTitle('');
      setDescription('');
      setCategory_id(null);
      toast({
        title: 'Lesson created.',
        description: 'The lesson has been added to the database.',
        duration: 9000,
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
            Lets create <br /> a new lesson:
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
              <Flex direction="row" width="100%" justify="left">
                <Heading as="h4" fontSize={responsiveHeadingMd} pl="2">
                  Lesson info:
                </Heading>
              </Flex>

              <FormControl isRequired>
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
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={'Give the lesson a name...'}
                  px="2"
                />
              </FormControl>

              <FormControl isRequired>
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
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={"Describe the lesson's topic briefly..."}
                  px="2"
                />
              </FormControl>

              <FormControl isRequired>
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
                  value={category_id}
                  onChange={e => setCategory_id(e.target.value)}
                  placeholder="Select category"
                  isRequired="true"
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

export default AddLessons;
