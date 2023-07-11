import Image from "next/image";

const IconTab = ({ img, name }: { img: string; name: string }) => {
	return (
		<p className='flex items-center h-full w-100% pl-2 pr-2'>
			<Image src={img} alt={name} height={14} width={14} />
			<span className='ml-2 font-tabs'>{name}</span>
		</p>
	);
};

export default IconTab;
