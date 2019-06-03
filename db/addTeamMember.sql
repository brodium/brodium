INSERT INTO team_members (firstname, lastname, isadmin, img, company_id)
VALUES (
  ${firstname},
  ${lastname},
  ${isadmin},
  ${img},
  ${company_id}
)
RETURNING team_member_id;


-- the problem is that I don't know how to populate both the team_members and user_login tables | user_login table needs to take in the team_member_id that's generated from above


-- INSERT INTO user_login (team_member_id)
-- SELECT
--   team_member_id
-- FROM team_members
-- WHERE max(team_member_id);


-- UPDATE user_login
-- SET email = ${email}
-- WHERE team_member_id = team_members.team_member_id;






-- INSERT INTO user_login (email)
-- VALUES (
--   ${email}
-- )
-- WHERE team_member_id = team_members.team_member_id;










