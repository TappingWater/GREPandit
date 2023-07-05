import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	Tooltip,
	Legend,
	Title,
	CategoryScale,
} from "chart.js";
ChartJS.register(Tooltip, Legend, Title, CategoryScale);
ChartJS.defaults.font.size = 12;
ChartJS.defaults.font.family = "'Roboto', sans-serif";

const ProgressChart = ({ dataMap }: { dataMap: Map<string, number> }) => {
	// Convert map to two arrays - one for dates and one for values
	const dates = Array.from(dataMap.keys()).map((date) => date.slice(-4));
	const values = Array.from(dataMap.values());
	const labelColor = "rgba(15, 23, 42, 1)";

	const data = {
		labels: dates,
		datasets: [
			{
				label: "Projected Score",
				data: values,
				color: labelColor,
				backgroundColor: "rgba(14, 165, 233, 1)",
				borderColor: "rgba(7, 89, 133, 1)",
				borderWidth: 1,
				tension: 0.1,
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			x: {
				display: true,
				color: labelColor, // Change font color here
				font: {
					family: "'Roboto', sans-serif",
					size: 12,
					weight: "500",
				},
				ticks: {
					color: labelColor, // Change font color here
				},
			},
			y: {
				display: true,
				ticks: {
					color: labelColor, // Change font color here
				},
				color: labelColor, // Change font color here
				font: {
					family: "'Roboto', sans-serif",
					size: 12,
					weight: "500",
				},
				min: 130,
				max: 170,
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
	};

	return (
		<Line
			className='bg-white rounded p-4 text-slate-900'
			data={data}
			options={options}
		/>
	);
};

export default ProgressChart;
