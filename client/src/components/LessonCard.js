import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../contexts/Globals';
import StylesContext from '../contexts/Styles';
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
  let { responsiveContainerSm, responsiveBodyTextSm, responsiveHeadingMd } =
    useContext(StylesContext);

  let navigate = useNavigate();

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
          aria-label="Go to lesson"
          onClick={() => {
            setLessonId(id);
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
          fontSize={responsiveBodyTextSm}
          fontWeight="medium"
          lineHeight="tall"
        >
          {description}
        </Text>
      </Flex>
      <Tag
        size="sm"
        mt="4"
        px="3"
        mr="2"
        borderRightRadius="full"
        borderBottomLeftRadius="full"
      >
        {categoryName}
      </Tag>
      <Tag
        size="sm"
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
