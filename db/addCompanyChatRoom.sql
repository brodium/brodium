insert into chat_room (
    title,
    description,
    company_id
) values (
    ${title},
    ${description},
    ${companyId}
)
returning *;