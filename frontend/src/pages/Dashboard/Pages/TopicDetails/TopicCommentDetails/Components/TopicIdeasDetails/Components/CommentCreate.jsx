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
            initialValue=""
            init={{
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
              content_style:
                "body{font-family:Helvetica,Arial,sans-serif; font-size:16px}",
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
