import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalContext from './contexts/Globals';
import { Container } from '@chakra-ui/react';
import NavBar from './components/navigation/NavBar';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Lessons from './pages/Lessons';
import LessonsLatest from './views/LessonsLatest';
import LessonPage from './views/LessonPage';
import Search from './pages/Search';
import QuizView from './views/QuizView';
import Admin from './pages/Admin';
import AddLessons from './components/admin/AddLessons';
import AddWords from './components/admin/AddWords';
import AdminLessons from './views/AdminLessons';
import EditLesson from './components/admin/EditLesson';
import AdminWordMatches from './views/AdminWordMatches';
import EditWords from './components/admin/EditWords';

function App() {
  const { userRole } = useContext(GlobalContext);
  return (
    <BrowserRouter>
      <Container minH="100vh" maxW="100vw" align="center">
        <NavBar />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/lessons" element={<Lessons />}>
            <Route path="latest" element={<LessonsLatest />} />
            <Route path=":lessonId" element={<LessonPage />} />
            <Route path="quiz" element={<QuizView />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          {userRole === 'teacher' && (
            <Route path="/admin" element={<Admin />}>
              <Route path="lessons" element={<AdminLessons />} />
              <Route path="lessons/add" element={<AddLessons />} />
              <Route path="lessons/edit/:editId" element={<EditLesson />} />
              <Route path="words" element={<AdminWordMatches />} />
              <Route path="words/add" element={<AddWords />} />
              <Route path="words/edit/:matchId" element={<EditWords />} />
            </Route>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
