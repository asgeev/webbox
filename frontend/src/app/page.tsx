"use client";
import { FormEvent } from "react";
import { useState } from "react";

const serverUrl: string = "http://localhost:3001";
const uploadEndpoint: string = `${serverUrl}/upload`;

export default function Home() {
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await fetch(uploadEndpoint, {
      method: "POST",
      body: formData,
    });

    //Handle response if necessary
    const data = await response.json();
    setDownloadUrl(`${serverUrl}${data?.fileUrl}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={onSubmit} method="post" encType="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit" />
      </form>
      {downloadUrl && <a href={downloadUrl}>{downloadUrl}</a>}
    </main>
  );
}
