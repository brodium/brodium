INSERT INTO team_members (firstname, lastname, isadmin, img, company_id)
VALUES (
  ${firstname},
  ${lastname},
  ${isadmin},
  ${img},
  ${company_id}
)
RETURNING team_member_id;
