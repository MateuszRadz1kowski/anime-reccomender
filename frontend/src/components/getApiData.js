import { useEffect, useState } from "react";

export function useApiData() {
	const [data, setData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch("http://127.0.0.1:8000/recommendations_data");
			const json = await res.json();

			setData(Object.values(json));
		}

		fetchData();
	}, []);

	return data;
}
