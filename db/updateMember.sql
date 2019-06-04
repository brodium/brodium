UPDATE team_members
SET firstname = ${firstname},
    lastname = ${lastname},
    isadmin = ${isadmin},
    img = ${img}
WHERE team_member_id = ${team_member_id};


UPDATE user_login
SET email = ${email}
WHERE team_member_id = ${team_member_id};