import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './contexts/Globals';
import { StylesProvider } from './contexts/Styles';
import { Container } from '@chakra-ui/react';
import NavBar from './components/navigation/NavBar';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import LessonsLatest from './views/LessonsLatest';
import LessonPage from './views/LessonPage';
import Search from './pages/Search';
import QuizView from './views/QuizView';

function App() {
  return (
    <GlobalProvider>
      <StylesProvider>
        <BrowserRouter>
          <Container minH="100 vh" maxW="100vw" align="center">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lessons" element={<Lessons />}>
                <Route path="latest" element={<LessonsLatest />} />
                <Route path=":lessonId" element={<LessonPage />} />
                <Route path="quiz" element={<QuizView />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </StylesProvider>
    </GlobalProvider>
  );
}

export default App;
