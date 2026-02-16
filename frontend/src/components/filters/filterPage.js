export default function FilterPage() {
	return (
		<div className="space-y-8">
			<h2 className="text-xl font-semibold">Filters</h2>

			{/* SEASON */}
			<div className="space-y-2">
				<label className="text-sm text-neutral-400">Season</label>
				<select
					className="w-full bg-neutral-700 border border-neutral-600 
								   rounded-lg px-3 py-2 text-sm 
								   focus:outline-none focus:ring-2 focus:ring-yellow-400"
				>
					<option>All</option>
					<option>SPRING</option>
					<option>SUMMER</option>
					<option>FALL</option>
					<option>WINTER</option>
				</select>
			</div>

			{/* FORMAT */}
			<div className="space-y-2">
				<label className="text-sm text-neutral-400">Format</label>
				<select
					className="w-full bg-neutral-700 border border-neutral-600 
								   rounded-lg px-3 py-2 text-sm 
								   focus:outline-none focus:ring-2 focus:ring-yellow-400"
				>
					<option>All</option>
					<option>TV</option>
					<option>Movie</option>
				</select>
			</div>
		</div>
	);
}
