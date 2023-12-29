import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import materialReducer from './materialSlice';
import progressReducer from './progressSlice';
import courseReducer from './courseSlice';
import quizReudcer from './quizSlice';
import questionReducer from './questionSlice';
import optionReducer from './optionSlice';
import instructorReducer from './instructorSlice';
import studentReducer from './studentSlice';
import enrollmentReducer from './enrollmentSlice';
import resultsReducer from './resultsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    progresses: progressReducer,
    courses: courseReducer,
    materials: materialReducer,
    quizzes: quizReudcer,
    questions: questionReducer,
    options: optionReducer,
    instructors: instructorReducer,
    student: studentReducer,
    enrollments: enrollmentReducer,
    results: resultsReducer,
  },
});

export default store;
