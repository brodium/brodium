import React from 'react';

function Place(props) {

	return (
		<div className="co-search-result">
			<h3>{props.place.name}</h3>
			<p>{props.place.formatted_address}</p>
		</div>
	)
}

export default Place