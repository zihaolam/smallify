"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { nanoid } from "nanoid";
import { fileToBase64 } from "./utils";

export class FFmpegService {
	ffmpeg: FFmpeg;
	constructor() {
		this.ffmpeg = new FFmpeg();
	}

	load = async () => {
		if (this.loaded) return;
		const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd";
		this.ffmpeg.on("log", ({ message }) => {
			console.log(message);
		});

		await this.ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
			wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
			workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript"),
		});
	};

	convertToWebp = async (file: File): Promise<FileConversionOutput> => {
		await this.load();
		const tmpUrl = URL.createObjectURL(file);
		await this.ffmpeg.writeFile(file.name, await fetchFile(tmpUrl));
		const outputFileName = nanoid() + ".webp";
		await this.ffmpeg.exec(["-i", file.name, "-compression_level", "6", outputFileName]);

		const data = await this.ffmpeg.readFile(outputFileName);
		const outputFile = new File([data], outputFileName, { type: "image/webp" });
		await this.ffmpeg.deleteFile(outputFileName);
		await this.ffmpeg.deleteFile(file.name);
		URL.revokeObjectURL(tmpUrl);
		return {
			src: await fileToBase64(outputFile),
			outputFile: outputFile,
			initialFile: file,
		};
	};

	get loaded() {
		return this.ffmpeg.loaded;
	}
}

export interface FileConversionOutput {
	src: string;
	initialFile: File;
	outputFile: File;
}
