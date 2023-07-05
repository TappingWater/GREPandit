import { VerbalStat } from "@/lib/apitypes/VerbalTypes";
import React, { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	BarElement,
	BarController,
} from "chart.js";
import {
	insertSpacesBeforeCapitals,
	renderChartOptions,
} from "@/lib/helper/general";
ChartJS.register(
	BarElement,
	BarController,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
// set the chart's default font family
ChartJS.defaults.font.size = 12;
ChartJS.defaults.font.family = "'Roboto', sans-serif";

const AccuracyChart = ({ data }: { data: VerbalStat[] }) => {
	const chartRef = useRef(null);

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

		const grouped = filteredData.reduce(
			(acc: Record<string, { total: number; correct: number }>, cur) => {
				const type = insertSpacesBeforeCapitals(cur.type);
				if (!acc[type]) {
					acc[type] = { total: 0, correct: 0 };
				}
				acc[type].total += 1;
				if (cur.correct) {
					acc[type].correct += 1;
				}
				return acc;
			},
			{}
		);

		for (const [type, { total, correct }] of Object.entries(grouped)) {
			labels.push(type);
			dataset.push((correct / total) * 100);
		}

		return {
			labels,
			datasets: [
				{
					label: "Accuracy (%)",
					data: dataset,
					color: labelColor,
					backgroundColor: "rgba(14, 165, 233, 1)",
					borderColor: "rgba(7, 89, 133, 1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(56, 189, 248, 1)",
					hoverBorderColor: "rgba(14, 165, 233, 1)",
				},
			],
		};
	}, [data, selectedDifficulty]);

	const options = {
		responsive: true,
		scales: {
			x: {
				beginAtZero: true,
				color: labelColor, // Change font color here
				font: {
					family: "'Roboto', sans-serif",
					size: 12,
					weight: "500",
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value: any) {
						return `${value}%`;
					},
					color: labelColor,
				},
				color: labelColor, // Change font color here
				font: {
					family: "'Roboto', sans-serif",
					size: 12,
					weight: "500",
				},
				max: 100,
			},
		},
		plugins: {
			legend: {
				labels: {
					color: labelColor, // Change font color here
					font: {
						family: "'Roboto', sans-serif",
						size: 12,
					},
				},
			},
		},
		animation: {
			duration: 2000, // general animation time
		},
	};

	return (
		<>
			{renderChartOptions(
				"accuracy",
				difficulties,
				setSelectedDifficulty
			)}
			<Bar
				className='font-tabs text-sm'
				ref={chartRef}
				data={chartData}
				options={options}
			/>
		</>
	);
};

export default AccuracyChart;
