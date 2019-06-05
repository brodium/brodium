update chat_room
set title = ${title},
    description = ${description}
where chat_room_id = ${room_id}
returning *;