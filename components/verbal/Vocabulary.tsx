import { Word } from "@/lib/apitypes/VerbalTypes";
import { useState, useEffect } from "react";
import { getMarkedWords, getProblematicWords } from "@/lib/api/userRequests";
import CardCarousel from "./CardCarousel";
import { Nextbtn, NextBtnProps } from "../buttons/Nextbtn";
import Title from "../ui/Title";
import { RaisedBtn } from "../buttons/RaisedBtn";
import { getGeneralWords } from "@/lib/api/verbalRequests";

/**
 * Used to display the list of words marked by the user as
 * well as the words that are likely to come in the GRE exam.
 */
const Vocabulary = () => {
	const [markedWords, setMarkedWords] = useState<Word[]>([]);
	const [markedWordsIdx, setMarkedWordsIdx] = useState(0);
	const [generalWords, setGeneralWords] = useState<Word[]>([]);
	const [generalWordsIdx, setGeneralWordsIdx] = useState(0);
	const [problematicWords, setProblematicWords] = useState<Word[]>([]);
	const [problematicWordsIdx, setProblematicWordsIdx] = useState(0);
	const [currSet, setCurrState] = useState<string>("");

	const personalBtn: NextBtnProps = {
		label: "Personal",
		text: "Words marked for review",
		onClick: () => {
			setCurrState("Personal");
		},
	};
	const generalBtn: NextBtnProps = {
		label: "General",
		text: "Words that appear frequently in the GRE",
		onClick: () => {
			setCurrState("General");
		},
	};
	const problematicBtn: NextBtnProps = {
		label: "Problematic",
		text: "Words from problems answered incorrectly",
		onClick: () => {
			setCurrState("Problematic");
		},
	};
	const btnProps: NextBtnProps[] = [personalBtn, generalBtn, problematicBtn];

	// Get marked questions when the component mounts
	useEffect(() => {
		// Fetch data when component  is first mounted
		const fetchData = async () => {
			try {
				// Fetch initial data
				const [markedWords, generalWords, problematicWords] =
					await Promise.all([
						getMarkedWords(),
						getGeneralWords(),
						getProblematicWords(),
					]);
				// Update state with fetched data
				setMarkedWords(markedWords);
				setMarkedWordsIdx(0);
				setGeneralWords(generalWords);
				setGeneralWordsIdx(0);
				setProblematicWords(problematicWords);
				setProblematicWordsIdx(0);
			} catch (error) {
				console.error("Error fetching initial data:", error);
			}
		};
		fetchData();
	}, []);

	const displayCards = (words: Word[], wordsIdx: number, subTab: string) => {
		if (words && wordsIdx < words.length) {
			return (
				<>
					<Title tab={"Vocabulary"} subTab={subTab} />
					<div className='flex flex-col items-start w-full min-h-screen'>
						<RaisedBtn
							label={"Back"}
							color={"sky"}
							onClick={() => setCurrState("")}
							width={100}
						/>
						<CardCarousel words={words} />
					</div>
				</>
			);
		}
	};

	if (currSet == "") {
		return (
			<>
				<Title tab={"Verbal Reasoning"} subTab={"Vocabulary"} />
				<div className='flex flex-col space-y-8 justify-center items-center'>
					{btnProps.map((btnProp, idx) => (
						<div key={idx}>
							<Nextbtn btn={btnProp} />
						</div>
					))}
				</div>
			</>
		);
	} else if (currSet == "Personal") {
		return <>{displayCards(markedWords, markedWordsIdx, "Personal")}</>;
	} else if (currSet == "General") {
		return <>{displayCards(generalWords, generalWordsIdx, "General")}</>;
	} else {
		return (
			<>
				{displayCards(
					problematicWords,
					problematicWordsIdx,
					"Problematic"
				)}
			</>
		);
	}
};

export default Vocabulary;
