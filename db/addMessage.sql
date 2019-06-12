insert into chat_messages (author_name, rating, message, google_review, time_stamp, team_member_id, chat_room_id)
values (
	${author_name},
	${rating},
	${message},
	${google_review},
	${time_stamp},
	${team_member_id},
	${chat_room_id}
);