import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Custom handler for image upload
function imageHandler() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    const range = this.quill.getSelection();
    this.quill.insertEmbed(range.index, "image", data.data.url);
  };
}

const MarkDropdownEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }, { size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["code-block"],
        ["clean"],
        ["fullscreen"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "video",
    "code-block",
  ];

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={{ height: "100px", marginBottom: "50px" }}
      />
    </div>
  );
};

export default MarkDropdownEditor;
