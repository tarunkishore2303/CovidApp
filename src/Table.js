import React from "react";
import { prettyPrintStatForTotal } from "./util";
import "./Table.css";
function Table({ countries }) {
	return (
		<div className='table'>
			{countries.map(({ country, cases }) => {
				return (
					<tr>
						<td>{country}</td>
						<td>
							<strong>{prettyPrintStatForTotal(cases)}</strong>
						</td>
					</tr>
				);
			})}
		</div>
	);
}

export default Table;
