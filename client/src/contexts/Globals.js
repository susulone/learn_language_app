import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  let [contentIsLoading, setContentIsLoading] = useState(true);
  let [categoryImage, setCategoryImage] = useState('lessons');

  let [userRole, setUserRole] = useState('student');

  let [lessons, setLessons] = useState([]);
  useEffect(() => {
    async function getLessons() {
      let response = await axios.get('/api/lessons/');
      let data = await response.data;
      setLessons(data);
      setContentIsLoading(false);
    }
    getLessons();
  }, []);

  let [lessonId, setLessonId] = useState(1);

  let [lesson, setLesson] = useState([]);
  useEffect(() => {
    async function getLessonById() {
      let response = await axios.get(`/api/lessons/${lessonId}`);
      let data = await response.data;
      setLesson(data);
    }
    getLessonById();
  }, [lessonId]);

  let [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      let response = await axios.get('/api/categories/');
      let data = await response.data;
      setCategories(data);
    }
    getCategories();
  }, []);

  let [categoryId, setCategoryId] = useState(1);

  let [category, setCategory] = useState([]);
  useEffect(() => {
    async function getCategoryById() {
      let response = await axios.get(`/api/categories/${categoryId}`);
      let data = await response.data;
      setCategory(data);
    }
    getCategoryById();
  }, [categoryId]);

  let [wordPairs, setWordPairs] = useState([]);
  useEffect(() => {
    async function getWordPairsByLessonId() {
      let response = await axios.get(`/api/words/by-lesson-id/${lessonId}`);
      let data = await response.data;
      setWordPairs(data);
    }
    getWordPairsByLessonId();
  }, [lessonId]);

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
        categories,
        setCategories,
        categoryId,
        setCategoryId,
        category,
        setCategory,
        wordPairs,
        setWordPairs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
