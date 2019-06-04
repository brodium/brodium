select *
from user_login ul
join team_members tm 
on tm.team_member_id = ul.team_member_id
join company c
on tm.company_id = c.company_id
where ul.email = ${email};