UPDATE team_members
SET firstname = ${firstname},
    lastname = ${lastname},
    isadmin = ${isadmin}
WHERE team_member_id = ${team_member_id};


UPDATE user_login
SET email = ${email}
WHERE team_member_id = ${team_member_id};

