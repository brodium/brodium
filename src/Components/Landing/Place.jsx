import React from 'react';

function Place(props) {

	return (
		<>
			<h3>{props.place.name}</h3>
			<p>{props.place.formatted_address}</p>
		</>
	)
}

export default Place