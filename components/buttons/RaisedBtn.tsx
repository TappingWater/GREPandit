export const RaisedBtn = ({
	label,
	onClick,
	color,
	width,
	height,
}: {
	label: string;
	onClick: () => void;
	color: string;
	width: number;
	height: number;
}) => {
	const colors = new Map<string, string>([
		["sky", "bg-sky-600 shadow-sky-800 hover:bg-sky-500 active:bg-sky-400"],
		[
			"blue",
			"bg-blue-600 shadow-sky-800 hover:bg-sky-500 active:bg-sky-400",
		],
		[
			"pink",
			"bg-pink-500 shadow-pink-700 hover:bg-pink-400 active:bg-pink-400",
		],
		// other colors and shades...
	]);

	return (
		<button
			onClick={onClick}
			className={` ml-4 rounded p-2 font-tabs text-sm font-semibold shadow-[2px_2px_2px] 
			active:shadow-inner active:scale-90 flex items-center justify-center mt-4 ${colors.get(
				color
			)!}`}
			style={{ width: `${width}px`, height: `${height}px` }}
		>
			{label}
		</button>
	);
};
