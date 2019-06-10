insert into company (
	company_name,
	address,
	google_places_id
) values (
	${company_name},
	${address},
	${google_places_id}
) returning company_id, company_name, google_places_id;