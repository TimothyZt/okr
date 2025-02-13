"use client";

import { useState } from "react";
import { unpackActionResponse } from "../../../../lib/server-actions/action-response";
import { postEmployeeFileAction, postUserCompanyAssignmentsFileAction } from "../../server-actions/actions";
import { FileWithPath } from "react-dropzone";
import { useForm } from "react-hook-form";
import { MdClose, MdCloudUpload } from "react-icons/md";
import FileDropzone from "./filed-upload/file-dropzone";
import { formatBytes } from "@/utils/format";

interface IProps {
  onClose?: () => void;
  desc: string;
  type: string;
}

export default function SystemUploadModal(props: IProps) {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  async function uploadDeliverables() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    if (props.type === "company") {
      const results = unpackActionResponse(await postUserCompanyAssignmentsFileAction(formData));
      if(results.length != 0){alert(results);}
    } else if (props.type === "empl") {
      const results =unpackActionResponse(await postEmployeeFileAction(formData));
      if(results.length != 0){alert(results);}      
    }
    props.onClose?.();
  }
  return (
    <>
      <article className="mt-12 flex flex-col gap-6 bg-white p-6 shadow-1">
        <header className="flex gap-4">
          <h1 className="grow text-lg">{props.desc}</h1>
          <button
            type="button"
            className="transition-transform hover:rotate-180"
          >
            <MdClose
              className="h-5 w-5 transition-colors hover:text-primary active:text-secondary"
              onClick={props.onClose}
            />
          </button>
        </header>
        <FileDropzone onDrop={(files) => setFile(files[0] ?? null)}>
          <div className="text-quaternary-fg flex h-[50dvh] max-h-50 min-h-50 flex-col items-center justify-center text-center">
            <MdCloudUpload className="h-48 w-60" />
            {/* <p>{t("dropzonePrompt")}</p> */}
          </div>
        </FileDropzone>
        {file && (
          <section>
            <ul className="ml-6">
              <li key={file.path} className="list-disc">
                <div className="flex items-center gap-2">
                  <span className="break-all">
                    {file.path} - {formatBytes(file.size)}
                  </span>
                  <button
                    className="rounded-sm p-0.5 text-rose-500 hover:bg-rose-500 hover:text-white active:bg-rose-600 active:text-white"
                    onClick={() => setFile(null)}
                  >
                    <MdClose className="h-5 w-5 transition-colors" />
                  </button>
                </div>
              </li>
            </ul>
          </section>
        )}
        <form onSubmit={handleSubmit(uploadDeliverables)} className="">
          <button
            className="hover:text-secondary-text disabled:bg-gray-300 block w-full rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-secondary active:hue-rotate-15 disabled:text-white"
            disabled={!file || isSubmitting}
          >
            提交
          </button>
        </form>
      </article>
    </>
  );
}
