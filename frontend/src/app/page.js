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

	if (isMounted && username && username !== "null") {
		return <Dashboard />;
	}

	return <LoginPage />;
}
