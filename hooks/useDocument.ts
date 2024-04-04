"use client";

import React from "react";

export const useDocument = () => {
	const [_document, setDocument] = React.useState<Document>();

	React.useEffect(() => {
		setDocument(document);
	}, []);

	return _document;
};
