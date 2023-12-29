import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getEnrollments } from '../redux/enrollmentSlice';
import images from '../utils/images';
import { getQuizzes } from '../redux/quizSlice';
import LoadingBar from './homepage/loadingBar';
import { getQuestions } from '../redux/questionSlice';
import Footer from './footer';

export default function QuizPage() {
  const dispatch = useDispatch();
  const { enrollments, loading } = useSelector((store) => store.enrollments);
  const [quizExist, setQuizExist] = useState(false);
  const { quizzes, quiz_loading } = useSelector((store) => store.quizzes);
  const [courseId, setCourseId] = useState(null);
  const [courseCode, setCourseCode] = useState(null);
  const navigate = useNavigate();
  const { questions } = useSelector((store) => store.questions);

  useEffect(() => {
    dispatch(getEnrollments());
  }, [dispatch]);

  const handleTakeQuiz = (courseId, courseCode) => {
    dispatch(getQuizzes(courseId));
    setQuizExist(true);
    setCourseId(courseId);
    setCourseCode(courseCode);
  };

  const handleCloseClicked = () => {
    setQuizExist(false);
  };

  return (
    <>
      {quizExist && (
        <div className="dialog">
          <div className="quiz-wrap">
            <img onClick={() => handleCloseClicked()} className="close-alert" src={images.closeAlert} alt="close-dialog" />
            {!quiz_loading ? quizzes.map((quiz) => (
              <Link
                to="/home/questions"
                state={{
                  courseId, courseCode, examTitle: quiz.exam_title, quizId: quiz.id,
                }}
              >
                <div className="quiz-detail" key={quiz.id}>
                  <p>{quiz.exam_title}</p>
                  <div className="duration">
                    <img className="clock" src={images.clock} alt="clock" />
                    <p>
                      :
                      {quiz.duration}
                      mins
                    </p>
                  </div>
                  <img src={images.next} alt="enter-quiz" />
                </div>
              </Link>
            )) : <div className="quiz-loading"><LoadingBar /></div>}
          </div>
        </div>
      )}
      <div className="quiz-text">
        <h1>Quizzes</h1>
        <p>Take quizzes to get you prepared for your final examination</p>
        <p>❗ You can only take quizzes on enrolled courses</p>
      </div>
      <div>
        <p className="enrolled-title">Enrolled Courses</p>
        <div className="enrolled-container">
          {!loading
            ? enrollments.map((enrollment) => (
              <div key={enrollment.course.course_code} className="course">
                <div className="course-wrap">
                  <p className="course-code">{enrollment.course.course_code}</p>
                  <p className="course-name">{enrollment.course.course_name}</p>
                  <div className="take-quiz" onClick={() => handleTakeQuiz(enrollment.course.id, enrollment.course.course_code)}>
                    <p>Take Quiz</p>
                    <img src={images.next} alt="quiz" />
                  </div>
                </div>
              </div>
            )) : <div className="quiz-loading"><LoadingBar /></div>}
        </div>
      </div>
      <Footer />
    </>
  );
}
