import dev_img from "../../assets/jon.png"
import { BsGithub, BsLinkedin } from "react-icons/bs";
import "./aboutDev.css"

function AboutDev({ setShowModal }) {


  return (
      <div className="about-wrap-1" onClick={(e) => e.stopPropagation()}>
        <img src={dev_img} className="about-1-img" alt="" />
            <div className="developer-links">
              <a
                href="https://github.com/jang55"
                target="_blank"
                rel="noreferrer"
                className="github"
              >
                <BsGithub /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jonathan-ang-b1508b286/"
                target="_blank"
                rel="noreferrer"
                className="linkedin"
              >
                <BsLinkedin />
                LinkedIn
              </a>
            </div>
            <p className="about-me-close-button" onClick={() => setShowModal(false)}>Close</p>
      </div>
  );
}

export default AboutDev;
