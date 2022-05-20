/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../contexts/Globals';
import StylesContext from '../contexts/Styles';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Tag,
  Text,
} from '@chakra-ui/react';
import { FiArrowRightCircle } from 'react-icons/fi';

const SmallLessonCard = ({
  key,
  id,
  title,
  categoryName,
  parentCategoryName,
  description,
}) => {
  let { setLessonId } = useContext(GlobalContext);
  let { responsiveContainerLg, responsiveBodyTextSm, responsiveHeadingSm } =
    useContext(StylesContext);

  let navigate = useNavigate();

  return (
    <LinkBox
      as="button"
      width="100%"
      _hover={{
        transform: 'scale(0.99)',
      }}
      onClick={() => {
        setLessonId(id);
        navigate(`/lessons/${id}`);
      }}
    >
      <Box
        key={key}
        borderWidth="1px"
        borderRadius="lg"
        maxWidth={responsiveContainerLg}
        p="4"
        overflow="hidden"
        shadow="md"
        textAlign="left"
      >
        <LinkOverlay>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            pb="2"
          >
            <Heading maxWidth="60%" fontSize={responsiveHeadingSm}>
              {title}
            </Heading>
            <Icon as={FiArrowRightCircle} fontSize="3xl" focusable={false} />
          </Flex>
        </LinkOverlay>
        <Flex direction="column" gap="2">
          <Divider />
          <Text
            fontSize={responsiveBodyTextSm}
            fontWeight="medium"
            noOfLines={2}
          >
            {description}
          </Text>
        </Flex>
        <Tag
          size="sm"
          mt="3"
          px="3"
          mr="2"
          borderRightRadius="full"
          borderBottomLeftRadius="full"
        >
          {categoryName}
        </Tag>
        <Tag
          size="sm"
          mt="3"
          px="3"
          mr="2"
          borderRightRadius="full"
          borderBottomLeftRadius="full"
        >
          {parentCategoryName}
        </Tag>
      </Box>
    </LinkBox>
  );
};
export default SmallLessonCard;
