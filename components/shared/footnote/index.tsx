import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const FootNote = () => {
	return (
		<div className="fixed bottom-0 bg-black text-white text-center py-2 text-xs px-2 w-full flex justify-between border-t border-gray-700">
			<div>Smallify operates in your browser, it does not store or collect any user data</div>
			<div>
				Powered by{" "}
				<Link href="https://github.com/ffmpegwasm/ffmpeg.wasm" target="_blank" className="text-purple-300 inline-flex items-center">
					ffmpeg.wasm <FaGithub className="ml-0.5" />
				</Link>
			</div>
		</div>
	);
};
