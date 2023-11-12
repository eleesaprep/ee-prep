import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../redux/courseSlice";

export default function CoursesPage() {
  const dispatch = useDispatch();
  const { courses } = useSelector((store) => store.courses);
  
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  console.log(courses);

  return(
    <>
    <p>Get access to course materials or enroll in any of the courses</p>
    <h2>YEAR 1</h2>
    <h3>Semester I</h3>

    </>
  );
}