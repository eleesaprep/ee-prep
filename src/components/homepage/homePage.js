import { useSelector } from "react-redux";
import ProgressBar from "./progressBar";
import LinearProgress from "./linearProgress";
import { images } from "../../utils/images";
import { projects } from "../../utils/projects";

export default function HomePage() {
  const {user} = useSelector((store) => store.user);

  return(
    <>
    <div className="main-page">
      <div className="col-2">
        <img className="shape-ellipse" src={images.ellipse} alt="shape-1" />
        <img className="shape-rectangle" src={images.rectangle} alt="shape-2" />
        <img className="shape-ship" src={images.ship} alt="shape-3" />
        <img className="shape-ellipse1" src={images.ellipse_1} alt="shape-4" />
        <img className="shape-ellipse2" src={images.ellipse_2} alt="shape-5" />
        <h1>Hello {user.full_name},<br/>Welcome 👋</h1>
        <p className="progress-text">Let's improve your progress!</p>
        <div className="progress-bar">
          <ProgressBar percentage={60}/>
        </div>
        <div>
          <div className="sub-progress">
            <p>EE 156</p>
            <p>A</p>
          </div>
          <LinearProgress percentage={70} />
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
          <h2 className="eleesa-projects">ELEESA PROJECTS📽</h2>
          <div className="projects-container">
            {
              projects.map((project) => (
                <div key={project.title} className="project-container">
                  <img className="project-img" src={project.img} alt="project-pic" />
                  <div className="view-project">
                    <button className="see-project">See Project</button>
                    <div className="project-detail">
                      <p className="project-title">{project.title}</p>
                      <div>
                        {Array.from({ length: project.rating }, (_, index) => index + 1).map((star) => (
                          <img src={images.star} alt='rating' />
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
    
    </>
  );
}