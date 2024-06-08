import { useRef, memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const CKeditor = ({ label, value, changeValue, name, invalidFields, setInvalidFields }) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className="flex flex-col ">
      <span className="">{label}</span>
      <Editor
        apiKey="csphidvz7nugfxjqxl1x3omfukzbg2xw2gyboan89zhfhzw3"
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={(e) => changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))}
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === name) && (
        <small className="text-rose-500 text-sm">{invalidFields?.filter?.find((el) => el.name === name)?.message}</small>
      )}
    </div>
  );
};

export default memo(CKeditor);
