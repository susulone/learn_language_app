import React, { useContext } from 'react';
import StylesContext from '../contexts/Styles';
import {
  Box,
  Flex,
  Stack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Divider,
} from '@chakra-ui/react';

const LoadIndicator = () => {
  const { responsiveContainerSm } = useContext(StylesContext);

  return (
    <Stack
      width={responsiveContainerSm}
      height="300px"
      align="center"
      justify="center"
      pt="4"
    >
      <Box
        width={responsiveContainerSm}
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
          <Stack width="75%">
            <Skeleton height="20px" />
            <Stack width="80%">
              <Skeleton height="20px" />
            </Stack>
          </Stack>
          <SkeletonCircle size="10" />
        </Flex>
        <Flex direction="column" gap="5">
          <Divider />
          <SkeletonText noOfLines={5} spacing="4" />
          <Stack direction="row" mt="4">
            <Stack width="20%">
              <Skeleton height="20px" />
            </Stack>
            <Stack width="20%">
              <Skeleton height="20px" />
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </Stack>
  );
};

export default LoadIndicator;
