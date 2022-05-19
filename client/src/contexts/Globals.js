import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  let [contentIsLoading, setContentIsLoading] = useState(true);
  let [categoryImage, setCategoryImage] = useState('lessons');

  let [userRole, setUserRole] = useState('student');

  let [lessons, setLessons] = useState([]);
  let [lesson, setLesson] = useState([]);
  let [lessonId, setLessonId] = useState(1);

  // this function runs right at the beginning, does this have a better place to be?
  useEffect(() => {
    async function getLessonById() {
      try {
        let response = await axios.get(`/api/lessons/${lessonId}`);
        let data = await response.data;
        setLesson(data);
        console.log('getLessonById ran');
      } catch (err) {
        console.log(err.response);
      }
    }
    getLessonById();
  }, [lessonId]);

  useEffect(() => {
    async function getLessons() {
      try {
        let response = await axios.get('/api/lessons/with-category-name/');
        let data = await response.data;
        setLessons(data);
        setContentIsLoading(false);
        console.log('getLessons ran');
      } catch (err) {
        console.log(err.response);
      }
    }
    getLessons();
  }, [lesson]);

  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [category_id, setCategory_id] = useState(null);

  let [editTitle, setEditTitle] = useState('');
  let [editDescription, setEditDescription] = useState('');
  let [editCategory_id, setEditCategory_id] = useState(null);

  let [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      try {
        let response = await axios.get('/api/categories/');
        let data = await response.data;
        setCategories(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getCategories();
  }, []);

  let [categoryId, setCategoryId] = useState(1);

  let [category, setCategory] = useState([]);
  useEffect(() => {
    async function getCategoryById() {
      try {
        let response = await axios.get(
          `/api/categories/with-parents/${categoryId}`
        );
        let data = await response.data;
        setCategory(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getCategoryById();
  }, [categoryId]);

  let [sweWords, setSweWords] = useState([]);
  // useEffect(() => {
  //   async function getAllSweWords() {
  //     try {
  //       let response = await axios.get(`/api/words/swe`);
  //       let data = await response.data;
  //       setSweWords(data);
  //     } catch (err) {
  //       console.log(err.response);
  //     }
  //   }
  //   getAllSweWords();
  // }, [allWordMatches, sweWords]);

  let [engWords, setEngWords] = useState([]);
  // useEffect(() => {
  //   async function getAllEngWords() {
  //     try {
  //       let response = await axios.get(`/api/words/eng`);
  //       let data = await response.data;
  //       setEngWords(data);
  //     } catch (err) {
  //       console.log(err.response);
  //     }
  //   }
  //   getAllEngWords();
  // }, [allWordMatches]);

  let [wordMatchId, setWordMatchId] = useState(null);

  let [wordMatch, setWordMatch] = useState('');
  let [allWordMatches, setAllWordMatches] = useState([]);
  useEffect(() => {
    async function getAllWordMatches() {
      try {
        let response = await axios.get(`/api/words/`);
        let data = await response.data;
        setAllWordMatches(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getAllWordMatches();
  }, []);

  let [matchesByLesson, setMatchesByLesson] = useState([]);
  let [availability, setAvailability] = useState(null);
  let [maxScore, setMaxScore] = useState(0);
  let [score, setScore] = useState(0);

  // useEffect(() => {
  //   async function getWordMatchesByLessonId() {
  //     try {
  //       let response = await axios.get(`/api/words/lesson${lessonId}`);
  //       if (response && response.data) {
  //         let data = await response.data;
  //         console.log('getWordMatchesByLessonId ran');
  //         setMatchesByLesson(data);
  //         setMaxScore(data.length);
  //         setAvailability(true);
  //       }
  //     } catch (err) {
  //       if (err.response.data === false) {
  //         setAvailability(false);
  //       }
  //     }
  //   }
  //   getWordMatchesByLessonId();
  // }, [lessonId]);

  let [sweByLesson, setSweByLesson] = useState([]);
  useEffect(() => {
    async function getSweWordByLessonId() {
      try {
        let response = await axios.get(`/api/words/swe/lesson${lessonId}`);
        if (response && response.data) {
          let data = await response.data;
          setSweByLesson(data);
        }
      } catch (err) {
        if (err.response.data === false) {
          setAvailability(false);
        }
      }
    }
    getSweWordByLessonId();
  }, [lessonId]);

  let [engByLesson, setEngByLesson] = useState([]);
  useEffect(() => {
    async function getEngWordByLessonId() {
      try {
        let response = await axios.get(`/api/words/eng/lesson${lessonId}`);
        if (response && response.data) {
          let data = await response.data;
          setEngByLesson(data);
        }
      } catch (err) {
        if (err.response.data === false) {
          setAvailability(false);
        }
      }
    }
    getEngWordByLessonId();
  }, [lessonId]);

  let [quizState, setQuizState] = useState('menu');
  let [quizLanguage, setQuizLanguage] = useState('');

  let [languages, setLanguages] = useState([]);
  useEffect(() => {
    async function getLanguages() {
      try {
        let response = await axios.get('/api/lang/');
        let data = await response.data;
        setLanguages(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getLanguages();
  }, []);

  let [languageId, setLanguageId] = useState(1);
  let [language, setLanguage] = useState([]);
  useEffect(() => {
    async function getLanguageById() {
      try {
        let response = await axios.get(`/api/lang/${languageId}`);
        let data = await response.data;
        setLanguage(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getLanguageById();
  }, [languageId]);

  let [id, setId] = useState(null);
  let [sweWord, setSweWord] = useState('');
  let [engWord, setEngWord] = useState('');
  let [lesson_id, setLesson_id] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        contentIsLoading,
        setContentIsLoading,
        categoryImage,
        setCategoryImage,
        userRole,
        setUserRole,
        lessons,
        setLessons,
        lessonId,
        setLessonId,
        lesson,
        setLesson,
        title,
        setTitle,
        description,
        setDescription,
        category_id,
        setCategory_id,
        editTitle,
        setEditTitle,
        editDescription,
        setEditDescription,
        editCategory_id,
        setEditCategory_id,
        categories,
        setCategories,
        categoryId,
        setCategoryId,
        category,
        setCategory,

        quizLanguage,
        setQuizLanguage,
        languages,
        setLanguages,
        languageId,
        setLanguageId,
        language,
        setLanguage,
        sweWords,
        setSweWords,
        engWords,
        setEngWords,
        wordMatchId,
        setWordMatchId,
        allWordMatches,
        setAllWordMatches,
        id,
        setId,
        sweWord,
        setSweWord,
        engWord,
        setEngWord,
        lesson_id,
        setLesson_id,
        wordMatch,
        setWordMatch,
        matchesByLesson,
        setMatchesByLesson,
        availability,
        setAvailability,
        quizState,
        setQuizState,
        maxScore,
        setMaxScore,
        score,
        setScore,
        sweByLesson,
        setSweByLesson,
        engByLesson,
        setEngByLesson,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
