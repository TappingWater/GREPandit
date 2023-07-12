import Image from "next/image";
import Link from "next/link";

const Logo = ({
	className,
	loggedIn,
}: {
	className?: string;
	loggedIn: boolean;
}) => {
	return (
		<div className={className ? className : ""}>
			<Link
				href={loggedIn ? "/dashboard?tab=home" : "/"}
				className={`flex flex-row items-center p-1 ${className}`}
			>
				<Image
					src='/headerLogo.webp'
					alt='Logo'
					height={70}
					width={70}
					priority
				/>
				<p className='font-heading text-center font-bold flex'>
					<span className='text-sky-700'>GRE</span>
					<span className='text-pink-300'>Pandit</span>
				</p>
			</Link>
		</div>
	);
};

export default Logo;
