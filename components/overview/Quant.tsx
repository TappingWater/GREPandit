import {
	renderInfo,
	renderInfoAsList,
	renderMapInfo,
} from "@/lib/helper/overview";
import { SearchBoxInfo } from "./SearchBox";
import Title from "../ui/Title";
import { useState } from "react";

/**
 * Component that is used to render the data required for the
 * quantitative overview sections.
 * This page allows users to search info regarding the quantitative
 * portion of the exam.
 */
const Quant = () => {
	const assessList = [
		"Basic mathematical skills",
		"Understanding of elementary mathematical concepts",
		"To model and solve problems using quantitative methods",
	];
	const typesMap = new Map<string, string[]>([
		[
			"Arithmetic",
			[
				"Properties and types of integers",
				"Divisibility, factorization, prime numbers",
				"Arithmetic operations, exponents, and roots",
				"Concepts such as estimation, percent, ratio, rate, absolute value, the number line, decimal representation, and sequences of numbers",
			],
		],
		[
			"Algebra",
			[
				"Operations with exponents",
				"Factoring and simplifying algebraic expressions",
				"Relations, functions, equations, and inequalities",
				"Solving linear and quadratic equations and inequalities",
				"Solving simultaneous equations and inequalities",
				"Setting up equations to solve word problems",
				"Coordinate geometry, including graphs of functions, equations, and inequalities, intercepts, and slopes of lines",
			],
		],
		[
			"Geometry",
			[
				"Parallel and perpendicular lines, circles, triangles—including isosceles, equilateral, and 30°-60°-90° triangles",
				"Quadrilaterals, other polygons, congruent and similar figures",
				"Three-dimensional figures, area, perimeter, volume, the Pythagorean theorem",
				"Angle measurement in degrees",
				"The ability to construct proofs is not tested",
			],
		],
		[
			"Data Analysis",
			[
				"Basic descriptive statistics, such as mean, median, mode, range, standard deviation, interquartile range, quartiles, and percentiles",
				"Interpretation of data in tables and graphs, such as line graphs, bar graphs, circle graphs, boxplots, scatterplots, and frequency distributions",
				"Elementary probability, such as probabilities of compound events and independent events",
				"Random variables and probability distributions, including normal distributions",
				"Counting methods, such as combinations, permutations, and Venn diagrams",
				"Typically taught in high school algebra courses or introductory statistics courses",
				"Inferential statistics is not tested",
			],
		],
	]);
	const assumptionsList = [
		"The mathematical content is based on high school level mathematics and statistics, not exceeding a second course in algebra level.",
		"Trigonometry, calculus, or other higher-level mathematics are not included.",
		"The mathematical symbols, terminology, and conventions are those that are standard at the high school level.",
		"All used numbers are real numbers.",
		"All figures are assumed to lie in a plane unless otherwise indicated.",
		"Geometric figures like lines, circles, triangles, and quadrilaterals are not necessarily drawn to scale.",
		"Lines shown as straight are actually straight, points on a line are in the order shown, and all geometric objects are in the relative positions shown.",
		"Coordinate systems like xy-planes and number lines are drawn to scale, therefore quantities in such figures can be read, estimated, or compared by sight or measurement.",
		"Graphical data presentations such as bar graphs, circle graphs, and line graphs are drawn to scale, so data values can be read, estimated, or compared by sight or measurement.",
	];

	// Strategy
	const stepsMap = new Map<string, string[]>([
		[
			"Understand the Problem",
			[
				"Read and understand the problem statement.",
				"Example: What is the probability of drawing a red card from a standard deck of 52 cards?",
				"Make sense of the given quantitative information.",
				"Example: Recognize that a standard deck has 52 cards and 26 of them are red.",
				"Consider formulas, definitions, or conditions given.",
				"Example: Know that probability is calculated as the favorable outcomes divided by the total outcomes.",
				"Identify your objectives for the problem.",
				"Example: Your objective is to find the probability of drawing a red card.",
			],
		],
		[
			"Carry Out a Strategy for Solving the Problem",
			[
				"Identify relevant mathematical facts for the solution.",
				"Example: Understand that there are 26 red cards in a deck of 52 cards.",
				"Explore a variety of problem-solving strategies.",
				"Example: In this case, calculating probability directly is the most straightforward strategy.",
				"Use the best strategy to solve the problem.",
				"Example: Calculate the probability by dividing 26 by 52.",
				"Be open to change strategy if needed.",
				"Example: If you made an error in the count of cards or calculation, correct it and re-calculate.",
			],
		],
		[
			"Check Your Answer",
			[
				"Ensure your answer is reasonable and accurate.",
				"Example: The probability you calculated is 0.5, which is reasonable as it's exactly half the deck.",
				"Confirm your answer addresses the question.",
				"Example: The question asked for the probability of drawing a red card, and you found that.",
				"Check the reasonableness of your answer.",
				"Example: As red cards are exactly half of the deck and probability must be a value between 0 and 1, a probability of 0.5 makes sense.",
				"Verify there are no computational or input errors.",
				"Example: Double-check your card counts and calculation to ensure accuracy.",
			],
		],
	]);
	const stratsMap = new Map<string, string[]>([
		[
			"Translate from Words to Arithmetic or Algebraic Representation",
			["Transform word problems into numeric or algebraic form."],
		],
		[
			"Translate from Words to a Diagram",
			["Create a visual representation from a word problem."],
		],
		[
			"Translate from Algebra to a Graph",
			["Plot an algebraic equation onto a graph."],
		],
		[
			"Translate from a Diagram to Arithmetic or Algebra",
			["Express relationships in a diagram using arithmetic or algebra."],
		],
		[
			"Simplify an Arithmetic or Algebraic Expression",
			["Reduce complex equations or expressions to simpler forms."],
		],
		[
			"Add to a Geometric Figure",
			["Add lines, points, or labels to a geometric figure."],
		],
		["Find a Pattern", ["Identify patterns in a complex problem."]],
		[
			"Search for a Mathematical Relationship",
			["Find connections between quantities, sets, or shapes."],
		],
		["Estimate", ["Make an educated guess about the answer."]],
		[
			"Trial and Error",
			["Test different solutions until the correct one is found."],
		],
		[
			"Divide into Cases",
			["Break down a complex problem into simpler cases."],
		],
		[
			"Adapt Solutions to Related Problems",
			["Apply solutions from similar problems to the current one."],
		],
		[
			"Determine Whether a Conclusion Follows from Information Given",
			["Check if a conclusion logically follows from given information."],
		],
		[
			"Determine What Additional Information Is Sufficient to Solve a Problem",
			[
				"Identify problems that cannot be solved directly.",
				"Determine what other information will help.",
				"List all the information given in the problem as well as info contained in a complete solution.",
				"Evaluate missing info (derive missing info from given info if possible).",
			],
		],
	]);

	// Basics
	const assess: SearchBoxInfo = {
		title: "What does this section assess?",
		tags: ["assess", "measure", "primarily test", "basics"],
		children: renderInfoAsList(assessList),
	};
	const types: SearchBoxInfo = {
		title: "What are the type of questions?",
		tags: ["arithmetic", "algebra", "geometry", "data analysis"],
		children: renderMapInfo(typesMap),
	};
	const assumptions: SearchBoxInfo = {
		title: "What are the assumptions that can be made for the quantitative section of the GRE exam?",
		tags: ["assumptions", "numbers", "figures", "guidelines"],
		children: renderInfoAsList(assumptionsList),
	};
	const steps: SearchBoxInfo = {
		title: "Basic steps for solving a quantitative problem:",
		tags: [
			"steps",
			"guidelines",
			"how to solve",
			"solve",
			"tips",
			"strategy",
		],
		children: renderMapInfo(stepsMap),
	};
	const strats: SearchBoxInfo = {
		title: "Strategies for solving a problem:",
		tags: [
			"strategies",
			"tips",
			"solving",
			"solve",
			"how to solve",
			"strategy",
		],
		children: renderMapInfo(stratsMap),
	};

	const infoMap = new Map<string, SearchBoxInfo[]>([
		["Overview", [assess, types, assumptions]],
		["Strategy", [steps, strats]],
	]);

	return (
		<>
			<Title tab={"Quantitative Reasoning"} subTab={"Overview"} />
			{renderInfo(infoMap)}
		</>
	);
};

export default Quant;
