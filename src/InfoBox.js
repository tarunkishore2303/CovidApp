import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
	return (
		<Card
			className={`infoBox ${active && "infoBox--selected"}  ${
				isRed && "infoBox--red"
			}`}
			onClick={props.onClick}
		>
			<CardContent>
				{/* TITLE */}
				<Typography className='infoBox__title' color='textSecondary'>
					{title}
				</Typography>
				{/*CASES*/}
				<h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
					{cases}
				</h2>
				{/*TOTAL CASES */}
				<Typography className='infoBox_total' color='textSecondary'>
					Total :{total}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default InfoBox;
