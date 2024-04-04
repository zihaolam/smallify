"use client";

import { useDocument } from "@/hooks/useDocument";
import { FileConversionOutput } from "@/lib/ffmpeg";
import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";

interface OutputProps {
	output: FileConversionOutput[];
}

export const Output: React.FC<OutputProps> = ({ output }) => {
	const document = useDocument();
	const downloadFile = React.useCallback(
		(file: File) => {
			if (!document) return;
			const url = URL.createObjectURL(file);
			const a = document.createElement("a");
			a.href = url;
			a.download = file.name;
			a.click();
			URL.revokeObjectURL(url);
		},
		[document]
	);

	return output.length ? (
		<div className="mt-4">
			<div>Output:</div>
			<div className="w-[600px] flex justify-start items-center border border-gray-700 rounded-md p-1 gap-x-1">
				{output.map((f, i) => (
					<div key={i}>
						<div className="relative mb-2 group cursor-pointer" onClick={() => downloadFile(f.outputFile)}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={f.src} className="rounded-md h-32" alt="test" key={i} />
							<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center group-hover:bg-black/50">
								<MdOutlineFileDownload className="text-white w-6 h-6 group-hover:visible invisible" />
							</div>
						</div>
						<div>
							<div className="text-xxs text-center">
								{(f.initialFile.size / 1000).toFixed(2)}KB -&gt; {(f.outputFile.size / 1000).toFixed(2)}KB
							</div>
							<div className="text-xxs text-center text-green-500">
								Saved {((1 - f.outputFile.size / f.initialFile.size) * 100).toFixed(2)}%
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	) : null;
};
