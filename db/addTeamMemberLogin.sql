INSERT INTO user_login (email, team_member_id)
VALUES (
  ${email},
  ${team_member_id}
);
-- RETURNING team_member_id;

SELECT tm.team_member_id, firstname, email
FROM team_members tm
JOIN user_login ul
ON tm.team_member_id = ul.team_member_id
WHERE tm.team_member_id = ${team_member_id};