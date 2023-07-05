import { VerbalStat } from "@/lib/apitypes/VerbalTypes";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	Tooltip,
	Legend,
	Title,
	ArcElement,
	CategoryScale,
} from "chart.js";
import { renderChartOptions } from "@/lib/helper/general";
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale);

// set the chart's default font family
ChartJS.defaults.font.size = 12;
ChartJS.defaults.font.family = "'Roboto', sans-serif";

const PieChart = ({ data }: { data: VerbalStat[] }) => {
	// Define the state to hold the selected difficulty
	const [selectedDifficulty, setSelectedDifficulty] = useState("All");
	const difficulties = ["All", "Easy", "Medium", "Hard"];
	const labelColor = "rgba(15, 23, 42, 1)";

	const chartData = React.useMemo(() => {
		const labels = [];
		const dataset = [];

		// Filter data based on the selected difficulty
		const filteredData =
			selectedDifficulty === "All"
				? data
				: data.filter((item) => item.difficulty === selectedDifficulty);

		// Calculate the count of each problem type
		const problemTypeCount = filteredData.reduce(
			(acc: Record<string, number>, cur) => {
				if (!acc[cur.type]) acc[cur.type] = 0;
				acc[cur.type]++;
				return acc;
			},
			{}
		);

		for (const [type, count] of Object.entries(problemTypeCount)) {
			labels.push(type);
			dataset.push(count);
		}

		return {
			labels,
			datasets: [
				{
					label: "Number of problems",
					data: dataset,
					color: labelColor,
					backgroundColor: [
						"rgba(14, 165, 233, 1)",
						"rgba(139, 92, 246, 1)",
						"rgba(236, 72, 153, 1)",
					],
					hoverOffset: 4,
				},
			],
		};
	}, [data, selectedDifficulty]);

	const options = {
		responsive: true,
		animation: {
			duration: 2000, // general animation time
		},
		plugins: {
			legend: {
				labels: {
					usePointStyle: true,
				},
			},
			tooltip: {
				callbacks: {
					label: (context: any) =>
						`${context.label}: ${context.parsed}`,
				},
			},
		},
	};

	return (
		<div className='bg-white rounded p-4 text-slate-900'>
			{renderChartOptions(
				"problem-type",
				difficulties,
				setSelectedDifficulty
			)}
			<div className='w-[250px] h-[250px] md:w-[350px] md:h-[350px] mr-auto ml-auto'>
				<Pie data={chartData} options={options} />
			</div>
		</div>
	);
};

export default PieChart;
