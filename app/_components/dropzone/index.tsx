"use client";

import { FFmpegService, FileConversionOutput } from "@/lib/ffmpeg";
import { promisePool } from "@/lib/promise-pool";
import React from "react";
import { ImSpinner9 } from "react-icons/im";
import { Output } from "./output";

export const DropzoneAndConverter = () => {
	const ffmpeg = React.useRef<FFmpegService>();
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [output, setOutput] = React.useState<FileConversionOutput[]>([]);
	const [nFilesProcessing, setNFilesProcessing] = React.useState<number>(0);

	React.useEffect(() => {
		ffmpeg.current = new FFmpegService();
		ffmpeg.current.load();
	}, [ffmpeg]);

	const convert = React.useCallback(async (fileList: FileList) => {
		const ffmpegInstance = ffmpeg.current;
		const fileLength = fileList.length;
		if (fileLength === 0) return;
		if (!ffmpegInstance) return;
		setNFilesProcessing((prev) => prev + fileLength);
		const res = await promisePool(Array.from(fileList), (file) => ffmpegInstance.convertToWebp(file), 3).finally(() =>
			setNFilesProcessing((prev) => {
				console.log("setting prev to deducted", prev - fileLength);
				return prev - fileLength;
			})
		);
		return setOutput((prev) => [...prev, ...res]);
	}, []);

	const handleChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;
			if (!files?.length) return;
			return convert(files).then((res) => {
				e.target.value = "";
				return res;
			});
		},
		[convert]
	);

	const handleDrop = React.useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			const files = e.dataTransfer?.files;
			if (!files?.length) return;
			return convert(files);
		},
		[convert]
	);

	return (
		<>
			<div
				className="w-[600px] h-[300px] border-dashed text-gray-400 font-medium border-gray-700 rounded-xl border-2 flex items-center justify-center cursor-pointer relative"
				onDragOver={(e) => e.preventDefault()}
				onDrop={handleDrop}
				onClick={() => inputRef.current?.click()}
			>
				{nFilesProcessing ? (
					<div className="absolute top-2 text-xs text-gray-400 left-2 flex items-center gap-x-2">
						<ImSpinner9 className="animate-spin" />
						<span>{nFilesProcessing} files processing</span>
					</div>
				) : null}
				<div>Drop your png/jpeg file or click to upload</div>
				<input accept="image/*" multiple ref={inputRef} onChange={handleChange} type="file" className="hidden" />
			</div>
			<Output output={output} />
		</>
	);
};
