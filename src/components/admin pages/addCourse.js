import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse, getCourses } from '../../redux/courseSlice';
import Alert from "../../utils/alert";
import LoadingBar from "../homepage/loadingBar";

export default function AddCourse() {
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({
    course: {
      course_code: '',
      course_name: '',
      semester: '',
      year: ''
    }
  });

  const { loading, error } = useSelector((store) => store.courses);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmptyField = Object.values(courseData.course).some(value => value === '');

    if (hasEmptyField) {
      alert("Please fill in all required fields");
      return;
    }
    dispatch(createCourse(courseData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      course: {
        ...prevData.course,
        [name]: value,
      }
    }));
  };

  return(
    <>
    {loading && <div className="add-quiz-loadingbar"><LoadingBar /></div>}
    {error !== null && error !== false && <Alert message="failed to create course😞" title="Failed" />}
    {error === false && <Alert message="Course created successfully 🎉" title="Success" />}
    <form className="add-course-form" onSubmit={handleSubmit}>
        <div className="form-break">
        <div className="add-quiz-input">
          <label>Course Name</label>
          <br />
          <input name="course_name" onChange={handleInputChange} type="text" required className="input" />
        </div>
        <div className="add-quiz-input">
          <label>Course Code</label>
          <br />
          <input name="course_code" onChange={handleInputChange} type="text" required className="input" />
        </div>
        </div>
        <div className="form-break">
        <div className="add-quiz-input">
          <label>Level</label>
          <br />
          <select name="year" onChange={handleInputChange} type="text" required className="select">
            <option>Select...</option>
            <option value={1}>Level 100 </option>
            <option value={2}>Level 200</option>
            <option value={3}>Level 300</option>
            <option value={4}>Level 400</option>
          </select>
        </div>

        <div className="add-quiz-input">
          <label>Semester</label>
          <br />
          <select name="semester" onChange={handleInputChange} type="text" required className="select">
            <option>Select...</option>
            <option value={1}>Sem 1</option>
            <option value={2}>Sem 2</option>
          </select>
        </div>
        </div>



        <input type="submit" className="submit" value="Create Course" />
      </form>
      </>
  );
}