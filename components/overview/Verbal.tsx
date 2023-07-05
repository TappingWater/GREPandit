import { renderInfo, renderInfoAsList } from "@/lib/helper/overview";
import { SearchBoxInfo } from "./SearchBox";
import Title from "../ui/Title";

/**
 * Component that is used to render the data required for the
 * verbal overview section.
 */
const Verbal = () => {
	const basicStructureList = [
		"The Verbal Reasoning section is one of three sections on the GRE.",
		"It is split into two subsections, each lasting 30 minutes.",
		"Each subsection includes 20 questions, making a total of 40 questions.",
		"The GRE is a section-level adaptive test. This means the second section of a given type (e.g., Verbal Reasoning) is selected based on your performance in the first section.",
		"In addition to the scored sections, there might be an unscored section, which does not count toward your score. This is typically used for research purposes.",
	];
	const howScoredList = [
		"The Verbal Reasoning section is scored on a scale of 130 to 170, in one-point increments.",
		"Each question in the section is worth an equal amount, contributing to the raw score.",
		"The raw score is then converted to the scaled score through a process called equating.",
		"The difficulty of the questions you receive in the second section depends on your performance in the first section. The better you do in the first section, the harder the questions you'll receive in the second.",
		"There's no penalty for wrong answers, so it's beneficial to answer every question.",
		"For questions with multiple answers, no credit is given for partially correct answers.",
	];
	const assessList = [
		"Analyzing and drawing conclusions",
		"Reasoning from incomplete data",
		"Identifying authors assumptions/perspective",
		"Understanding multiple levels of meaning",
		"Selecting important info",
		"Distinguish major/minor points",
	];
	const framedAsList = [
		"Multiple choice question with a single valid choice",
		"Multiple choice question with multiple valid choices",
		"Selecting a sentence from a passage that matches a prompt",
	];
	const typesList = [
		"Reading Comprehension",
		"Text Completion",
		"Sentence Equivalence",
	];
	const readingComprehensionAttributesList = [
		"Reading Comprehension passages range from one to several paragraphs.",
		"Test contains 10 paragraphs in total.",
		"Most questions are derived from a single paragraph",
		"Question types include multiple-choice, select-in-passage, and multiple-answer.",
		"Passages cover a variety of topics and are based on reading texts from various disciplines.",
		"Tests understanding, interpretation, and analysis of the text.",
		"No prior knowledge of the topic is required to answer the questions.",
		"Passages' difficulty and complexity vary.",
	];
	const readingAdviceList = [
		"Don't worry if unfamiliar material comes up.",
		"All questions can be answered from the content within the text.",
		"Save tough or unfamiliar passages for last.",
		"Thoroughly analyze the passage before answering questions.",
		"Watch for clues to understand implicit aspects.",
		"Distinguish main ideas from supporting details.",
		"Differentiate author's arguments from reported information.",
		"Understand author's commitment level to ideas, and differentiate it from hypothetical thoughts.",
		"Identify transitions between ideas.",
		"Identify relationships between ideas. Look for contrasts, consistencies, support, elaborations, and applications.",
		"Understand each question properly before answering.",
		"Answer based on passage information only. (Don't rely on outside knowledge or personal views)",
		"Even if your opinions differ from the passage, stay within its context.",
	];
	const singleChoiceReadingList = [
		"Questions with a single valid answer.",
		"Choices are marked as circles or ovals.",
		"Read all answer choices before deciding, even if you think you already know the answer.",
		"Avoid partially true or partially complete answers. Choose the most accurate and complete answer.",
		"Don't pick an answer just because it's a true statement. It must answer the question correctly.",
		"Consider the context, especially when interpreting the meaning of a word from the passage.",
		"Remember that word meanings can change depending on context.",
	];
	const multipleChoiceReadingList = [
		"Questions with multiple correct answers.",
		"Choices are marked with squares. (not circles/ovals)",
		"Evaluate each answer choice separately, not in relation to others.",
		"Select answers that fully and accurately address the question.",
		"Avoid answers that are only partially true or only address part of the question.",
		"Understand that several options can be correct; don't panic if they all seem accurate.",
		"Points are only awarded for completely correct selections.",
		"Partially correct selections receive no credit. (ex: Selecting 2 of the 3 correct choices)",
		"Choosing an incorrect answer alongside correct ones will result in no points awarded.",
	];
	const selectInPassageList = [
		"Questions where you have to select a sentence from a few highlighted paragraphs.",
		"Evaluate each relevant sentence in the passage separately before selection.",
		"Focus only on sentences within the specified paragraphs.",
		"Only select a sentence if it fully matches the question's description.",
		"Remember, the question's description might not be complete.",
		"Clicking anywhere on the sentence will highlight it.",
		"These types of questions do not appear in the paper-delivered General Test.",
	];
	const textCompletionAttributesList = [
		"Passages have 1-5 sentences with 1-3 blanks to fill.",
		"Each blank offers three choices; single-blank questions offer five.",
		"Answer choices for blanks are independent.",
		"Only fully correct answers get credit.",
		"Questions test interpretation, evaluation, and use of context.",
		"Good vocabulary can be advantageous.",
	];
	const textCompletionAdviceList = [
		"Interpret and evaluate as you read.",
		"Use passage info to select words/phrases for blanks.",
		"Analyze the passage instead of guessing combinations.",
		"Note significant words/phrases for understanding.",
		"Fill the blanks with your own words before checking choices.",
		"Fill easier blanks first; order doesn't matter.",
		"Double-check answers for coherence and correctness.",
	];
	const sentenceEquivalenceAttributesList = [
		"Sentence Equivalence questions are single-sentence queries with one blank.",
		"There are six answer choices, out of which two must be selected.",
		"A correct response yields two completed sentences that have the same meaning.",
		"Answer choices are marked with square boxes.",
		"No credit for partially correct answers.",
		"These questions mainly test comprehension of a sentence as a whole.",
	];
	const sentenceEquivalenceAdviceList = [
		"Avoid searching for two answer choices that mean the same; they should fit coherently into the sentence and make identical sense.",
		"Get a general sense of the sentence by reading it thoroughly.",
		"Look for key words or phrases that signify sentence structure or are central to the sentence's meaning.",
		"Predict a possible word for the blank, then look for two similar answer choices.",
		"Don't be fixated on your initial choice if you can't find a second similar choice. Explore other coherent options.",
		"Double-check your answers to ensure the sentences are logically, grammatically, and stylistically coherent, and that they carry the same meaning.",
	];

	const structure: SearchBoxInfo = {
		title: "What is the basic structure of this section:",
		tags: ["assess", "measure", "primarily test", "basics"],
		children: renderInfoAsList(basicStructureList),
	};
	const scoring: SearchBoxInfo = {
		title: "How is this section scored:",
		tags: ["assess", "measure", "primarily test", "basics"],
		children: renderInfoAsList(howScoredList),
	};
	const assess: SearchBoxInfo = {
		title: "What does this section assess:",
		tags: ["assess", "measure", "primarily test", "basics"],
		children: renderInfoAsList(assessList),
	};
	const framedAs: SearchBoxInfo = {
		title: "How are questions in this section framed:",
		tags: ["framed", "framed as", "display"],
		children: renderInfoAsList(framedAsList),
	};
	const types: SearchBoxInfo = {
		title: "What are the types of questions that appear in this section:",
		tags: ["types", "categories", "type", "category"],
		children: renderInfoAsList(typesList),
	};
	const readingComprehensionAttributes: SearchBoxInfo = {
		title: "Attributes of Reading Comprehension problems:",
		tags: ["reading comprehension", "reading", "comprehension"],
		children: renderInfoAsList(readingComprehensionAttributesList),
	};
	const readingComprehensionAdvice: SearchBoxInfo = {
		title: "Advice for Reading Comprehension problems:",
		tags: ["reading comprehension", "reading", "comprehension"],
		children: renderInfoAsList(readingAdviceList),
	};
	const rcSingleMCQ: SearchBoxInfo = {
		title: "Reading Comprehension problems with a single valid choice:",
		tags: ["single choice", "mcq", "reading comprehension"],
		children: renderInfoAsList(singleChoiceReadingList),
	};
	const multipleChoiceMCQ: SearchBoxInfo = {
		title: "Reading Comprehension problems with multiple valid choices:",
		tags: [
			"multiple choice",
			"mcq",
			"many answers",
			"reading comprehension",
		],
		children: renderInfoAsList(multipleChoiceReadingList),
	};
	const selectInPassage: SearchBoxInfo = {
		title: "Reading Comprehension problems where you have to select from a passage:",
		tags: [
			"select",
			"sentence select",
			"highlighted passage",
			"click sentence",
		],
		children: renderInfoAsList(selectInPassageList),
	};
	const rcExample1: SearchBoxInfo = {
		title: "Example of a Reading Comprehension problem with a single valid choice:",
		tags: ["examples", "ex"],
		children: (
			<>
				<p className='text-sm text-justify mb-2 p-2'>
					Incorporating elements of jazz into classical music, a
					method that had been largely abandoned during the 1970s in
					Europe, composer Antonio Lysenko (born 1946) integrated the
					spirit of jazz music into his compositions. Lysenko
					constructed two symphonies on music by jazz musicians John
					Coltrane and Miles Davis, but the symphonies’ sound is
					uniquely his. Jazz elements do not seem out of context in
					Lysenko’s classical music, which from its early days has
					shared certain chord progressions and rhythms with jazz
					music. However, this usage of jazz elements has not turned
					Lysenko into a composer of jazz music. His music is not a
					rehash of jazz music designed to lure classical listeners;
					it is high art for listeners more familiar with jazz than
					the classics.
				</p>
				<p className='text-sm font-semibold mb-2'>
					Select one valid answer. The passage addresses which of the
					following issues related to Lysenko’s use of jazz elements
					in his classical compositions:
				</p>
				<ul className='pl-5 mb-4 space-y-2'>
					<li className='text-sm'>
						A. How it is regarded by listeners who prefer rock to
						the classics
					</li>
					<li className='text-sm'>
						B. How it has affected the commercial success of Glass’s
						music
					</li>
					<li className='text-sm'>
						C. Whether it has contributed to a revival of interest
						among other composers in using popular elements in their
						compositions
					</li>
					<li className='text-sm'>
						D. Whether it has had a detrimental effect on Glass’s
						reputation as a composer of classical music
					</li>
					<li className='text-sm'>
						E. Whether it has caused certain of Glass’s works to be
						derivative in quality
					</li>
				</ul>
				<p className='font-semibold mb-2'>Explanation:</p>
				<p className='text-sm'>
					The passage discusses how Lysenko&apos;s music is &quot;high
					art for listeners more familiar with jazz than the
					classics&quot;, which directly relates to how his music is
					received by listeners who prefer jazz to the classics
					(Choice A). The passage does not directly discuss any impact
					on Lysenko&apos;s commercial success (Choice B), any sparked
					interest among other composers (Choice C), any potential
					negative influence on Lysenko’s reputation (Choice D), or if
					some of his works are derivative (Choice E). Therefore, A is
					the correct answer.
				</p>
			</>
		),
	};
	const rcExample2: SearchBoxInfo = {
		title: "Example of a Reading Comprehension problem with multiple valid choices:",
		tags: ["examples", "ex"],
		children: (
			<>
				<p className='text-sm text-justify mb-2 p-2'>
					Incorporating elements of jazz into classical music, a
					method that had been largely abandoned during the 1970s in
					Europe, composer Antonio Lysenko (born 1946) integrated the
					spirit of jazz music into his compositions. Lysenko
					constructed two symphonies on music by jazz musicians John
					Coltrane and Miles Davis, but the symphonies’ sound is
					uniquely his. Jazz elements do not seem out of context in
					Lysenko’s classical music, which from its early days has
					shared certain chord progressions and rhythms with jazz
					music. However, this usage of jazz elements has not turned
					Lysenko into a composer of jazz music. His music is not a
					rehash of jazz music designed to lure classical listeners;
					it is high art for listeners more familiar with jazz than
					the classics.
				</p>
				<p className='text-sm font-semibold mb-2'>
					Select one or more valid answers. Which of the following can
					be inferred from Lysenko&apos;s use of jazz elements in his
					classical compositions:
				</p>
				<ul className='pl-5 mb-4 space-y-2'>
					<li className='text-sm'>
						A. Lysenko&apos;s music is unique despite being
						influenced by jazz musicians.
					</li>
					<li className='text-sm'>
						B. Lysenko&apos;s music is intended to be appreciated as
						high art rather than pop music.
					</li>
					<li className='text-sm'>
						C. Jazz elements do not seem out of place in
						Lysenko&apos;s classical music.
					</li>
				</ul>
				<p className='font-semibold mb-2'>Explanation:</p>
				<p className='text-sm'>
					The passage states that Lysenko&apos;s music, while
					constructed on music by jazz musicians, has a sound that is
					uniquely his (Choice A). It also mentions that his music is
					high art for listeners more familiar with jazz than the
					classics (Choice B). And lastly, the text asserts that jazz
					elements do not seem out of context in Lysenko&apos;s
					classical music (Choice C). Therefore, A, B, and C are all
					correct answers.
				</p>
			</>
		),
	};
	const rcExample3: SearchBoxInfo = {
		title: "Example of a Reading Comprehension problem with sentence selection:",
		tags: ["examples", "ex"],
		children: (
			<>
				<p className='text-sm text-justify mb-2 p-2'>
					Incorporating elements of jazz into classical music, a
					method that had been largely abandoned during the 1970s in
					Europe, composer Antonio Lysenko (born 1946) integrated the
					spirit of jazz music into his compositions. Lysenko
					constructed two symphonies on music by jazz musicians John
					Coltrane and Miles Davis, but the symphonies’ sound is
					uniquely his. Jazz elements do not seem out of context in
					Lysenko’s classical music, which from its early days has
					shared certain chord progressions and rhythms with jazz
					music. However, this usage of jazz elements has not turned
					Lysenko into a composer of jazz music. His music is not a
					rehash of jazz music designed to lure classical listeners;
					it is high art for listeners more familiar with jazz than
					the classics.
				</p>
				<p className='text-sm font-semibold mb-2'>
					Select the sentence from the passage that describes the
					unique quality of Lysenko&apos;s music.
				</p>
				<p className='font-semibold mb-2'>Selected Sentence:</p>
				<p className='text-sm mb-2'>
					&quot;Lysenko constructed two symphonies on music by jazz
					musicians John Coltrane and Miles Davis, but the symphonies’
					sound is uniquely his.&quot;
				</p>
				<p className='font-semibold mb-2'>Explanation:</p>
				<p className='text-sm'>
					This sentence directly describes how Lysenko&apos;s music,
					despite being constructed on music by jazz musicians, has a
					sound that is uniquely his.
				</p>
			</>
		),
	};
	const textCompletionAttributes: SearchBoxInfo = {
		title: "Attributes of Text Completion problems:",
		tags: ["text completion", "attributes", "blanks", "fill in"],
		children: renderInfoAsList(textCompletionAttributesList),
	};
	const textCompletionAdvice: SearchBoxInfo = {
		title: "Advice for Text Completion problems:",
		tags: ["text completion", "attributes", "blanks", "fill in"],
		children: renderInfoAsList(textCompletionAdviceList),
	};
	const tcExample1: SearchBoxInfo = {
		title: "Example of a Text Completion problem with multiple blanks:",
		tags: ["examples", "ex"],
		children: (
			<>
				<p className='text-sm text-justify mb-2 p-2'>
					The professor was known for her (i)__________ lectures,
					which, although filled with (ii)__________ content, were
					delivered in such an engaging manner that students found
					them (iii)__________.
				</p>
				<div className='grid grid-cols-3 gap-4'>
					<div>
						<p className='text-sm font-semibold mb-2'>Blank (i)</p>
						<div className='text-sm mb-2'>
							A) boring
							<br />
							B) enlightening
							<br />
							C) predictable
						</div>
					</div>
					<div>
						<p className='text-sm font-semibold mb-2'>Blank (ii)</p>
						<div className='text-sm mb-2'>
							D) irrelevant
							<br />
							E) complex
							<br />
							F) simplistic
						</div>
					</div>
					<div>
						<p className='text-sm font-semibold mb-2'>
							Blank (iii)
						</p>
						<div className='text-sm mb-2'>
							G) tedious
							<br />
							H) irresistible
							<br />
							I) impenetrable
						</div>
					</div>
				</div>
				<p className='font-semibold mb-2'>Answer:</p>
				<p className='text-sm mb-2'>
					B) enlightening, E) complex, H) irresistible
				</p>
				<p className='font-semibold mb-2'>Explanation:</p>
				<p className='text-sm'>
					The sentence hints that the professor&apos;s lectures,
					though filled with complex content, were so engaging that
					students found them irresistible. Hence,
					&apos;enlightening&apos;, &apos;complex&apos;, and
					&apos;irresistible&apos; fill the blanks appropriately.
				</p>
			</>
		),
	};
	const tcExample2: SearchBoxInfo = {
		title: "Example of a Text Completion problem with a single blank:",
		tags: ["examples", "ex"],
		children: (
			<>
				<p className='text-sm text-justify mb-2 p-2'>
					The artist&apos;s work, though initially regarded as
					(i)__________, eventually gained widespread acclaim.
				</p>
				<div className='flex-col'>
					<p className='text-sm mb-2'>A) derivative</p>
					<p className='text-sm mb-2'>B) avant-garde</p>
					<p className='text-sm mb-2'>C) mediocre</p>
					<p className='text-sm mb-2'>D) impeccable</p>
					<p className='text-sm mb-2'>E) conventional</p>
				</div>
				<p className='font-semibold mb-2'>Answer:</p>
				<p className='text-sm mb-2'>B) avant-garde</p>
				<p className='font-semibold mb-2'>Explanation:</p>
				<p className='text-sm'>
					Given the context that the artist&apos;s work eventually
					gained acclaim, it makes sense to infer that the initial
					reaction could have been that it was
					&apos;avant-garde&apos;—groundbreaking and ahead of its
					time.
				</p>
			</>
		),
	};
	const sentenceEquivalenceAttributes: SearchBoxInfo = {
		title: "Attributes of Sentence Equivalence problems:",
		tags: ["sentence equivalence", "attributes", "blanks", "fill in"],
		children: renderInfoAsList(sentenceEquivalenceAttributesList),
	};
	const sentenceEquivalenceAdvice: SearchBoxInfo = {
		title: "Advice for Sentence Equivalence problems:",
		tags: ["sentence equivalence", "attributes", "blanks", "fill in"],
		children: renderInfoAsList(sentenceEquivalenceAdviceList),
	};
	const seExample1: SearchBoxInfo = {
		title: "Example of a Sentence Equivalence problem:",
		tags: ["examples", "ex"],
		children: (
			<>
				<p className='text-sm text-justify mb-2 p-2'>
					Despite their (i)__________, the team managed to win the
					championship.
				</p>
				<div className='flex-col'>
					<p className='text-sm mb-2'>A) cohesion</p>
					<p className='text-sm mb-2'>B) disputes</p>
					<p className='text-sm mb-2'>C) teamwork</p>
					<p className='text-sm mb-2'>D) unity</p>
					<p className='text-sm mb-2'>E) disagreements</p>
					<p className='text-sm mb-2'>F) collaboration</p>
				</div>
				<p className='font-semibold mb-2'>Answer:</p>
				<p className='text-sm mb-2'>B) disputes, E) disagreements</p>
				<p className='font-semibold mb-2'>Explanation:</p>
				<p className='text-sm'>
					Both &apos;disputes&apos; and &apos;disagreements&apos;
					would fit into the blank, giving the sentence the same
					meaning: despite internal issues, the team was successful.
				</p>
			</>
		),
	};

	const infoMap = new Map<string, SearchBoxInfo[]>([
		["Overview", [structure, scoring, assess, framedAs, types]],
		[
			"Reading Comprehension",
			[
				readingComprehensionAttributes,
				readingComprehensionAdvice,
				rcSingleMCQ,
				rcExample1,
				multipleChoiceMCQ,
				rcExample2,
				selectInPassage,
				rcExample3,
			],
		],
		[
			"Text Completion",
			[
				textCompletionAttributes,
				textCompletionAdvice,
				tcExample2,
				tcExample1,
			],
		],
		[
			"Sentence Equivalence",
			[
				sentenceEquivalenceAttributes,
				sentenceEquivalenceAdvice,
				seExample1,
			],
		],
	]);

	return (
		<>
			<Title tab={"Verbal Reasoning"} subTab={"Overview"} />
			{renderInfo(infoMap)}
		</>
	);
};

export default Verbal;
