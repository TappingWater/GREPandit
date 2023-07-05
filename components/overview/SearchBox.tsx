import { ReactNode } from "react";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

export interface SearchBoxInfo {
	title: string;
	tags: string[];
	children: ReactNode;
}

export interface SearchBoxProps {
	searchInfo: SearchBoxInfo;
	key: number;
}

/**
 * Used to represent a single search box within the overview
 * the overview section.
 */
const SearchBox: React.FC<SearchBoxProps> = ({ searchInfo, key }) => {
	// ContainsInfo now indicates whether the searchTerm was found in title, tags, or children

	return (
		<AccordionItem value={searchInfo.title} key={key}>
			<AccordionTrigger className='text-left text-base'>
				{searchInfo.title}
			</AccordionTrigger>
			<AccordionContent>{searchInfo.children}</AccordionContent>
		</AccordionItem>
	);
};

export default SearchBox;
