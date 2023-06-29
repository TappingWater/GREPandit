import { PulseLoader } from "react-spinners";

const LoadingAnimation = () => {
	return (
		<div className='h-[100%] w-[100%] font-tabs text-xl text-center flex flex-col items-center justify-center space-y-8'>
			<PulseLoader color='white'></PulseLoader>
			<p>Loading ...</p>
		</div>
	);
};

export default LoadingAnimation;
