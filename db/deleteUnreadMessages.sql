delete from unread_messages
where chat_room_id = ${chat_room_id} and team_member_id = ${team_member_id};