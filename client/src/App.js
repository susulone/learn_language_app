import React from 'react';
import { GlobalProvider } from './context/Globals';
import { StylesProvider } from './context/Styles';
import { Box, Text, VStack, Code, Grid } from '@chakra-ui/react';

function App() {
  return (
    <GlobalProvider>
      <StylesProvider>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
              <Text>
                Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
              </Text>
            </VStack>
          </Grid>
        </Box>
      </StylesProvider>
    </GlobalProvider>
  );
}

export default App;
