import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setIsLoading(true);

			const httpAbortCtrl = new AbortController();
			activeHttpRequests.current.push(httpAbortCtrl);

			try {
				const response = await fetch(url, {
					method,
					body,
					headers,
				});

				const data = await response.json();

				activeHttpRequests.current = activeHttpRequests.current.filter(
					(reqCtrl) => reqCtrl !== httpAbortCtrl,
				);

				if (!response.ok) {
					throw new Error(data.message);
				}

				setIsLoading(false);
				return data;
			} catch (error) {
				setErrorMessage(error.message);
				setIsLoading(false);
				throw error;
			}
		},
		[],
	);

	const clearError = () => {
		setErrorMessage(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrls) => abortCtrls.abort());
		};
	}, []);

	return { isLoading, errorMessage, sendRequest, clearError };
};
