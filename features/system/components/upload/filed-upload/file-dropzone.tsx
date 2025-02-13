"use client";

import clsx from "clsx";
import {
  Accept,
  DropEvent,
  FileRejection,
  useDropzone
} from "react-dropzone";

interface IProps {
  children?: React.ReactNode;
  accept?: Accept;
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void;
}

export default function FileDropzone(props: IProps) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: props.accept,
    // Fix: https://github.com/react-dropzone/react-dropzone/issues/1196#issuecomment-1409949458
    noClick: true,
    multiple: false,
    onDrop: props.onDrop,
  });

  const rootClasses = clsx(
    "flex h-full cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed bg-gray-100 p-5 transition-colors hover:bg-gray-200",
    (isFocused && "border-primary") ||
      (isDragAccept && "border-green-500") ||
      (isDragReject && "border-rose-500") ||
      "border-gray-300",
  );

  return (
    <div {...getRootProps({ className: rootClasses })} onClick={open}>
      <input {...getInputProps()} />
      {props.children}
    </div>
  );
}
