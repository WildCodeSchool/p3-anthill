import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { GiAnt } from "react-icons/gi";
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
      creatorId: 1, // pour l'instant c'est une fixture en attendant la bonne valeur venant de local storage
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
      <label className="topicCreation_label" htmlFor="topic__nameTitle">
        Topic Name
      </label>
      <input
        id="topic__nameTitle"
        className="topic__name"
        placeholder="NAME"
        name="Topic name"
        type="text"
        ref={refTitle}
        required
      />
      <label className="topicCreation_label" htmlFor="deadline">
        Date
      </label>
      <input
        id="deadline"
        className="deadline"
        type="datetime-local"
        ref={refDeadline}
      />
      <div>
        <div className="topicCreation_description">
          <label className="topicCreation_label" htmlFor="description__title">
            Description
          </label>
          <div
            id="description__title"
            className="description"
            name="description"
            type="text"
          >
            <Editor
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
              initialValue=""
              init={{
                height: "80%",
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
                content_style:
                  "body{font-family:Helvetica,Arial,sans-serif; font-size:16px}",
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
      </div>
    </form>
  );
}

export default TopicCreation;
