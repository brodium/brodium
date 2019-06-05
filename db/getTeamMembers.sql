SELECT tm.team_member_id, firstname, lastname, isadmin, email
FROM team_members tm
JOIN user_login ul
ON tm.team_member_id = ul.team_member_id
WHERE company_id = ${co_id}
ORDER BY tm.team_member_id;