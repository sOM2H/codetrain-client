import React, { useEffect, useRef } from "react";

const ReadOnlyTextarea = ({ text, index, onHeightChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;

      if (onHeightChange) {
        onHeightChange(index, textarea.scrollHeight);
      }
    }
  }, [text, index, onHeightChange]);

  return (
    <textarea
      ref={textareaRef}
      className="form-control test-textarea"
      spellCheck="false"
      defaultValue={text}
      disabled
      style={{
        overflow: "hidden",
        resize: "none",
        width: "100%",
      }}
    />
  );
};

export default ReadOnlyTextarea;