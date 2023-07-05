import SearchBox, { SearchBoxInfo } from "@/components/overview/SearchBox";
import { Accordion } from "@/components/ui/accordion";

// Rendering function
export const renderInfo = (searchMap: Map<string, SearchBoxInfo[]>) => {
	return (
		<>
			{Array.from(searchMap).map(([groupName, boxes]) => {
				return (
					<>
						<h3 className='ml-8 mt-2 mb-2 font-semibold text-sky-600 font-heading'>
							{groupName}
						</h3>
						<Accordion
							type='single'
							collapsible
							className='w-[90vw] md:w-[80vw] p-4 m-auto bg-white rounded text-slate-900'
						>
							{boxes.map((qInfo, idx) => (
								<SearchBox key={idx} searchInfo={qInfo} />
							))}
						</Accordion>
					</>
				);
			})}
		</>
	);
};

export const renderInfoAsList = (list: string[]) => {
	return (
		<ul className='list-disc  marker:text-sky-600 text-justify pl-4 pr-4 text-base'>
			{list.map((liItem, idx) => (
				<li key={idx}>{liItem}</li>
			))}
		</ul>
	);
};

export const renderMapInfo = (map: Map<string, string[]>) => {
	return (
		<ul className='list-disc  marker:text-sky-600 text-justify pl-4 pr-4 text-base'>
			{Array.from(map).map(([itemKey, itemValues]) => (
				<li key={itemKey}>
					<h3>{itemKey}:</h3>
					<ul className='list-disc marker:text-pink-500 pl-4 pr-4 text-base'>
						{itemValues.map((item, idx) => (
							<li key={idx}>{item}</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
};
