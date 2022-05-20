/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */

import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  // ADMIN MODE //
  let [userRole, setUserRole] = useState('student');

  // UI //
  let [contentIsLoading, setContentIsLoading] = useState(true);
  let [categoryImage, setCategoryImage] = useState('lessons');

  // QUIZ //
  let [quizState, setQuizState] = useState('menu');
  let [quizLanguage, setQuizLanguage] = useState('');
  let [maxScore, setMaxScore] = useState(0);
  let [score, setScore] = useState(0);

  // ADD LESSON //
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [category_id, setCategory_id] = useState(null);

  // EDIT LESSON //
  // thie feature is not currently available
  // let [editTitle, setEditTitle] = useState('');
  // let [editDescription, setEditDescription] = useState('');
  // let [editCategory_id, setEditCategory_id] = useState(null);

  // WORD PRACTICES //
  let [matchesByLesson, setMatchesByLesson] = useState([]);
  let [availability, setAvailability] = useState(null);

  // ADD WORD PAIR //
  let [sweWord, setSweWord] = useState('');
  let [engWord, setEngWord] = useState('');
  let [lesson_id, setLesson_id] = useState(null);

  // EDIT WORD PAIR //
  let [id, setId] = useState(null);

  // LESSONS //
  let [lessons, setLessons] = useState([]);
  let [lessonId, setLessonId] = useState(1);
  let [lesson, setLesson] = useState([]);

  useEffect(() => {
    /**
     * getLessons will perform an api call to fetch all lesson and the category names.
     * The recieved data will be inserted to the setLessons state.
     * The loading indicator's state is set to false.
     * @async
     * @function getLessons
     */
    async function getLessons() {
      try {
        let response = await axios.get('/api/lessons/with-category-name/');
        let data = await response.data;
        setLessons(data);
        setContentIsLoading(false);
      } catch (err) {
        console.log(err.response);
      }
    }
    // for testing purposes only
    // console.log('getLessons ran');
    getLessons();
  }, [lesson]);

  useEffect(() => {
    /**
     * getLessonById will perform an api call to fetch a lesson by the given id.
     * The recieved data will be inserted to the setLesson state.
     * @async
     * @function getLessonById
     * @param {number} lessonId - the id of the lesson
     */
    async function getLessonById() {
      try {
        let response = await axios.get(`/api/lessons/${lessonId}`);
        let data = await response.data;
        setLesson(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    // for testing purposes only
    // console.log('getLessonById ran');
    getLessonById();
  }, [lessonId]);

  // WORD MATCHES //
  let [allWordMatches, setAllWordMatches] = useState([]);
  let [wordMatchId, setWordMatchId] = useState(null);
  let [wordMatch, setWordMatch] = useState('');

  useEffect(() => {
    /**
     * getAllWordMatches will perform an api call to fetch all word pairs.
     * The recieved data will be inserted to the setAllWordMatches state.
     * @async
     * @function getAllWordMatches
     */
    async function getAllWordMatches() {
      try {
        let response = await axios.get(`/api/words/`);
        let data = await response.data;
        setAllWordMatches(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    // for testing purposes only
    // console.log('getAllWordMatches ran');
    getAllWordMatches();
  });

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

  // SWEDISH WORDS //
  let [sweWords, setSweWords] = useState([]);
  let [sweByLesson, setSweByLesson] = useState([]);

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

  useEffect(() => {
    /**
     * getSweWordByLessonId will perform an api call to fetch a all
     * Swedish words by the given lesson id.
     * The recieved data will be inserted to the setSweByLesson state.
     * @async
     * @function getSweWordByLessonId
     * @param {number} lessonId - the id of the lesson
     */
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
    // for testing purposes only
    // console.log('getSweWordByLessonId ran');
    getSweWordByLessonId();
  }, [lessonId]);
  //[lessonId]

  // ENGLISH WORDS //
  let [engWords, setEngWords] = useState([]);
  let [engByLesson, setEngByLesson] = useState([]);

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

  useEffect(() => {
    /**
     * getEngWordByLessonId will perform an api call to fetch a all
     * English words by the given lesson id.
     * The recieved data will be inserted to the setEngByLesson state.
     * @async
     * @function getEngWordByLessonId
     * @param {number} lessonId - the id of the lesson
     */
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
    // for testing purposes only
    // console.log('getEngWordByLessonId ran');
    getEngWordByLessonId();
  }, [lessonId]);
  // [lessonId]

  // CATEGORIES //
  let [categories, setCategories] = useState([]);
  let [categoryId, setCategoryId] = useState(1);
  let [category, setCategory] = useState([]);

  useEffect(() => {
    /**
     * getCategories will perform an api call to fetch all categories.
     * The recieved data will be inserted to the setCategories state.
     * @async
     * @function getCategories
     */
    async function getCategories() {
      try {
        let response = await axios.get('/api/categories/');
        let data = await response.data;
        setCategories(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    // for testing purposes only
    // console.log('getCategories ran');
    getCategories();
  }, []);

  useEffect(() => {
    /**
     * getCategoryById will perform an api call to fetch a category
     * by the given id.
     * The recieved data will be inserted to the setCategory state.
     * @async
     * @function getCategoryById
     * @param {number} categoryId - the id of the category
     */
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
    // for testing purposes only
    // console.log('getCategoryById ran');
    getCategoryById();
  }, [categoryId]);

  // LANGUAGES //
  let [languages, setLanguages] = useState([]);
  let [languageId, setLanguageId] = useState(1);
  let [language, setLanguage] = useState([]);

  useEffect(() => {
    /**
     * getLanguages will perform an api call to fetch all available languages.
     * The recieved data will be inserted to the setLanguages state.
     * @async
     * @function getLanguages
     */
    async function getLanguages() {
      try {
        let response = await axios.get('/api/lang/');
        let data = await response.data;
        setLanguages(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    // for testing purposes only
    // console.log('getLanguages ran');
    getLanguages();
  }, []);

  useEffect(() => {
    /**
     * getLanguageById will perform an api call to fetch a language
     * by the given id.
     * The recieved data will be inserted to the setLanguage state.
     * @async
     * @function getLanguageById
     * @param {number} languageId - the id of the language
     */
    async function getLanguageById() {
      try {
        let response = await axios.get(`/api/lang/${languageId}`);
        let data = await response.data;
        setLanguage(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    // for testing purposes only
    // console.log('getLanguageById ran');
    getLanguageById();
  }, [languageId]);

  return (
    <GlobalContext.Provider
      value={{
        userRole,
        setUserRole,

        contentIsLoading,
        setContentIsLoading,
        categoryImage,
        setCategoryImage,

        quizState,
        setQuizState,
        quizLanguage,
        setQuizLanguage,
        maxScore,
        setMaxScore,
        score,
        setScore,

        title,
        setTitle,
        description,
        setDescription,
        category_id,
        setCategory_id,

        // editTitle,
        // setEditTitle,
        // editDescription,
        // setEditDescription,
        // editCategory_id,
        // setEditCategory_id,

        id,
        setId,

        sweWord,
        setSweWord,
        engWord,
        setEngWord,
        lesson_id,
        setLesson_id,

        matchesByLesson,
        setMatchesByLesson,
        availability,
        setAvailability,

        lessons,
        setLessons,
        lessonId,
        setLessonId,
        lesson,
        setLesson,

        allWordMatches,
        setAllWordMatches,
        wordMatchId,
        setWordMatchId,
        wordMatch,
        setWordMatch,

        sweWords,
        setSweWords,
        sweByLesson,
        setSweByLesson,

        engWords,
        setEngWords,
        engByLesson,
        setEngByLesson,

        categories,
        setCategories,
        categoryId,
        setCategoryId,
        category,
        setCategory,

        languages,
        setLanguages,
        languageId,
        setLanguageId,
        language,
        setLanguage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
