import Link from "next/link";
import Logo from "./Logo";

/**
 * Default header to be displayed when user is not authenticated
 */
const NonAuthHeader = ({ loadLogin }: { loadLogin: boolean }) => {
	const logoDivStyling: string = "flex-1 flex items-center";
	const buttonStyling =
		"min-w-[80px] bg-sky-700 p-2 rounded-lg font-tabs ml-auto drop-shadow-2xl hover:bg-sky-500 active:bg-sky-200 active:shadow-inner transition-all";

	return (
		<header className='fixed w-[100%] h-[90px] pt-3 pb-3 flex items-center bg-white z-20 border-solid border-pink-300 border-b-2'>
			<Logo className={logoDivStyling} loggedIn={false} />
			<div className='ml-auto pr-5'>
				{loadLogin ? (
					<Link href='/login'>
						<button className={buttonStyling}>Login</button>
					</Link>
				) : null}
			</div>
		</header>
	);
};

export default NonAuthHeader;
