// Line chart for projected score over time y: projected score x : time able to set time periods
// Pie chart for different problems percentage of problems taken: by type, by difficulty, by competence
// Stacked bar chart y: accuracy x: difficulty stacks of type y: accuracy
// Box plot: Time spent
import { VerbalStat } from "@/lib/apitypes/VerbalTypes";
import { groupBy } from "lodash";
import Title from "../ui/Title";
import { userVbStats } from "@/pages/dashboard";
import { useAtom } from "jotai";
import AccuracyChart from "../charts/AccuracyChart";
import PieChart from "../charts/PieChart";
import ProgressChart from "../charts/ProgressChart";

function calculateScores(data: VerbalStat[]): Map<string, number> | null {
	// Define weights for difficulties
	const diffWeights = new Map<string, number>([
		["Easy", 0.2],
		["Medium", 0.4],
		["Hard", 0.4],
	]);
	// Define weights for question types
	const typeWeights = new Map<string, number>([
		["ReadingComprehension", 0.4],
		["TextCompletion", 0.35],
		["SentenceEquivalence", 0.25],
	]);
	// Group data by question type and difficulty
	const groupedByTypeAndDifficulty = groupBy(
		data,
		(d) => `${d.type} ${d.difficulty}`
	);
	// Check if there are enough groups
	if (Object.keys(groupedByTypeAndDifficulty).length < 9) {
		return null;
	}
	// Sort data by time
	data.sort(
		(a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
	);
	// Group data by day
	const groupedByDay = groupBy(
		data,
		(d) => new Date(d.time).toISOString().split("T")[0]
	);
	const minScore = 130;
	const maxScore = 170;
	const scoreRange = maxScore - minScore;
	let scores = new Map<string, number>();
	let prevScore = -1;
	let totalCorrectByTypeAndDifficulty = new Map<string, number>();
	let totalByTypeAndDifficulty = new Map<string, number>();
	for (const [date, questions] of Object.entries(groupedByDay)) {
		let dailyRange = 40;
		let dailyTotalCorrect = new Map<string, number>();
		let dailyTotal = new Map<string, number>();
		// Populate the number of questions that the user got correct
		// for that day
		for (const question of questions) {
			const key = `${question.type} ${question.difficulty}`;
			if (dailyTotal.has(key)) {
				dailyTotal.set(key, dailyTotal.get(key)! + 1);
			} else {
				dailyTotal.set(key, 1);
			}
			if (dailyTotalCorrect.has(key) && question.correct) {
				dailyTotalCorrect.set(key, dailyTotalCorrect.get(key)! + 1);
			} else if (question.correct) {
				dailyTotalCorrect.set(key, 1);
			}
		}
		diffWeights.forEach((diffWeight: number, difficulty: string) => {
			typeWeights.forEach((typeWeight: number, type: string) => {
				const key = `${type} ${difficulty}`;
				if (dailyTotal.has(key)) {
					const attemptedToday = dailyTotal.get(key)!;
					let correctToday = 0;
					let accuracyToday = 0.1;
					if (dailyTotalCorrect.has(key)) {
						correctToday = dailyTotalCorrect.get(key)!;
						accuracyToday = correctToday / attemptedToday;
					}
					let attemptedPrev = -1;
					let accuracyPrev = -1;
					if (totalByTypeAndDifficulty.has(key)) {
						attemptedPrev = totalByTypeAndDifficulty.get(key)!;
						totalByTypeAndDifficulty.set(
							key,
							attemptedPrev + attemptedToday
						);
						if (totalCorrectByTypeAndDifficulty.has(key)) {
							const correctPrev =
								totalCorrectByTypeAndDifficulty.get(key)!;
							accuracyPrev = correctPrev / attemptedPrev;
							totalCorrectByTypeAndDifficulty.set(
								key,
								correctPrev + correctToday
							);
						}
					}
					if (accuracyPrev != -1) {
						const prevRange =
							scoreRange * diffWeight * typeWeight * accuracyPrev;
						const todayRange =
							scoreRange *
							diffWeight *
							typeWeight *
							accuracyToday;
						let todayEffect = 0.8;
						if (attemptedToday * 2 < attemptedPrev) {
							todayEffect = (attemptedToday * 2) / attemptedPrev;
						}
						const newRange =
							todayRange * todayEffect +
							prevRange * (1 - todayEffect);
						dailyRange = dailyRange - prevRange + newRange;
					} else {
						const todayRange =
							scoreRange *
							diffWeight *
							typeWeight *
							accuracyToday;
						const maxPossibleRange =
							scoreRange * diffWeight * typeWeight;
						dailyRange = dailyRange - maxPossibleRange + todayRange;
					}
				}
			});
		});
		scores.set(date, minScore + dailyRange);
		prevScore = minScore + dailyRange;
	}
	return scores;
}

const VerbalStatUI = () => {
	const [verbalStats, setVerbalStats] = useAtom(userVbStats);
	const scores = calculateScores(verbalStats);

	return (
		<>
			<Title tab={"Stats"} />
			<div className='flex mb-4 flex-col md:flex-row items-center md:items-stretch justify-center space-y-4 md:space-y-0 space-x-0 md:space-x-4'>
				<div className='bg-white rounded text-slate-900 w-[90vw] md:w-[45vw] p-2 md:p-4'>
					<h3 className='font-heading text-base text-sky-500'>
						Projected Score
					</h3>
					{scores != null ? (
						<ProgressChart dataMap={scores} />
					) : (
						<p>Insufficient data for projection</p>
					)}
				</div>
				<div className='bg-white rounded text-slate-900 w-[90vw] md:w-[45vw] p-2 md:p-4'>
					<h3 className='font-heading text-base text-sky-500'>
						Problem Accuracy
					</h3>
					<AccuracyChart data={verbalStats}></AccuracyChart>
				</div>
			</div>
			<div className='bg-white rounded text-slate-900 w-[90vw] md:w-[45vw] p-2 md:p-4 m-auto'>
				<h3 className='font-heading text-base text-sky-500'>
					Problem Count
				</h3>
				<PieChart data={verbalStats}></PieChart>
			</div>
		</>
	);
};

export default VerbalStatUI;
