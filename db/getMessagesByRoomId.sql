select * from chat_messages
where chat_room_id = ${room}
order by time_stamp;