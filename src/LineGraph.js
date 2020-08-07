import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: "index",
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format("+0,0");
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: "time",
				time: {
					format: "MM/DD/YY",
					tooltipFormat: "ll",
				},
			},
		],
		yAxes: [
			{
				gridLines: false,
				ticks: {
					callback: function (value, index, values) {
						return numeral(value).format("0a");
					},
				},
			},
		],
	},
};

// GRAPH COLORS

const casesTypeColors = {
	cases: {
		hex: "#cc1034",
		multiplier: 800,
		half_op: "rgba(204, 16, 52, 0.4)",
	},
	recovered: {
		hex: "#7dd71d",
		multiplier: 1200,
		half_op: "rgba(125,215,29,0.4)",
	},
	deaths: {
		hex: "#000",
		multiplier: 2000,
		half_op: "rgba(0,0,0,0.4)",
	},
};

function LineGraph({ casesTypes = "cases", ...props }) {
	const [data, setData] = useState({});
	const buildChartData = (data) => {
		const chartData = [];
		let lastDatapoint;
		for (let date in data.cases) {
			if (lastDatapoint) {
				const newDataPoint = {
					x: date,
					y: data[casesTypes][date] - lastDatapoint,
				};
				//console.log(newDataPoint);
				chartData.push(newDataPoint);
			}
			lastDatapoint = data[casesTypes][date];
		}
		return chartData;
	};

	useEffect(() => {
		const fetchData = async () => {
			await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					const chartData = buildChartData(data);
					setData(chartData);
				});
		};

		fetchData();
	});

	return (
		<div className={props.className}>
			{data?.length > 0 && (
				<Line
					options={options}
					data={{
						datasets: [
							{
								backgroundColor: casesTypeColors[casesTypes].half_op,
								borderColor: casesTypeColors[casesTypes].hex,
								data: data,
							},
						],
					}}
				/>
			)}
		</div>
	);
}

export default LineGraph;
