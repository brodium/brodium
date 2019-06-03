insert into team_members (firstname, lastname, isadmin, img, company_id)
values (
	${firstname},
	${lastname},
	${isadmin},
	${img},
	${company_id}
)returning *;