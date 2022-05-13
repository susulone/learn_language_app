import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/Globals';
import StylesContext from '../context/Styles';
import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Tag,
  Text,
} from '@chakra-ui/react';
import { FiArrowRightCircle } from 'react-icons/fi';

const LessonCard = ({
  key,
  id,
  title,
  categoryName,
  parentCategoryName,
  description,
}) => {
  let { setLessonId } = useContext(GlobalContext);
  let {
    responsiveContainerSm,
    responsiveBodyText,
    responsiveHeadingMd,
    responsiveButtonSm,
  } = useContext(StylesContext);

  let navigate = useNavigate();

  const handleClick = () => {
    setLessonId(id);
  };

  return (
    <Box
      key={key}
      maxWidth={responsiveContainerSm}
      borderWidth="1px"
      borderRadius="lg"
      p="5"
      overflow="hidden"
      shadow="md"
    >
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        pb="3"
      >
        <Heading maxWidth="70%" fontSize={responsiveHeadingMd}>
          {title}
        </Heading>
        <IconButton
          aria-label="Go to quiz"
          onClick={() => {
            handleClick();
            navigate(`/lessons/${id}`);
          }}
          variant="link"
          fontSize="4xl"
          icon={<FiArrowRightCircle />}
          _hover={{
            transform: 'scale(0.9)',
            color: '#bec3c9',
          }}
        />
      </Flex>
      <Flex direction="column" gap="5">
        <Divider />
        <Text
          fontSize={responsiveBodyText}
          fontWeight="medium"
          lineHeight="tall"
        >
          {description}
        </Text>
      </Flex>
      <Tag
        size={responsiveButtonSm}
        mt="4"
        px="3"
        mr="2"
        borderRightRadius="full"
        borderBottomLeftRadius="full"
      >
        {categoryName}
      </Tag>
      <Tag
        size={responsiveButtonSm}
        mt="4"
        px="3"
        mr="2"
        borderRightRadius="full"
        borderBottomLeftRadius="full"
      >
        {parentCategoryName}
      </Tag>
    </Box>
  );
};
export default LessonCard;
