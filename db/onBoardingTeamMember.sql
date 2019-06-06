select * from team_members t
join user_login u on u.team_member_id = t.team_member_id
where u.team_member_id = ${team_member_id}

-- update user_login
-- set hash = ${hash}
-- where team_member_id = ${team_member_id}