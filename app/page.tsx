import { FootNote } from "@/components/shared/footnote";
import { Navbar } from "@/components/shared/navbar";
import { DropzoneAndConverter } from "./_components/dropzone";
import { Suspense } from "react";

export default function Home() {
	return (
		<main className="bg-black text-white min-h-screen h-0 flex-col flex">
			<Navbar />
			<div className="flex-1 flex flex-col items-center justify-center">
				<div className="text-5xl bg-gradient-to-r from-blue-500 via-cyan-300 to-cyan-400 bg-clip-text text-transparent font-semibold">
					Optimise Your Assets Easily
				</div>
				<div className="text-2xl mb-10 font-medium from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent bg-gradient-to-r text-center my-4">
					Reduce your asset file size and improve website load times.
				</div>

				<Suspense>
					<DropzoneAndConverter />
				</Suspense>
			</div>
			<FootNote />
		</main>
	);
}
