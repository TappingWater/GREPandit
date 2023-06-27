export const RaisedBtn = ({
	label,
	onClick,
	color,
	width,
}: {
	label: string;
	onClick: () => void;
	color: string;
	width: number;
}) => {
	const colors = new Map<string, string>([
		["sky", "bg-sky-500 shadow-sky-700 hover:bg-sky-400 active:bg-sky-400"],
		// other colors and shades...
	]);

	return (
		<button
			onClick={onClick}
			className={` ml-4 rounded p-2 font-tabs shadow-[2px_2px_2px] active:shadow-inner active:scale-90 ${colors.get(
				color
			)!}`}
		>
			{label}
		</button>
	);
};
