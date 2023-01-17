import { useRef } from "react";
import { GiAnt } from "react-icons/gi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

function ContactForm() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_szd9jp9",
        "template_jl52jd9",
        form.current,
        "-rui5JhDVEPNEZ_DX"
      )
      .then(
        (result) => {
          console.warn(result.text);
          console.warn("message sent");
        },
        (error) => {
          console.warn(error.text);
        }
      );
    toast.success("🐜 Your message sent successful", {
      position: "top-right",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleActive = (e) => {
    if (e.target.value) e.target.className = "active";
    else e.target.className = "inactive";
  };

  return (
    <div className="us-container">
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name=""
                required="required"
                onChange={handleActive}
              />
              <span className="text">First Name</span>
              <span className="line" />
            </div>
          </div>
          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name="user_name"
                required="required"
                onChange={handleActive}
              />
              <span className="text">Last Name</span>
              <span className="line" />
            </div>
          </div>
        </div>
        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input
                type="email"
                name="user_email"
                required="required"
                onChange={handleActive}
              />
              <span className="text">Email</span>
              <span className="line" />
            </div>
          </div>
        </div>
        <div className="row100">
          <div className="col">
            <div className="inputBox textarea">
              <textarea
                type="text"
                name="message"
                required="required"
                onChange={handleActive}
              />
              <span className="text">Type your message here</span>
              <span className="line" />
            </div>
          </div>
        </div>
        <div className="row100">
          <div className="col">
            <button className="btn" type="submit">
              Send
            </button>
            <GiAnt className="btn-ant" />
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ContactForm;
