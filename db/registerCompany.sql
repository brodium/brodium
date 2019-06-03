insert into company (
	company_name,
	street,
	city,
	state,
	zip,
	google_places_id
) values (
	${company_name},
	${street},
	${city},
	${state},
	${zip},
	${google_places_id}
) returning company_id, company_name;