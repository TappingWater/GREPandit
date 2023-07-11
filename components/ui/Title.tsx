const Title = ({
	tab,
	subTab,
	optional,
}: {
	tab: string;
	subTab?: string;
	optional?: string;
}) => {
	return (
		<div className='bg-white rounded text-sky-800 w-[250px] ml-4 p-[4px] h-[30px] mb-2'>
			<h3 className='font-heading text-sm'>
				<span>{tab}</span>
				{subTab && <span className='text-pink-400'>:{subTab}</span>}
			</h3>
			{optional ? (
				<p className='font-tabs font-light'>{optional}</p>
			) : null}
		</div>
	);
};

export default Title;
