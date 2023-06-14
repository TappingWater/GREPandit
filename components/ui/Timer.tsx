import React, {
	useEffect,
	useRef,
	useImperativeHandle,
	forwardRef,
	useState,
} from "react";

export interface TimerHandle {
	getElapsedTime: () => Date;
	pause: () => void;
	reset: () => void;
}

/**
 * React component that is used to represent a timer. Can be used to
 * reference the elapsed time directly.
 */
const Timer = forwardRef<TimerHandle, { time: Date }>(({ time }, ref) => {
	const startTime = useRef<Date>(new Date());
	const intervalId = useRef<NodeJS.Timeout | null>(null);
	const [displayTime, setDisplayTime] = useState<string>("0:00");

	useImperativeHandle(ref, () => ({
		getElapsedTime: () =>
			new Date(new Date().getTime() - startTime.current.getTime()),
		pause: () => {
			if (intervalId.current) {
				clearInterval(intervalId.current);
			}
		},
		reset: () => {
			setDisplayTime("0:00");
		},
	}));

	const getDisplayTime = (elapsedTime: Date) => {
		const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, "0");
		const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, "0");
		return `${minutes}:${seconds}`;
	};

	useEffect(() => {
		startTime.current = time;
		intervalId.current = setInterval(() => {
			const elapsedTime = new Date(
				new Date().getTime() - startTime.current.getTime()
			);
			setDisplayTime(getDisplayTime(elapsedTime));
		}, 1000);

		return () => {
			if (intervalId.current) {
				clearInterval(intervalId.current);
			}
		};
	}, [time]);

	return (
		<div className='bg-white font-tabs w-[80px] rounded text-center p-[1px] text-sm text-slate-600 font-semibold'>
			{displayTime}
		</div>
	);
});

Timer.displayName = "Timer";

export default Timer;
