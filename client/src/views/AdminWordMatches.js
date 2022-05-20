/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../contexts/Globals';
import StylesContext from '../contexts/Styles';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import LoadIndicator from '../components/LoadIndicator';

const AdminWords = () => {
  const { responsiveContainerLg, responsiveHeadingSm, responsiveHeadingLg } =
    useContext(StylesContext);
  let {
    contentIsLoading,
    sweWords,
    setSweWords,
    setEngWords,
    engWords,
    setWordMatchId,
    setId,
    setContentIsLoading,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * getWords will perform two api calls to fetch all the Swedish and English words from the backend.
     * The recieved data will be inserted to the setSweWords and setEngWords state.
     * After the data has has been recieved the  setContentIsLoading is test to false.
     *
     * @async
     * @function getWords
     */
    async function getWords() {
      try {
        let sweResponse = await axios.get(`/api/words/swe`);
        let sweData = await sweResponse.data;
        setSweWords(sweData);
        let engResponse = await axios.get(`/api/words/eng`);
        let endData = await engResponse.data;
        setEngWords(endData);
        setContentIsLoading(false);
      } catch (err) {
        console.log(err.sweResponse);
        console.log(err.engResponse);
      }
    }
    // // for testing purposes only
    // console.log('getWords (from AdminWordMatches) ran');
    getWords();
  }, []);

  return (
    <Flex direction="column" align="center" m="2" p="2">
      <Flex direction="column" maxWidth="fit-content" textAlign="left" p="4">
        <Heading
          as="h2"
          fontSize={responsiveHeadingLg}
          py="2"
          pl="5"
          mt="4"
          mb="3"
        >
          All currently available words:
        </Heading>
        <Flex justify="center" mb="3">
          <Button onClick={() => navigate('/admin/words/add')}>
            Create New Words
          </Button>
        </Flex>
        {contentIsLoading === true && <LoadIndicator />}
        {contentIsLoading === false && (
          <Flex direction="row" align="center" justify="space-evenly">
            <Flex
              direction="column"
              align="center"
              borderWidth="1px"
              borderRadius="lg"
              maxWidth={responsiveContainerLg}
              p="4"
              overflow="hidden"
              shadow="md"
            >
              <Heading fontSize={responsiveHeadingSm}>English words:</Heading>
              <Box width="min-content" direction="column">
                {/* Map through all the English words and make a button for each with a link to the edit view */}
                {engWords.map(engWord => (
                  <Button
                    key={engWord.id}
                    w="100%"
                    variant="ghost"
                    m="1"
                    onClick={() => {
                      setId(engWord.id);
                      setWordMatchId(engWord.id);
                      navigate(`/admin/words/edit/${engWord.id}`);
                    }}
                  >
                    {engWord.eng_word}
                  </Button>
                ))}
              </Box>
            </Flex>
            <Flex
              direction="column"
              align="center"
              borderWidth="1px"
              borderRadius="lg"
              maxWidth={responsiveContainerLg}
              p="4"
              overflow="hidden"
              shadow="md"
              textAlign="left"
            >
              <Heading fontSize={responsiveHeadingSm}>Swedish words:</Heading>
              <Box width="min-content">
                {/* Map through all the Swedish words and make a button for each with a link to the edit view */}
                {sweWords.map(sweWord => (
                  <Button
                    key={sweWord.id}
                    onClick={() => {
                      setId(sweWord.id);
                      setWordMatchId(sweWord.id);
                      navigate(`/admin/words/edit/${sweWord.id}`);
                    }}
                    w="100%"
                    variant="ghost"
                    m="1"
                  >
                    {sweWord.swe_word}
                  </Button>
                ))}
              </Box>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default AdminWords;
