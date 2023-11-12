import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import responseReducer from './responseSlice';
import materialReducer from './materialSlice';
import progressReducer from './progressSlice';
import courseReducer from './courseSlice';
import quizReudcer from './quizSlice';
import questionReducer from './questionSlice';
import optionReducer from './optionSlice';
import instructorReducer from './instructorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    responses: responseReducer,
    progresses: progressReducer,
    courses: courseReducer,
    materials: materialReducer,
    quizzes: quizReudcer,
    questions: questionReducer,
    options: optionReducer,
    instructors: instructorReducer,
  },
});

export default store;