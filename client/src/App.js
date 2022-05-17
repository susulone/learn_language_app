import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalContext from './contexts/Globals';
// import { StylesProvider } from './contexts/Styles';
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
import Admin from './pages/Admin';
import AddLessons from './components/admin/AddLessons';
import AddWords from './components/admin/AddWords';
import AddWordMatches from './components/admin/AddWordMatches';

function App() {
  const { userRole } = useContext(GlobalContext);
  return (
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
          {userRole === 'teacher' && (
            <Route path="/add" element={<Admin />}>
              <Route path="lessons" element={<AddLessons />} />
              <Route path="words" element={<AddWords />} />
              <Route path="matches" element={<AddWordMatches />} />
            </Route>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
