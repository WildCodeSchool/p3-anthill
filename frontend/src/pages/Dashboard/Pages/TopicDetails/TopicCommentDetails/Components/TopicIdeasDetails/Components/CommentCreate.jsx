import { useRef } from "react";
import { useParams } from "react-router-dom";
import "./CommentCreate.css";
import { Editor } from "@tinymce/tinymce-react";
import useFetchLazy from "../../../../../../../../services/useFetchLazy";

function CommentCreate({ triggerGetComments, ideaId, setIsClicked }) {
  const { topicId } = useParams();

  const { trigger: triggerPostComment } = useFetchLazy({
    path: `/topics/${topicId}/ideas/${ideaId}/comments`,
    method: "post",
  });

  const editorRef = useRef(null);
  async function log(e) {
    e.preventDefault();
    if (editorRef.current) {
      await triggerPostComment({ content: editorRef.current.getContent() });
      triggerGetComments();
      editorRef.current.setContent("");
      setIsClicked(false);
    }
  }

  return (
    <div className="commentCreate">
      <div className="commentCreate__main">
        <form className="commentCreate__form">
          <label htmlFor="commentContent" className="commentCreate__title">
            Your comment
          </label>
          <Editor
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            init={{
              skin_url: "/skins/ui/dark_mode",
              placeholder: "Description",
              height: "300px",
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
                  font-family: "Poppins", sans-serif;
                  font-size:14px; 
                  background-color:#1f2025; 
                  color:#ffffff; 
                }
	              .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
                  color: #a9a9a9;
                  font-family: "Poppins", sans-serif;
                  letter-spacing: 0.5px;
                }`,
            }}
          />
          <button type="button" className="button-send" onClick={log}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentCreate;
