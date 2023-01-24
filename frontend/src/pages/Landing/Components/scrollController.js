import { useEffect, useState, useRef } from "react";

function scrollController() {
  const [isSticky, setSticky] = useState(false);
  const element = useRef(null);
  const tabs = useRef(null);
  const sections = useRef(null);
  sections.current = document.querySelectorAll("section");
  tabs.current = document.querySelectorAll(".nav-tab");

  const findCurrentTabSelector = () => {
    const scrollPos = window.scrollY;

    sections.current.forEach((section, index) => {
      if (scrollPos > section.offsetTop + section.offsetHeight - 70) {
        tabs.current.forEach((link, idx) => {
          let width;
          let left;
          if (index === idx) {
            width = link.offsetWidth;
            left = link.offsetLeft;
          }
          document.querySelector(".nav-tab-slider").style.width = `${width}px`;
          document.querySelector(".nav-tab-slider").style.left = `${left}px`;
        });
      }
    });
  };

  const handleScroll = () => {
    findCurrentTabSelector();
    if (window.scrollY > element.current.offsetTop - 120) setSticky(true);
    else setSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, [handleScroll]);

  return { isSticky, element };
}

export default scrollController;
