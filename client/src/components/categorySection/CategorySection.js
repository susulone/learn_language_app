import React, { useContext } from 'react';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';
import { Flex, Image, useBreakpointValue } from '@chakra-ui/react';
import CategoryContainer from './CategoryContainer';
import LangBotLesson from '../../assets/langbot-lesson.svg';
import LangBotSearch from '../../assets/langbot-search.svg';

const CategorySection = () => {
  const { responsiveLayout, responsiveImg } = useContext(StylesContext);
  let { categoryImage } = useContext(GlobalContext);

  const responsiveCategorySection = useBreakpointValue({
    base: 'sm',
    md: 'xl',
    lg: '2xl',
  });

  const responsiveAlignment = useBreakpointValue({
    base: 'top',
    md: 'center',
  });

  return (
    <Flex
      width={responsiveCategorySection}
      direction={responsiveLayout}
      align={responsiveAlignment}
      justify="space-between"
      textAlign="left"
    >
      <CategoryContainer />
      {categoryImage === 'lessons' && (
        <Flex justify="right" mt="10">
          <Image
            maxHeight={responsiveImg}
            src={LangBotLesson}
            alt="Langbot looking happy and asking: 'What are we learning next?'"
            ml="2"
          />
        </Flex>
      )}
      {categoryImage === 'search' && (
        <Flex justify="right" mt="10">
          <Image
            maxHeight={responsiveImg}
            src={LangBotSearch}
            alt="Langbot peering through a magnifying glass and saying: 'Can I help? I'm really good at finding things!'"
            ml="2"
          />
        </Flex>
      )}
    </Flex>
  );
};

export default CategorySection;
