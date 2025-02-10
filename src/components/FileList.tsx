import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileInfo } from "../types";
import { getFiles, uploadFile } from "../service/files";
import { ALLOWED_FILE_TYPES } from "../constants";
import "./styles.css";
import Loading from "./common/Loading";

export default function FileList() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const refreshFiles = useCallback(async () => {
    try {
      const response = await getFiles();
      setFiles(response);
    } catch (err) {
      setError("Failed to load files");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    refreshFiles().finally(() => {
      setLoading(false);
    });
  }, []);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError("File type not allowed");
        return;
      }
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadedFileInfo = await uploadFile(formData);
        setFiles([uploadedFileInfo, ...files]);
        // await refreshFiles();
      } catch (err) {
        setError("Upload failed");
      } finally {
        setLoading(false);
      }
    },
    [files]
  );

  return loading ? (
    <Loading />
  ) : (
    <div className={"container"}>
      <h1>My Files</h1>
      <div>
        <label>
          Upload File:
          <input
            type="file"
            onChange={handleUpload}
            accept=".txt,.jpg,.jpeg,.png,.json"
          />
        </label>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "grid", gap: "1rem" }}>
        {files.map((file) => (
          <Link key={file.id} to={`/files/${file.id}`} state={{ file }}>
            <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
              <h3>{file.name}</h3>
              <p>Type: {file.fileType}</p>
              <p>Size: {Math.round(file.size / 1024)} KB</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
