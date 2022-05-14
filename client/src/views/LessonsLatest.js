import React, { useContext } from 'react';
import GlobalContext from '../contexts/Globals';
import StylesContext from '../contexts/Styles';
import { Box, Flex, Heading } from '@chakra-ui/react';
import LoadIndicator from '../components/LoadIndicator';
import LessonCard from '../components/LessonCard';
import CategoryContainer from '../components/CategoryContainer';

const LessonsLatest = () => {
  let { contentIsLoading, lessons } = useContext(GlobalContext);

  const { responsiveContainerSm, responsiveHeadingLg, responsiveLayout } =
    useContext(StylesContext);

  return (
    <Flex
      direction="column"
      align="center"
      textAlign="left"
      // border="solid"   // for testing only
    >
      <Box
        width={responsiveContainerSm}
        direction="column"
        // border="solid"   // for testing only
      >
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
      <Box
        width={responsiveContainerSm}
        direction={responsiveLayout}
        mt="10"
        pl="5"
        // border="solid"   // for testing only
      >
        <CategoryContainer />
      </Box>
    </Flex>
  );
};

export default LessonsLatest;
