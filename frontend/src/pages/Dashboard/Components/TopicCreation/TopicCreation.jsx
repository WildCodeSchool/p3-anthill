import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { GiAnt } from "react-icons/gi";
import { BsPencil } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import useFetchLazy from "../../../../services/useFetchLazy";

import "./TopicCreation.css";

function TopicCreation({ closePopUp }) {
  const navigate = useNavigate();

  const refTitle = useRef();
  const editorRef = useRef();
  const refDeadline = useRef();

  const { trigger: triggerPostTopic, data } = useFetchLazy({
    path: "/topics",
    method: "post",
  });

  const submit = (e) => {
    e.preventDefault();
    triggerPostTopic({
      title: refTitle.current.value,
      description: editorRef.current.getContent(),
      deadline: refDeadline.current.value,
      isCommentMode: true, // pour l'instant c'est une fixture car mindmapmode n'est géré
    });
    refTitle.current.value = "";
    editorRef.current.setContent("");
    refDeadline.current.value = "";
  };

  useEffect(() => {
    if (data?.insertId) {
      navigate(`/dashboard/topics/${data.insertId}`);
      closePopUp();
    }
  }, [data]);

  return (
    <form className="topicCreation_container" onSubmit={submit}>
      <BsPencil className="topicCreation__iconPencil" />
      <input
        id="topic__nameTitle"
        className="topic__input"
        placeholder="Topic Name"
        name="Topic name"
        type="text"
        ref={refTitle}
        required
      />
      <RxLapTimer className="topicCreation__iconTimer" />
      <input
        id="deadline"
        className="topic__input"
        type="datetime-local"
        ref={refDeadline}
        required
      />
      <div>
        <div className="topicCreation_description">
          <Editor
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            init={{
              skin_url: "/skins/ui/dark_mode",
              placeholder: "Description",
              height: "300",
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "link",
                "image",
                "lists",
                "charmap",
                "anchor",
                "pagebreak",
                "searchreplace",
                "wordcount",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "emoticons",
                "template",
                "codesample",
              ],
              toolbar:
                "undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |" +
                "bullist numlist outdent indent | link image | print preview media fullscreen | " +
                "forecolor backcolor emoticons",
              content_style: `
              code {
                background-color: #e8e8e8;
                border-radius: 3px;
                padding: .1rem .2rem;
              }
                body{
                  font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color:#1f2025; color:white; 
                }
	              .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
		              color:#ffffff;
	              }`,
            }}
          />
        </div>
        <div className="topicCreation_bottom">
          <GiAnt size={30} />
          <button className="button-creation" type="submit">
            Start
          </button>
        </div>
      </div>
    </form>
  );
}

export default TopicCreation;
