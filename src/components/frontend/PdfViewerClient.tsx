"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

export default function PdfViewerClient({ file, downloadName }: { file: string; downloadName: string }) {
  return <PdfViewer file={file} downloadName={downloadName} />;
}
