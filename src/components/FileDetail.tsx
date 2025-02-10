import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Loading from "./common/Loading";
import { getFile } from "../service/files";

export default function FileDetail() {
  const { fileId } = useParams();
  const location = useLocation();
  const file = useMemo(() => location.state?.file || null, [location.state]);
  const [content, setContent] = useState<string | ArrayBuffer | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        if (!fileId) {
          setError("File ID is missing");
          return;
        }

        const response = await getFile(
          fileId,
          file?.fileType.startsWith("image/") ? "blob" : "text"
        );

        if (file?.fileType.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            setContent(reader.result);
          };
          reader.readAsDataURL(response);
        } else {
          setContent(response);
        }
      } catch (err) {
        debugger;
        setError("Failed to load file content");
      }
    };

    fetchFileContent();
  }, [fileId, file]);
  console.log("content ", content);

  return file ? (
    <div className="container">
      <h1>{file.name}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {file.fileType.startsWith("image/") ? (
        <img
          src={content as string}
          alt={file.name}
          style={{ maxWidth: "100%" }}
        />
      ) : (
        <pre style={{ whiteSpace: "pre-wrap" }}>{content as string}</pre>
      )}
    </div>
  ) : (
    <Loading />
  );
}
