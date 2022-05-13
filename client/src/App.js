import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/Globals';
import { StylesProvider } from './context/Styles';
import { Container } from '@chakra-ui/react';
import NavBar from './components/navigation/NavBar';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Search from './pages/Search';

function App() {
  return (
    <GlobalProvider>
      <StylesProvider>
        <BrowserRouter>
          <Container minH="100 vh" maxW="100vw">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lessons" element={<Lessons />} />
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
