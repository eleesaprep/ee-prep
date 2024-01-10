import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProgressBar from './progressBar';
import LinearProgress from './linearProgress';
import images from '../../utils/images';
import projects from '../../utils/projects';
import LoadingBar from './loadingBar';
import Footer from '../footer';
import { getUserById } from '../../redux/studentSlice';

export default function HomePage() {
  const { user } = useSelector((store) => store.user);
  const { student, loading } = useSelector((store) => store.student);
  const [percentMark, setPercentMark] = useState(0);
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  useEffect(() => {
    if (loading === false && student.progresses) {
      const totalMarks = student.progresses.length * 100;
      let totalScored = 0;
      student.progresses.forEach((progress) => {
        totalScored += parseInt(progress.total_marks_obtained, 10);
      });
      if (totalMarks !== 0) {
        const newPercentMark = (totalScored * 100) / totalMarks;
        setPercentMark(newPercentMark);
      }
    }
  }, [student]);

  if (student.length === 0) {
    return (
      <LoadingBar />
    );
  }

  return (
    <>
      <div className="main-page">
        <div className="col-2">
          <img className="shape-ellipse" src={images.ellipse} alt="shape-1" />
          <img className="shape-rectangle" src={images.rectangle} alt="shape-2" />
          <img className="shape-ship" src={images.ship} alt="shape-3" />
          <img className="shape-ellipse1" src={images.ellipse1} alt="shape-4" />
          <img className="shape-ellipse2" src={images.ellipse2} alt="shape-5" />
          <h1>
            Hello { user.full_name},
            <br />
            Welcome 👋
          </h1>
          <p className="progress-text black-txt">Let&apos;s improve your progress!</p>
          <div className="progress-bar">
            <ProgressBar percentage={percentMark} />
          </div>
          <div className="progresses">
            { student.progresses.map((progress) => (
              <div key={progress.id} className={isDarkMode ? 'linear-progresses blue-bg' : 'linear-progresses white-bg'}>
                <div className="sub-progress">
                  <p className="progress-name">
                    {progress.course_code}
                    (
                    {progress.exam_title}
                    )
                  </p>
                  <p className="grade">{progress.grade}</p>
                </div>
                <div className="phone-progress"><LinearProgress percentage={progress.total_marks_obtained} /></div>
                <div className="desktop-progress"><ProgressBar smaller percentage={parseInt(progress.total_marks_obtained, 10)} /></div>
              </div>
            ))}
          </div>
          <div className="announcement-container">
            <h2 className="general-announcement">General Announcement📢</h2>
            <p className="announcement-title">❗ Students Notice 🔔</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo blanditiis alias,
              assumenda velit ad eos fugiat provident, eaque, delectus consequatur magnam
              tempore! Aut quaerat debitis quibusdam maiores alias tempore vel rerum? Iste
              non atque tenetur, assumenda, quam maxime sunt labore sequi at deserunt commodi
              facilis, optio laborum libero perferendis unde.
            </p>
          </div>
          <div className="projects">
            <h2 className={isDarkMode ? 'eleesa-projects white-txt' : 'eleesa-projects black-txt'}>ELEESA PROJECTS📽</h2>
            <div className="projects-container">
              {
              projects.map((project) => (
                <div key={project.title} className="project-container">
                  <img className="project-img" src={project.img} alt="project-pic" />
                  <div className="view-project">
                    <button type="button" className="see-project">See Project</button>
                    <div className="project-detail">
                      <p className="project-title">{project.title}</p>
                      <div>
                        {Array.from({ length: project.rating },
                          (_, index) => index + 1).map((star) => (
                            <img key={star} src={images.star} alt="rating" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
