export const promisePool = async <TInput, TOutput>(arr: TInput[], cb: (data: TInput) => Promise<TOutput>, concurrency: number) => {
	const copiedArr = [...arr];
	const collectedResponse: TOutput[] = [];
	for (let i = 0; i < copiedArr.length; i += concurrency) {
		const res = await Promise.all(copiedArr.slice(i, concurrency + i).map(cb));
		collectedResponse.push(...res);
	}
	return collectedResponse;
};
