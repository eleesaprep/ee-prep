import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from '../../redux/courseSlice';
import Alert from "../../utils/alert";
import LoadingBar from "../homepage/loadingBar";
import { createQuestion } from "../../redux/questionSlice";
import { createOption } from "../../redux/optionSlice";

export default function AddQuestion() {
  const dispatch = useDispatch();
  const { courses } = useSelector((store) => store.courses);
  const { error, loading, recentQuestion } = useSelector((store) => store.questions);
  const { optionCreated, optionLoading } = useSelector((store) => store.options);
  const [questionData, setQuestionData] = useState({
    question: {
      question_type: '',
      question_text: '',
      time: '',
      correct_answer: '',
      quiz_id: ''
    }
  });
  const [option1, setOption1] = useState(
    {
      option: {
        option_text: '',
        question_id: ''
      }
    });
  const [option2, setOption2] = useState(
    {
      option: {
        option_text: '',
        question_id: ''
      }
    });
  const [option3, setOption3] = useState(
    {
      option: {
        option_text: '',
        question_id: ''
      }
    });
  const [option4, setOption4] = useState(
    {
      option: {
        option_text: '',
        question_id: ''
      }
    });
  const [option5, setOption5] = useState(
    {
      option: {
        option_text: '',
        question_id: ''
      }
    });
  const [courseId, setCourseId] = useState('');

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmptyField = Object.values(questionData.question).some(value => value === '');

    if (hasEmptyField) {
      alert("Please fill in all required fields");
      return;
    }
    dispatch(createQuestion({courseId, quizId: questionData.question.quiz_id, questionData }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name !== 'quiz_id') {
    setQuestionData((prevData) => ({
      question: {
        ...prevData.question,
        [name]: value,
      }
    }));
    }
    else {
      const [value1, value2] = value.split('|');
      setCourseId(value2);
      setQuestionData((prevData) => ({
        question: {
          ...prevData.question,
          [name]: value1
        }
      }));
    }
  };

  const handleOptionSubmit = (e) => {
    e.preventDefault();
    console.log(courseId, questionData.question.quiz_id);
    dispatch(createOption({courseId, quizId: questionData.question.quiz_id, questionId: recentQuestion.id, optionData: option1 }));
    dispatch(createOption({courseId, quizId: questionData.question.quiz_id, questionId: recentQuestion.id, optionData: option2 }));
    dispatch(createOption({courseId, quizId: questionData.question.quiz_id, questionId: recentQuestion.id, optionData: option3 }));
    dispatch(createOption({courseId, quizId: questionData.question.quiz_id, questionId: recentQuestion.id, optionData: option4 }));
    dispatch(createOption({courseId, quizId: questionData.question.quiz_id, questionId: recentQuestion.id, optionData: option5 }));
  }

  const handleOptionInputChange = (e) => {
    const { name, value, id } = e.target;
    if(id === 'option1') {
      setOption1((prevData) => ({
        option: {
          ...prevData.option,
          [name]:value,
          question_id: recentQuestion.id
        }
      }))
    }
    else if(id === 'option2') {
      setOption2((prevData) => ({
        option: {
          ...prevData.option,
          [name]:value,
          question_id: recentQuestion.id
        }
      }))
    }
    else if(id === 'option3') {
      setOption3((prevData) => ({
        option: {
          ...prevData.option,
          [name]:value,
          question_id: recentQuestion.id
        }
      }))
    }
    else if(id === 'option4') {
      setOption4((prevData) => ({
        option: {
          ...prevData.option,
          [name]:value,
          question_id: recentQuestion.id
        }
      }))
    }
    else {
      setOption5((prevData) => ({
        option: {
          ...prevData.option,
          [name]:value,
          question_id: recentQuestion.id
        }
      }))
    }
  }

  if(error === false && optionCreated === false) {
    return(
      <>
      {optionLoading && <div className="add-quiz-loadingbar"><LoadingBar /></div>}
      <h2>Options</h2>
      <form className="add-question-form" onSubmit={handleOptionSubmit}>
        <div className="add-quiz-input">
          <label>Option 1</label>
          <br />
          <input name="option_text" id="option1" onChange={handleOptionInputChange} type="text" required className="input" />
        </div>
        <div className="add-quiz-input">
          <label>Option 2</label>
          <br />
          <input name="option_text" id="option2" onChange={handleOptionInputChange} type="text" required className="input" />
        </div>
        <div className="add-quiz-input">
          <label>Option 3</label>
          <br />
          <input name="option_text" id="option3" onChange={handleOptionInputChange} type="text" required className="input" />
        </div>
        <div className="add-quiz-input">
          <label>Option 4</label>
          <br />
          <input name="option_text" id="option4" onChange={handleOptionInputChange} type="text" required className="input" />
        </div>
        <div className="add-quiz-input">
          <label>Option 5</label>
          <br />
          <input name="option_text" id="option5" onChange={handleOptionInputChange} type="text" required className="input" />
        </div>
        <input type="submit" className="submit" value="Create Options" />
      </form>
      </>

    );
  }

  return(
    <>
    {loading && <div className="add-quiz-loadingbar"><LoadingBar /></div>}
    {error !== null && error !== false && <Alert message="failed to create quiz😞" title="Failed" />}
    {error === false && <Alert message="Question created successfully 🎉" title="Success" />}
    <form className="add-question-form" onSubmit={handleSubmit}>
        <div className="form-break">
        <div className="add-quiz-input">
          <label>Question Type</label>
          <br />
          <select name="question_type" onChange={handleInputChange} type="text" required className="select">
            <option>Select...</option>
            <option value="image">Image</option>
            <option value="text">Text</option>
          </select>
        </div>

        <div className="add-quiz-input">
          <label>Question</label>
          <br />
          <input name="question_text" onChange={handleInputChange} type="text" required className="input" />
        </div>
        </div>
        <div className="form-break">
        <div className="add-quiz-input">
          <label>Time</label>
          <br />
          <select name="time" onChange={handleInputChange} type="number" required className="select">
            <option>Select...</option>
            <option value={90000}>90 seconds</option>
            <option value={30000}>30 seconds</option>
          </select>
        </div>
        <div className="add-quiz-input">
          <label>Correct Answer</label>
          <br />
          <input name="correct_answer" onChange={handleInputChange} type="text" required className="input" />
        </div>
        </div>

        <div className="add-quiz-input">
          <label>Quiz</label>
          <br />
          <select name="quiz_id" onChange={handleInputChange} type="text" required className="select">
            <option>Select...</option>
            {courses.map((course) => (
              course.quizzes.length > 0 && course.quizzes.map((quiz) => (
                <option key={quiz.id} value={`${quiz.id}|${course.id}`}>${course.course_name}({quiz.exam_title})</option>
              ))
            ))}
          </select>
        </div>

        <input type="submit" className="submit" value="Create Question" />
      </form>
      </>
  );
}