"use client";
import { useEffect, useState } from "react";
import LoginPage from "./loginPage/page";
import Dashboard from "./dashboard/page";

export default function Home() {
	const [username, setUsername] = useState(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const storedUser = localStorage.getItem("username");
		setUsername(storedUser);
		setIsMounted(true);
	}, []);

	return (
		<main
			className={`min-h-screen bg-[#060d1b] transition-opacity duration-300 ease-in-out ${
				isMounted ? "opacity-100" : "opacity-0"
			}`}
		>
			{isMounted && username && username !== "null" ? (
				<Dashboard />
			) : (
				<LoginPage />
			)}
		</main>
	);
}
