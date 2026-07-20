"use client";
import Image from "next/image";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/components/useToast";

export default function LoginPage() {
	const router = useRouter();
	const { toast } = useToast();
	const [inputUser, setInputUser] = useState("");
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePos({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const handleLogin = async (platform) => {
		if (!inputUser.trim()) return;

		setIsLoading(true);

		try {
			const apiUrl = new URL("/verify_user/", process.env.NEXT_PUBLIC_API_URL);
			apiUrl.searchParams.append("username", inputUser.trim());
			apiUrl.searchParams.append("platform", platform);

			const res = await fetch(apiUrl.href, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) throw new Error("Network error");
			const data = await res.json();

			if (!data.exists) {
				toast({
					type: "error",
					title: "User Not Found",
					message: `We couldn't find user '${inputUser}' on ${platform}.`,
				});
				setIsLoading(false);
				return;
			}

			if (data.is_private) {
				toast({
					type: "warning",
					title: "Private Profile",
					message: `The profile of '${inputUser}' is private. Make it public to continue.`,
				});
				setIsLoading(false);
				return;
			}

			toast({
				type: "success",
				title: "Login Successful",
				message: `You have successfully logged in as '${inputUser}'.`,
			});
			localStorage.setItem("username", inputUser.trim());
			localStorage.setItem("platform", platform);
			router.push("/dashboard");
		} catch (error) {
			toast({
				type: "error",
				title: "Connection Error",
				message: "Could not connect to the server to verify user.",
			});
			setIsLoading(false);
		}
	};

	const handleKeyDown = (e, platform) => {
		if (e.key == "Enter" && !isLoading) handleLogin(platform);
	};

	return (
		<div
			className="flex flex-col w-full relative"
			style={{ background: "oklch(0.08 0.015 265)", minHeight: "100vh" }}
		>
			<div
				className="fixed inset-0 pointer-events-none z-0"
				style={{
					background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, oklch(0.65 0.25 290 / 0.1), transparent 40%)`,
				}}
			/>

			<div
				className="fixed inset-0 opacity-[0.12] pointer-events-none z-0"
				style={{
					backgroundImage: `linear-gradient(to right, oklch(0.65 0.25 290 / 0.3) 1px, transparent 1px), 
          linear-gradient(to bottom, oklch(0.65 0.25 290 / 0.3) 1px, transparent 1px)`,
					backgroundSize: "50px 50px",
					maskImage:
						"radial-gradient(circle at center, black, transparent 85%)",
					transform: "perspective(1000px) rotateX(35deg)",
					transformOrigin: "top",
					animation: "grid-scroll 25s linear infinite",
				}}
			/>

			<div className="fixed inset-0 pointer-events-none overflow-hidden blur-[120px] z-0">
				<div
					className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20"
					style={{
						background: "oklch(0.65 0.25 290)",
						animation: "float-glow 15s ease-in-out infinite alternate",
					}}
				/>
				<div
					className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-10"
					style={{ background: "oklch(0.68 0.20 310)" }}
				/>
			</div>

			<section className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10 shrink-0 py-20">
				<div className="relative w-full max-w-md">
					<div className="text-center mb-10 group cursor-default flex flex-col items-center">
						<div className="relative w-32 h-32 mb-1 transition-transform duration-700 group-hover:scale-105">
							<div className="absolute inset-0 bg-purple-500/30 rounded-full blur-[35px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
							<Image
								src="/Indoga_image_logo.png"
								alt="Indoga Logo"
								fill
								sizes="(max-width: 128px) 100vw, 128px"
								className="object-contain mix-blend-screen"
								priority
							/>
						</div>

						<h1 className="text-3xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-purple-500 uppercase ml-2 mb-2">
							Indoga
						</h1>
						<p className="text-sm font-medium opacity-60 text-slate-300">
							Connect your anime profile to get started
						</p>
					</div>

					<div
						className="rounded-[2.5rem] border p-8 backdrop-blur-xl transition-all duration-700 hover:border-purple-500/40 group/card relative overflow-hidden"
						style={{
							background: "oklch(0.12 0.02 265 / 0.7)",
							borderColor: "oklch(0.20 0.02 265)",
							boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.6)",
						}}
					>
						<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-right from-transparent via-purple-500/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

						<Tabs defaultValue="anilist" className="w-full">
							<TabsList
								className="grid grid-cols-2 mb-8 rounded-2xl p-1 border border-white/5"
								style={{ background: "oklch(0.06 0.01 265)" }}
							>
								<TabsTrigger
									value="anilist"
									className="flex items-center gap-2 rounded-xl text-xs font-bold transition-all uppercase tracking-widest
                  data-[state=inactive]:text-slate-500/80 data-[state=inactive]:hover:text-slate-300
                  data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400"
								>
									<Image
										src="/anilist_logo.png"
										alt="AniList logo"
										width={14}
										height={14}
										className="rounded-sm"
									/>
									AniList
								</TabsTrigger>

								<TabsTrigger
									value="mal"
									className="flex items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all uppercase tracking-widest
                  data-[state=inactive]:text-slate-500/80 data-[state=inactive]:hover:text-slate-300
                  data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400"
								>
									<Image
										src="/mal_logo.png"
										alt="MyAnimeList logo"
										width={14}
										height={14}
										className="rounded-sm"
									/>
									MyAnimeList
								</TabsTrigger>
							</TabsList>

							{["anilist", "mal"].map((platform) => (
								<TabsContent
									key={platform}
									value={platform}
									className="mt-0 space-y-5 outline-none"
								>
									<div className="space-y-2.5">
										<label className="text-[10px] font-black mb-1 block ml-1 text-slate-500 uppercase tracking-[0.2em]">
											User Identifier
										</label>
										<div className="flex gap-2">
											<Input
												placeholder={`Enter your ${
													platform == "mal" ? "MyAnimeList" : "AniList"
												} username`}
												className="flex-1 rounded-2xl border-2 text-sm h-14 bg-black/50 px-5 focus:ring-0 focus:border-purple-500/50 transition-all placeholder:text-slate-500"
												style={{
													borderColor: "oklch(0.45 0.02 265)",
													color: "white",
												}}
												value={inputUser}
												onChange={(e) => setInputUser(e.target.value)}
												onKeyDown={(e) =>
													handleKeyDown(
														e,
														platform == "anilist" ? "AniList" : "MyAnimeList",
													)
												}
												disabled={isLoading}
											/>
											<Button
												className="h-14 w-14 rounded-2xl font-semibold text-white transition-all duration-500
                        hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:hover:scale-100"
												style={{ background: "oklch(0.65 0.25 290)" }}
												onClick={() =>
													handleLogin(
														platform == "anilist" ? "AniList" : "MyAnimeList",
													)
												}
												disabled={!inputUser.trim() || isLoading}
											>
												{isLoading ? (
													<Loader2 className="w-5 h-5 animate-spin" />
												) : (
													<Search className="w-5 h-5" />
												)}
											</Button>
										</div>
									</div>
								</TabsContent>
							))}
						</Tabs>
					</div>

					<div
						className="mt-10 flex justify-center items-center gap-5 text-[10px] font-mono tracking-[0.25em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-500"
						style={{ color: "oklch(0.75 0.02 265)" }}
					>
						<a
							href="https://github.com/MateuszRadz1kowski/Indoga"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-purple-400 transition-colors"
						>
							Github
						</a>
						<div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
						<a
							href="https://ko-fi.com/indoga"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-purple-400 transition-colors"
						>
							Support
						</a>
					</div>
				</div>
			</section>

			<section className="relative z-10 w-full max-w-4xl mx-auto px-8 pb-32 text-sm leading-relaxed text-slate-500/40 hover:text-slate-500/80 transition-colors duration-1000 selection:bg-purple-900/50">
				<article className="space-y-10">
					<div>
						<h2 className="text-lg font-semibold tracking-wide text-slate-400/50 mb-4 uppercase">
							Personalized Anime & Manga Discovery
						</h2>
						<p className="mb-4">
							Indoga is a free anime discovery site built around two main
							concepts: giving you recommendations tailored to your watch
							history, and providing an interactive filter panel so you can
							narrow down exactly what you're in the mood for right now.
						</p>
						<p>
							<strong>Requirement to use it:</strong> You need to have a public
							AniList or MyAnimeList account. You don't need to register or
							create a new account on my site at all, just drop in your existing
							AniList/MAL username and it generates the recommendations on the
							fly.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-slate-400/50 mb-3 text-base">
							How it works
						</h3>
						<p className="mb-4">
							Indoga connects to your AniList or MyAnimeList profile and reads
							everything - your scores, your favourites, what you've dropped,
							what you've rewatched, what you plan on watching. From all of that
							it builds a taste profile: the tags and genres that define what
							you enjoy.
						</p>
						<p>
							Every recommendation is scored against that profile. The match %
							next to each title shows how closely it fits your preferences
							specifically. And for each result you'll see which tags drove it -
							so instead of a generic "we think you'll like this", you get "this
							matched because you like: Psychological, Tragedy, Time Skip."
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-slate-400/50 mb-3 text-base">
							The Filter Panel
						</h3>
						<p className="mb-4">
							The filter panel lets you go from "show me everything" to "show me
							a short psychological thriller from the 2010s, available on
							Crunchyroll" in a few clicks. Here is what you can tweak to find
							exactly what you want:
						</p>
						<ul className="list-disc pl-5 space-y-3 mb-6">
							<li>
								<strong>Content toggles:</strong> Four quick switches to
								show/hide sequels, toggle 18+ content, include/exclude your
								planning list, and filter out mega-popular titles if you're
								looking for hidden gems.
							</li>
							<li>
								<strong>Tag & Genre selectors:</strong> Most powerful tools on
								the panel. Pick any tags or genres you want to include, and the
								results will only show anime that have all of them. Or, flip it
								to hide mode to completely exclude tags/genres you don’t want to
								see. Combined, these turn the site from a basic recommendation
								engine into a highly specific discovery tool.
							</li>
							<li>
								<strong>Episode range & Release year:</strong> Set a minimum and
								maximum for both. Useful if you just want a quick 12-episode
								watch or something from a specific era.
							</li>
							<li>
								<strong>Minimum community score:</strong> An easy way to filter
								out poorly rated shows.
							</li>
							<li>
								<strong>Streaming service:</strong> Narrows down the results to
								what you can actually watch on Crunchyroll, Netflix, Amazon
								Prime, Hulu, Disney+, or HBO Max.
							</li>
							<li>
								<strong>Popularity influence:</strong> This lets you adjust how
								much a show's general popularity impacts its ranking on your
								list. Set it to Low to push obscure titles to the top, High if
								you want to lean into well-known hits, or Medium for a normal
								balance.
							</li>
						</ul>
						<p className="italic mb-4 text-slate-500/60">
							(Also, if you ever aren't sure what a filter does, just toggle
							Tooltips in the top bar, every filter has an explanation built
							in).
						</p>
						<p>
							You can switch between three display modes any time also you can
							sort by match %, community score, popularity or release year - in
							either direction.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-slate-400/50 mb-3 text-base">
							Stats & Compare Tabs
						</h3>
						<p className="mb-4">
							Besides browsing your recommendations, I added two extra tabs you
							can play with:
						</p>
						<div className="space-y-4">
							<p>
								<strong>The Stats Tab</strong> visualizes your taste profile. It
								has affinity bars showing exactly how much each genre and tag
								influences your recommendations. It also highlights your Hot
								Takes (shows where your personal rating completely differs from
								the community average) and a Watched Timeline that organizes all
								your completed anime by decade and year it released.
							</p>
							<p>
								<strong>The Compare Tab</strong> lets you see how compatible you
								are with a friend. Type in their AniList or MAL username and it
								instantly calculates an overall compatibility percentage. It
								generates a radar chart of your shared genres, and a deep dive
								into the specific tags you both love versus the ones that
								completely divide you.
							</p>
						</div>
					</div>
				</article>
			</section>
		</div>
	);
}
