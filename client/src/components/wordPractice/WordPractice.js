import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import FlashCard from './FlashCard';

const WordPractice = () => {
  let {
    matchesByLesson,
    setMatchesByLesson,
    setMaxScore,
    setAvailability,
    lessonId,
  } = useContext(GlobalContext);
  let { responsiveContainerSm } = useContext(StylesContext);

  // useEffect(() => {
  //   async function getWordMatchesByLessonId() {
  //     try {
  //       let response = await axios.get(`/api/words/lesson${lessonId}`);
  //       if (response && response.data) {
  //         let data = await response.data;
  //         console.log('getWordMatchesByLessonId ran');
  //         setMatchesByLesson(data);
  //         setMaxScore(data.length);
  //         setAvailability(true);
  //       }
  //     } catch (err) {
  //       if (err.response.data === false) {
  //         setAvailability(false);
  //       }
  //     }
  //   }
  //   getWordMatchesByLessonId();
  // }, [lessonId]);

  return (
    <Tabs
      align="center"
      variant="line"
      size={responsiveContainerSm}
      isFitted
      isManual
      mt="5"
    >
      <TabList>
        {matchesByLesson.map((match, index) => (
          <Tab key={match.id}>{index + 1}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {matchesByLesson.map(match => (
          <TabPanel key={match.id}>
            <FlashCard wordInEng={match.eng_word} wordInSwe={match.swe_word} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default WordPractice;
