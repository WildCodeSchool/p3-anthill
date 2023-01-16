import { createRef, useRef, useState } from "react";
import CardMember from "./CardMember";
import "./AboutUs.css";

function AboutUs() {
  const aboutUs = [
    {
      id: 1,
      name: "Audrey Jacquemin",
      mood: "Scrum Master",
      photo: "./ContactPhotos/Audrey.png",
      gitHub: "https://github.com/Audja",
      mail: "audjacontact@gmail.com",
      linkedIn: "https://www.linkedin.com/in/audrey-jacquemin-a72147248/",
    },
    {
      id: 2,
      name: "Cyril Leclercq",
      mood: "Developer",
      photo: "./ContactPhotos/Cyril.png",
      gitHub: "https://github.com/Cylecq",
      mail: "leclercq.cyril06@gmail.com",
      linkedIn: "https://www.linkedin.com/in/Cylecq/",
    },
    {
      id: 3,
      name: "Gwenaël Léger",
      mood: "Teacher",
      photo: "./ContactPhotos/Gwenael.png",
      gitHub: "https://github.com/LegerG",
      mail: "gwenael.leger@wildcodeschool.com",
      linkedIn: "https://www.linkedin.com/in/gwena%C3%ABl-l%C3%A9ger/",
    },
    {
      id: 4,
      name: "Herschel Tuil",
      mood: "Product Manager",
      photo: "./ContactPhotos/Herschel.jpeg",
      gitHub: "https://github.com/ht18",
      mail: "herschel.tuil@gmail.com",
      linkedIn: "https://www.linkedin.com/in/ht18/",
    },
    {
      id: 5,
      name: "DinhHuy Trinh",
      mood: "Developer",
      photo: "./ContactPhotos/Huy.png",
      gitHub: "https://github.com/LaserHuy",
      mail: "laser2u02@gmail.com",
      linkedIn: "https://www.linkedin.com/in/huytrinhlaser/",
    },
    {
      id: 6,
      name: "Johanna Stoïcanescu",
      mood: "Product Owner",
      photo: "./ContactPhotos/Johanna.jfif",
      gitHub: "https://github.com/JohannaStoicanescu",
      mail: "johanna.stoicanescu@gmail.com",
      linkedIn: "https://www.linkedin.com/in/johanna-stoicanescu-752801252/",
    },
    {
      id: 7,
      name: "Quentin Feuvrais",
      mood: "Super Developer",
      photo: "./ContactPhotos/Quentin.jpg",
      gitHub: "https://github.com/Angeloox",
      mail: "feuvrais.quentin@gmail.com",
      linkedIn: "https://www.linkedin.com/in/quentin-feuvrais/",
    },
    {
      id: 8,
      name: "Tidus",
      mood: "The Inspiration",
      photo: "./ContactPhotos/Tidus.jpeg",
      mail: "tidus@gmail.com",
    },
  ];
  const [activeUser, setActiveUser] = useState("Johanna Stoïcanescu");

  const refs = useRef([
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ]);

  const handleActive = (e) => {
    const user = aboutUs.find((ele) => ele.name === e.target.alt);
    const idActive = user.id - 1;
    const userInActive = aboutUs.filter((ele) => ele.id !== user.id);
    userInActive.forEach((ele) => {
      refs.current[ele.id - 1].current.className = "imgBx";
    });
    refs.current[idActive].current.className = "imgBx active";
    setActiveUser(e.target.alt);
  };
  return (
    <div className="aboutUs">
      <div className="aboutUs-icon">
        {aboutUs.map((ele) => (
          <button
            type="button"
            ref={refs.current[ele.id - 1]}
            key={ele.id}
            className="imgBx"
            style={{ "--i": ele.id }}
            onClick={(e) => handleActive(e)}
          >
            <img src={ele.photo} alt={ele.name} />
          </button>
        ))}
      </div>
      <div className="content">
        {aboutUs.map((ele) =>
          ele.name === activeUser ? (
            <CardMember
              key={ele.id}
              name={ele.name}
              photo={ele.photo}
              mood={ele.mood}
              mail={ele.mail}
              linkedIn={ele.linkedIn}
              gitHub={ele.gitHub}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default AboutUs;
