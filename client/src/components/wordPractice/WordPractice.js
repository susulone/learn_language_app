import React, { useContext } from 'react';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import LangBotWithFlags from './LangbotWithFlags';

const WordPractice = () => {
  let { wordPairs } = useContext(GlobalContext);
  let { responsiveContainerSm } = useContext(StylesContext);

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
        {wordPairs.map((wordPair, index) => (
          <Tab key={wordPair.id}>{index + 1}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {wordPairs.map(wordPair => (
          <TabPanel key={wordPair.id}>
            <LangBotWithFlags
              wordInEng={wordPair.eng_word}
              wordInSwe={wordPair.swe_word}
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default WordPractice;
