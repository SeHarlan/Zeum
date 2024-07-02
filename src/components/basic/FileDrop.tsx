import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";


type FileDropProps = {
  className?: string;
  onContentLoad: (content: Uint8Array) => void;
};

const FileDrop: React.FC<FileDropProps> = ({onContentLoad, className}) => {
  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    const file = acceptedFiles[0];

     const reader = new FileReader();

     reader.onload = function () {
       const arrayBuffer = reader.result;
       if (!arrayBuffer || typeof arrayBuffer === "string") {
         console.log(
           "Error converting blob to array buffer. type: ",
           typeof arrayBuffer
         );
         return null;
       }

       const data = new Uint8Array(arrayBuffer);
       onContentLoad(data);
     };

     reader.readAsArrayBuffer(file);


    
  }, [onContentLoad]);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} />
      {acceptedFiles[0]?.name 
        ? <p>{acceptedFiles[0]?.name}</p>
        : <p>Drag &apos;n&apos; drop an file here, or click to select one</p>
      }
    </div>
  );
};

export default FileDrop;

