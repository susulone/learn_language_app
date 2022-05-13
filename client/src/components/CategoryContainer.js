import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/Globals';
import StylesContext from '../context/Styles';
import { Box, Tag, Heading } from '@chakra-ui/react';

const CategoryContainer = () => {
  let { categories, setCategoryId } = useContext(GlobalContext);
  let { responsiveHeadingSm, responsiveButtonLg } = useContext(StylesContext);
  let navigate = useNavigate();

  const handleClick = id => {
    setCategoryId(id);
  };

  return (
    <Box>
      <Heading fontSize={responsiveHeadingSm} mb="3">
        Categories:
      </Heading>
      {categories.map(category => (
        <Tag
          as="button"
          key={category.id}
          onClick={() => {
            handleClick(category.id);
            navigate(`/categories/${category.id}`);
          }}
          size={responsiveButtonLg}
          borderRightRadius="full"
          borderBottomLeftRadius="full"
          px="4"
          mr="3"
        >
          {category.category}
        </Tag>
      ))}
    </Box>
  );
};

export default CategoryContainer;
