import React, { useContext, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import GlobalContext from '../contexts/Globals';
import StylesContext from '../contexts/Styles';
import { Box, Flex, Heading } from '@chakra-ui/react';
import LoadIndicator from '../components/LoadIndicator';
import LessonCard from '../components/LessonCard';
import CategorySection from '../components/categorySection/CategorySection';

const LessonsLatest = () => {
  const { responsiveContainerSm, responsiveHeadingLg } =
    useContext(StylesContext);
  let {
    setLessons,
    setContentIsLoading,
    lesson,
    contentIsLoading,
    lessons,
    setCategoryImage,
  } = useContext(GlobalContext);

  // useEffect(() => {
  //   async function getLessons() {
  //     let response = await axios.get('/api/lessons/with-category-name/');
  //     let data = await response.data;
  //     setLessons(data);
  //     setContentIsLoading(false);
  //     console.log('getLesson ran');
  //   }
  //   getLessons();
  // }, [lesson]);

  useLayoutEffect(() => {
    function updateLangbotImg() {
      setCategoryImage('lessons');
    }
    updateLangbotImg();
  }, []);

  return (
    <Flex direction="column" align="center" textAlign="left">
      <Box width={responsiveContainerSm} direction="column">
        <Heading
          as="h2"
          fontSize={responsiveHeadingLg}
          py="2"
          pl="5"
          mt="4"
          mb="6"
        >
          Choose <br /> your next lesson:
        </Heading>
        {contentIsLoading === true && <LoadIndicator />}
        {contentIsLoading === false &&
          lessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              categoryName={lesson.category}
              parentCategoryName={lesson.parent_category}
              description={lesson.description}
            />
          ))}
      </Box>
      <CategorySection />
    </Flex>
  );
};

export default LessonsLatest;
