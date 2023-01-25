import { useRef, useState } from "react";
import axios from "axios";

function UploadPicture() {
  const uploadRef = useRef();
  const [upload, setUpload] = useState("");

  const hSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("picture", uploadRef.current.files[0]);

    axios
      .patch("http://localhost:3000/api/users/1/picture", formData)
      .then(() => {
        setUpload("Upload done");
      })
      .catch(() => {
        setUpload("Upload failed");
      });
  };

  return (
    <>
      <div onSubmit={hSubmit}>
        <input type="file" ref={uploadRef} />
        <button type="submit">Upload</button>
      </div>
      <p>{upload}</p>
    </>
  );
}

export default UploadPicture;
