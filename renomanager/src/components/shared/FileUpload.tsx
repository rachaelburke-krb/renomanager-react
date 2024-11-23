import React, { useRef } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  children: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = "image/*",
  children,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        style={{ display: "none" }}
      />
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        {children}
      </div>
    </>
  );
};

export default FileUpload;
