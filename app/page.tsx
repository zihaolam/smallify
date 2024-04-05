import { FootNote } from "@/components/shared/footnote";
import { Navbar } from "@/components/shared/navbar";
import { DropzoneAndConverter } from "./_components/dropzone";
import { Suspense } from "react";

export default function Home() {
	return (
		<main className="pb-20 min-h-screen h-0">
			<Navbar />
			<div className="container py-24">
				<div className="text-5xl text-center bg-gradient-to-r from-blue-500 via-cyan-300 to-cyan-400 bg-clip-text text-transparent font-semibold">
					Optimise Your Assets Easily
				</div>
				<div className="text-2xl mb-10 text-center font-medium from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent bg-gradient-to-r my-4">
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
