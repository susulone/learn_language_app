/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';
import { Box, Tag, Heading, useBreakpointValue } from '@chakra-ui/react';

const CategoryContainer = () => {
  let {
    categories,
    // setCategoryId
  } = useContext(GlobalContext);
  let { responsiveHeadingXs } = useContext(StylesContext);

  const responsiveMargin = useBreakpointValue({
    base: '10',
    md: '0',
  });

  // This feature is not currently available
  // let navigate = useNavigate();
  // const handleClick = id => {
  //   setCategoryId(id);
  // };

  return (
    <Box pl="5" mt={responsiveMargin}>
      <Heading fontSize={responsiveHeadingXs} mb="3">
        Categories:
      </Heading>
      {categories.map(category => (
        <Tag
          key={category.id}
          // as="button"
          // onClick={() => {
          //   handleClick(category.id);
          //   navigate(`/categories/${category.id}`);
          // }}
          size="md"
          borderRightRadius="full"
          borderBottomLeftRadius="full"
          px="4"
          mr="2"
          mb="2"
        >
          {category.category}
        </Tag>
      ))}
    </Box>
  );
};

export default CategoryContainer;
