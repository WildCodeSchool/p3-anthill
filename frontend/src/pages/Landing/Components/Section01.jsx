import { useState, useEffect } from "react";
import "./Section01.css";

function Section01() {
  const [blobs, setBlobs] = useState([]);

  const createBlob = () => {
    const size = Math.floor(Math.random() * 200) + 50;
    const color = `hsl(${Math.floor(Math.random() * 360)}deg, 100%, 50%)`;
    const left = `${Math.random() * 100}%`;
    const top = `${Math.random() * 100}%`;

    return { size, color, left, top };
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const newBlob = createBlob();
      setBlobs((prevBlobs) => [...prevBlobs, newBlob]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  function moveText(e) {
    const x = e.clientX;
    const y = e.clientY;
    document.querySelector("div").style.position = "absolute";
    document.querySelector("div").style.transform = "translate(-50%, -25%)";
    document.querySelector("div").style.left = `${x}px`;
    document.querySelector("div").style.top = `${y}px`;
  }
  return (
    <div className="section01">
      {blobs.map((blob) => (
        <div
          key={Math.random}
          className="blob"
          style={{
            width: `${blob.size}px`,
            aspectRatio: "1/1",
            background: blob.color,
            position: "absolute",
            left: blob.left,
            top: blob.top,
            zIndex: "-1",
            borderRadius: "50%",
            animationEnd: "onAnimationEnd()",
          }}
        />
      ))}
      <p>Thank you</p>
      <h1>800</h1>
      <p>followers</p>
    </div>
  );
}

export default Section01;
