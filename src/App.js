import React, { useState, useEffect } from "react";
import {
	FormControl,
	MenuItem,
	Select,
	createMuiTheme,
	Card,
	CardContent,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import InfoBox from "./InfoBox";
import Map from "./Map";
import LineGraph from "./LineGraph";
import { sortData, prettyPrintStat, prettyPrintStatForTotal } from "./util";
import Table from "./Table";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";

const theme = createMuiTheme({
	palette: {
		type: "dark",
	},
});

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
	const [mapZoom, setMapZoom] = useState(4);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("cases");
	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
<<<<<<< HEAD
		const fetchData = () => {
			fetch("https://disease.sh/v3/covid-19/countries")
=======
		const fetchData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
>>>>>>> 189c91108cec361a6852e0440c11a9bfdd7ca1d5
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					const countries = data.map((country) => {
						return {
							name: country.country,
							value: country.countryInfo.iso2,
						};
					});
					const sortedData = sortData(data);
					setMapCountries(data);
					setTableData(sortedData);
					setCountries(countries);
				});
		};
		fetchData();
	}, []);

	const onCountryChange = (event) => {
		const countryCode = event.target.value;
		setCountry(countryCode);

		const url =
			countryCode === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);
				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
			});
	};

	// console.log("COUNTRY INFO", countryInfo);
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<div className='app__left'>
					<div className='app__header'>
						<h1>COVID 19 TRACKER</h1>
						<FormControl className='app__dropdown'>
							<Select
								variant='outlined'
								value={country}
								onChange={onCountryChange}
							>
								<MenuItem value='worldwide'>Worldwide</MenuItem>
								{countries.map((country) => {
									return (
										<MenuItem value={country.value}>{country.name}</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</div>
					<div className='app__stats'>
						<InfoBox
							isRed
							active={casesType === "cases"}
							onClick={(e) => setCasesType("cases")}
							title='Confirmed'
							cases={prettyPrintStat(countryInfo.todayCases)}
							total={prettyPrintStatForTotal(countryInfo.cases)}
						/>
						<InfoBox
							active={casesType === "recovered"}
							onClick={(e) => setCasesType("recovered")}
							title='Recovered'
							cases={prettyPrintStat(countryInfo.todayRecovered)}
							total={prettyPrintStatForTotal(countryInfo.recovered)}
						/>
						<InfoBox
							isRed
							active={casesType === "deaths"}
							onClick={(e) => setCasesType("deaths")}
							title='Deceased'
							cases={prettyPrintStat(countryInfo.todayDeaths)}
							total={prettyPrintStatForTotal(countryInfo.deaths)}
						/>
					</div>
					<React.Fragment>
						<Map
							countries={mapCountries}
							center={mapCenter}
							zoom={mapZoom}
							casesType={casesType}
						/>
					</React.Fragment>
				</div>

				<Card className='app__right'>
					<CardContent>
						<h3>Live Cases</h3>
						<Table countries={tableData} />
						<h3 className='app__graphTitle'>Worldwide new Cases</h3>
						<LineGraph casesTypes={casesType} className='app__graph' />
					</CardContent>
				</Card>
			</div>
			<Footer className='footer' />
		</ThemeProvider>
	);
}

export default App;
