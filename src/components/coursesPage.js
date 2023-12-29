import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import images from '../utils/images';
import { createEnrollment, deleteEnrollment, getEnrollments } from '../redux/enrollmentSlice';
import { getUserFromLocalStorage } from '../utils/localStorageForUser';
import Alert from '../utils/alert';
import { getCourses } from '../redux/courseSlice';
import LoadingBar from './homepage/loadingBar';
import Footer from './footer';

export default function CoursesPage() {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((store) => store.courses);
  const { enrollments, error } = useSelector((store) => store.enrollments);
  const years = [1, 2, 3, 4];
  const sems = [1, 2];
  const containerRef = useRef(null);
  const user = getUserFromLocalStorage();

  const handleNext = (percentage) => {
    const container = containerRef.current;
    if (container) {
      const scrollValue = (container.clientWidth * percentage) / 100;
      container.scrollBy({
        left: scrollValue,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getEnrollments());
  }, [dispatch]);

  const unenrollClicked = (id) => {
    dispatch(deleteEnrollment(id));
  };

  const handleEnrollment = (userId, courseId) => {
    const newDate = new Date();
    const currentDate = newDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const enrollmentData = {
      enrollment: {
        enrollment_date: currentDate,
        user_id: userId,
        course_id: courseId,
      },
    };
    dispatch(createEnrollment(enrollmentData));
  };

  return (
    <>
      <div className="courses-page">
        {error !== null && error !== false && <Alert message={error} title="Failed" />}
        {error === false && <Alert message="Enrollment created successfully 🎉" title="Success" />}
        <h1 className="course-activity">Course Activity</h1>
        <p>Get access to course materials or enroll in any of the courses</p>
        <div className="course-scroll">
          <p>Courses</p>
          <div className="next-courses">
            <div
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space') {
                  handleNext(-100);
                }
              }}
              role="button"
              tabIndex={0}
              onClick={() => handleNext(-100)}
            >
              <img src={images.prev} alt="prev_courses" />
            </div>
            <div
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space') {
                  handleNext(100);
                }
              }}
              role="button"
              tabIndex={0}
              onClick={() => handleNext(100)}
            >
              <img src={images.next} alt="next_courses" />
            </div>
          </div>
        </div>
        <div ref={containerRef} className="courses-container">
          {
        years.map((year) => (
          <div key={year} className="year-courses">
            <p className="year">
              Year
              {year}
            </p>
            {
              sems.map((sem) => (
                <div className="sem-container" key={sem}>
                  <p className="sem">
                    Semester
                    {sem}
                  </p>
                  {!loading
                    ? courses.map((course) => (
                      course.year === year && course.semester === sem
                        ? (
                          <div key={course.id} className="courses">
                            <p className="course-code">{course.course_code}</p>
                            <p className="course-name">{course.course_name}</p>
                            <div
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === 'Space') {
                                  handleNext(100);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                              onClick={() => handleEnrollment(user.id, course.id)}
                              className="enroll"
                            >
                              <p>Enroll</p>
                              <img src={images.next} alt="enroll" />
                            </div>
                          </div>
                        ) : ''
                    )) : <div className="course-loading"><LoadingBar /></div>}
                </div>
              ))
            }
          </div>

        ))
      }

        </div>
        <div>
          <p className="enrolled-title">Enrolled Courses</p>
          <div className="enrolled-container">
            {
          enrollments.map((enrollment) => (
            <div key={enrollment.course.course_code} className="course">
              <div className="courses">
                <p className="course-code">{enrollment.course.course_code}</p>
                <p className="course-name">{enrollment.course.course_name}</p>
                <div
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Space') {
                      handleNext(100);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="unenroll"
                  onClick={() => unenrollClicked(enrollment.id)}
                >
                  <p>Unenroll</p>
                  <img src={images.prev} alt="unenroll" />
                </div>
              </div>
            </div>
          ))
        }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
