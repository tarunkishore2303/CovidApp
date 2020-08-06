import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
	cases: {
		hex: "#cc1034",
		multiplier: 800,
	},
	recovered: {
		hex: "#7dd71d",
		multiplier: 1200,
	},
	deaths: {
		hex: "#000",
		multiplier: 2000,
	},
};

export const sortData = (data) => {
	const sortedData = [...data];

	sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

	return sortedData;
};

// Exporting formatted Numbers
export const prettyPrintStat = (stat) => {
	if (stat !== undefined) {
		stat = stat.toString();
		var lastThree = stat.substring(stat.length - 3);
		var otherNumbers = stat.substring(0, stat.length - 3);
		if (otherNumbers !== "") lastThree = "," + lastThree;
		var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
		return `+${res}`;
	} else return 0;
};

export const prettyPrintStatForTotal = (stat) => {
	if (stat !== undefined) {
		stat = stat.toString();
		var lastThree = stat.substring(stat.length - 3);
		var otherNumbers = stat.substring(0, stat.length - 3);
		if (otherNumbers !== "") lastThree = "," + lastThree;
		var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
		return res;
	} else return 0;
};

// For creating choropleths

export const showDataOnMap = (data, casesType = "cases") => {
	console.log("FUNCTION RUNNING");
	// console.log(casesTypeColors[casesType]);
	return data.map((country) => (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.4}
			color={casesTypeColors[casesType].hex}
			fillColor={casesTypeColors[casesType].hex}
			radius={
				Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
			}
		>
			<Popup>
				<div className='info-container'>
					<div
						style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
						className='info-flag'
					/>
					<div className='info-name'>{country.country}</div>
					<div className='info-confirmed'>
						Cases : {prettyPrintStatForTotal(country.cases)}
					</div>
					<div className='info-recovered'>
						Recovered : {prettyPrintStatForTotal(country.recovered)}
					</div>
					<div className='info-deaths'>
						Deaths : {prettyPrintStatForTotal(country.deaths)}
					</div>
				</div>
			</Popup>
		</Circle>
	));
};
