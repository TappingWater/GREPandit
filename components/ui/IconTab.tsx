import Image from "next/image";

const IconTab = ({img, name}:{img: string, name: string}) => {
	return (
		<p className="flex w-100% pl-2 pr-2">
			<Image className="items -center" src={img} alt={name} height={14} width={14}/>		
			<span className="ml-2">{name}</span>
		</p>
	);
};

export default IconTab;