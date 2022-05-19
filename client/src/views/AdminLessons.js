import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import GlobalContext from '../contexts/Globals';
import StylesContext from '../contexts/Styles';
import { Flex, Button, Heading } from '@chakra-ui/react';
import LoadIndicator from '../components/LoadIndicator';
import SmallLessonCard from '../components/SmallLessonCard';
import { useNavigate } from 'react-router-dom';

const AdminLessons = () => {
  const { responsiveHeadingLg } = useContext(StylesContext);
  let { contentIsLoading, lessons, lesson, setLessons, setContentIsLoading } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getLessons() {
      let response = await axios.get('/api/lessons/with-category-name/');
      let data = await response.data;
      setLessons(data);
      setContentIsLoading(false);
    }
    console.log('getLesson (from AdminLessons) ran');
    getLessons();
  }, [lesson]);

  return (
    <Flex direction="column" align="center" m="2" p="2">
      <Flex direction="column" maxWidth="fit-content" textAlign="left" p="4">
        <Heading
          as="h2"
          fontSize={responsiveHeadingLg}
          py="2"
          pl="5"
          mt="4"
          mb="3"
        >
          Lessons:
        </Heading>
        <Flex justify="center" mb="3">
          <Button onClick={() => navigate('/admin/lessons/add')}>
            Create New Lesson
          </Button>
        </Flex>
        {contentIsLoading === true && <LoadIndicator />}
        {contentIsLoading === false &&
          lessons.map(lesson => (
            <SmallLessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              categoryName={lesson.category}
              parentCategoryName={lesson.parent_category}
              description={lesson.description}
            />
          ))}
      </Flex>
    </Flex>
  );
};

export default AdminLessons;
