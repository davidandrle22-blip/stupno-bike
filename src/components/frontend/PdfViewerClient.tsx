"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

export default function PdfViewerClient({ file, downloadName, openUrl }: { file: string; downloadName: string; openUrl?: string }) {
  return <PdfViewer file={file} downloadName={downloadName} openUrl={openUrl} />;
}
