import React, { useContext, useEffect } from 'react';
import GlobalContext from '../contexts/Globals';
import StylesContext from '../contexts/Styles';
import { Flex, Heading, Image, Stack } from '@chakra-ui/react';
import CategorySection from '../components/categorySection/CategorySection';

const Search = () => {
  let { responsiveContainer2xl } = useContext(StylesContext);
  const { setCategoryImage } = useContext(GlobalContext);

  useEffect(() => {
    function updateLangbotImg() {
      setCategoryImage('search');
    }
    updateLangbotImg();
  }, []);

  return (
    <Flex
      maxWidth={responsiveContainer2xl}
      direction="column"
      justify="end"
      align="center"
      minHeight="85vh"
      m="2"
    >
      <CategorySection />
    </Flex>
  );
};

export default Search;
