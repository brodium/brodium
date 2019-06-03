DELETE FROM user_login
WHERE team_member_id = ${team_member_id};

DELETE FROM team_members
WHERE team_member_id = ${team_member_id};