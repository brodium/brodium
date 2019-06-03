insert into user_login (email, hash, team_member_id)
values (
	${email},
	${hash},
	${team_member_id}
) returning email;