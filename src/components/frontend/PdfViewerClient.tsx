"use client";

import dynamic from "next/dynamic";

const PdfSection = dynamic(() => import("./PdfSection"), { ssr: false });

export default function PdfViewerClient({ file, downloadName }: { file: string; downloadName: string }) {
  return <PdfSection file={file} downloadName={downloadName} />;
}
