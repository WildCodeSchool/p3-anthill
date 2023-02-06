import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useFetchLazy from "../../../../../../services/useFetchLazy";

function IdeaCreationCard({ topicId, triggerGetIdeas }) {
  const titleRef = useRef();
  const editorRef = useRef();

  const {
    trigger: triggerPostIdea,
    isSuccess,
    loading,
    error,
  } = useFetchLazy({
    path: `/topics/${topicId}/ideas`,
    method: "post",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await triggerPostIdea({
      title: titleRef.current?.value,
      description: editorRef.current.getContent(),
    });
    triggerGetIdeas();
    titleRef.current.value = "";
    editorRef.current.setContent("");
  };

  return (
    <div>
      <div className="ideaCreationCard">
        <form className="ideaCreationCard__form" onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="ideaArea">
              <label htmlFor="ideaInput">Idea :</label>
              <textarea type="text" id="ideaInput" ref={titleRef} />
            </div>
            <div className="descriptionArea">
              <label htmlFor="descriptionInput">Description :</label>
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

            {error && <p>{error.message}</p>}
          </div>

          <div className="ideaCreation_Card">
            <button type="submit" id="ideaCreationCard__button">
              {loading ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
      </div>
      {isSuccess && (
        <p
          style={{
            textAlign: "center",
            color: "var(--light-color)",
            fontWeight: "600",
          }}
        >
          New idea created !
        </p>
      )}
    </div>
  );
}

export default IdeaCreationCard;
