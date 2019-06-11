SELECT c.company_id, chat_room_id, google_places_id
FROM company c
join chat_room cr on c.company_id = cr.company_id
ORDER BY c.company_id;