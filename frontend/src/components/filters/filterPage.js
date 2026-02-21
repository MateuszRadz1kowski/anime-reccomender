import { Button } from "../ui/button";

export default function FilterPage() {
	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-xl font-semibold">Filters</h2>
				<Button className="mt-2">Apply Filters</Button>
				<Button className="ml-2">Clear Filters</Button>
			</div>
		</div>
	);
}
