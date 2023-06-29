import React from "react";
import TooltipContainer from "./TooltipContainer";

const CheckedButton = ({
	onClick,
	isChecked,
	checkedText,
	uncheckedText,
	checkedStyles,
	unCheckedStyles,
	toolTipText,
}: {
	onClick: (event: React.MouseEvent) => void;
	isChecked: boolean;
	checkedText: string;
	uncheckedText: string;
	checkedStyles: string;
	unCheckedStyles: string;
	toolTipText: string;
}) => {
	const common =
		"flex items-center justify-center w-[120px] h-[30px] bg-sky-700 mt-1 mb-1 p-1 md:mt-2 md:mb-2 md:p-2 rounded-lg font-tabs ml-auto hover:bg-sky-500 active:bg-sky-500 active:shadow-inner transition-all";

	return (
		<TooltipContainer text={toolTipText}>
			<button
				onClick={(e) => onClick(e)}
				className={`${
					isChecked ? checkedStyles : unCheckedStyles
				} ${common}`}
			>
				{isChecked ? checkedText : uncheckedText}
			</button>
		</TooltipContainer>
	);
};

export default CheckedButton;
