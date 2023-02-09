import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BsPencil } from "react-icons/bs";
import useFetchLazy from "../../../../../../services/useFetchLazy";

function IdeaCreationCard({
  topicId,
  triggerGetIdeas,
  className,
  setIsIdeaCreationOpen,
}) {
  const titleRef = useRef();
  const editorRef = useRef();

  const {
    trigger: triggerPostIdea,
    data: responsePostIdea,
    isSuccess: successPostIdea,
    loading: loadingPostIdea,
    error: errorPostIdea,
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
    setIsIdeaCreationOpen(false);
  };

  return (
    <div className={`${className}`}>
      <div className="ideaCreationCard">
        <form className="ideaCreationCard__form" onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="ideaArea">
              <BsPencil className="ideaCreation__iconPencil" />
              <textarea
                placeholder="Idea"
                type="text"
                id="ideaInput"
                ref={titleRef}
              />
            </div>
            <div className="descriptionArea">
              <Editor
                onInit={(evt, editor) => {
                  editorRef.current = editor;
                }}
                initialValue="Description"
                init={{
                  skin_url: "/skins/ui/dark_mode",
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
                  content_style: `
                    code {
                      background-color: #e8e8e8;
                      border-radius: 3px;
                      padding: .1rem .2rem;
                    }
                      body{
                        font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color:#1f2025; color:#a9a9a9; 
                      }
                      .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
                        color:#ffffff;
                      }`,
                }}
              />
            </div>
          </div>

          <div className="ideaCreation_Card">
            <button type="submit" className="button-slack">
              {loadingPostIdea ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
      </div>
      {errorPostIdea && <p>{responsePostIdea}</p>}
      {successPostIdea && (
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
