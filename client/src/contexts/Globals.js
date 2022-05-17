import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import axios from 'axios';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  let [contentIsLoading, setContentIsLoading] = useState(true);
  let [categoryImage, setCategoryImage] = useState('lessons');

  let [userRole, setUserRole] = useState('student');

  let [lessons, setLessons] = useState([]);
  let [lesson, setLesson] = useState([]);
  useEffect(() => {
    async function getLessons() {
      let response = await axios.get('/api/lessons/with-category-name/');
      let data = await response.data;
      setLessons(data);
      setContentIsLoading(false);
      console.log('testing loop');
    }
    getLessons();
  }, [lesson]);

  let [lessonId, setLessonId] = useState(1);

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
  useEffect(() => {
    async function getAllSweWords() {
      try {
        let response = await axios.get(`/api/swe`);
        let data = await response.data;
        setSweWords(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getAllSweWords();
  }, []);
  const [sweWord, setSweWord] = useState('');

  let [engWords, setEngWords] = useState([]);
  useEffect(() => {
    async function getAllEngWords() {
      try {
        let response = await axios.get(`/api/eng`);
        let data = await response.data;
        setEngWords(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getAllEngWords();
  }, []);
  const [engWord, setEngWord] = useState('');

  let [wordMatches, setWordMatches] = useState([]);
  useEffect(() => {
    async function getAllWordMatches() {
      try {
        let response = await axios.get(`/api/pairs/`);
        let data = await response.data;
        setWordMatches(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getAllWordMatches();
  }, []);

  let [wordPairs, setWordPairs] = useState([]);
  useLayoutEffect(() => {
    async function getWordPairsByLessonId() {
      try {
        let response = await axios.get(`/api/pairs/from-lesson/${lessonId}`);
        if (response && response.data) {
          let data = await response.data;
          setWordPairs(data);
          setMaxScore(data.length);
          setAvailability(true);
        }
      } catch (err) {
        if (err.response.data === false) {
          setAvailability(false);
        }
      }
    }
    getWordPairsByLessonId();
  }, [lessonId]);

  let [lang1WordId, setLang1WordId] = useState(null);
  let [lang2WordId, setLang2WordId] = useState(null);
  let [lesson_id, setLesson_id] = useState(null);

  let [availability, setAvailability] = useState(null);
  let [quizState, setQuizState] = useState('menu');
  let [quizLanguage, setQuizLanguage] = useState('');
  let [maxScore, setMaxScore] = useState(0);
  let [score, setScore] = useState(0);
  let usersAnswers = [];

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
        wordPairs,
        setWordPairs,
        availability,
        setAvailability,
        quizState,
        setQuizState,
        maxScore,
        setMaxScore,
        score,
        setScore,
        quizLanguage,
        setQuizLanguage,
        usersAnswers,
        languages,
        setLanguages,
        languageId,
        setLanguageId,
        language,
        setLanguage,
        sweWords,
        setSweWords,
        sweWord,
        setSweWord,
        engWords,
        setEngWords,
        engWord,
        setEngWord,
        lang1WordId,
        setLang1WordId,
        lang2WordId,
        setLang2WordId,
        lesson_id,
        setLesson_id,
        wordMatches,
        setWordMatches,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
