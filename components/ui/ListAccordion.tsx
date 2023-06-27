import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const ListAccordion = ({
	header,
	content,
}: {
	header: string;
	content: string[];
}) => {
	return (
		<Accordion
			type='single'
			collapsible
			className='w-full'
			onClick={(e) => e.stopPropagation()}
		>
			<AccordionItem value={header}>
				<AccordionTrigger className='font-heading text-md'>
					{header}
				</AccordionTrigger>
				<AccordionContent>
					<ul className='list-disc pl-4 text-justify marker:text-pink-600 space-y-1'>
						{content.map((c, idx) => {
							if (idx < 5) {
								return (
									<li className='text-sm' key={idx}>
										{c}
									</li>
								);
							}
						})}
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default ListAccordion;
