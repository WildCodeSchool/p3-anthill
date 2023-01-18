import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiOutlineLinkedin } from "react-icons/ai";
import { FiMail, FiGithub } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";

function CardMember({ photo, name, mood, linkedIn, mail, gitHub }) {
  const handleCopy = () => {
    toast.success("🦄 Copied to Clipboard!", {
      position: "bottom-center",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="contentBx">
      <div className="card">
        <div className="imgBx">
          <img src={photo} alt={name} />
        </div>
        <div className="textBx">
          <h2>{name}</h2>
          <h3>{mood}</h3>
          <ul className="sci">
            {linkedIn ? (
              <li>
                <a href={linkedIn}>
                  <AiOutlineLinkedin />
                </a>
              </li>
            ) : null}
            {gitHub ? (
              <li>
                <a href={gitHub}>
                  <FiGithub />
                </a>
              </li>
            ) : null}
            {mail ? (
              <li>
                <CopyToClipboard text={mail}>
                  <button type="button" onClick={handleCopy}>
                    <FiMail />
                  </button>
                </CopyToClipboard>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardMember;
