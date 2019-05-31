CREATE TABLE company (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(80),
    street VARCHAR(150),
    city VARCHAR(50),
    state VARCHAR(2),
    zip VARCHAR(5),
    google_places_id TEXT
);

CREATE TABLE team_members (
    team_member_id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    isAdmin BOOLEAN,
    img TEXT,
    company_id INTEGER REFERENCES company(company_id)
);

CREATE TABLE user_login (
    login_id SERIAL PRIMARY KEY,
    email TEXT,
    hash TEXT,
    team_member_id INTEGER REFERENCES team_members(team_member_id)
);

CREATE TABLE chat_room (
    chat_room_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(50),
    company_id INTEGER REFERENCES company(company_id)
);

CREATE TABLE chat_messages (
    chat_message_id SERIAL PRIMARY KEY,
    message TEXT,
    google_review TEXT,
    time_stamp TEXT,
    team_member_id INTEGER REFERENCES team_members(team_member_id),
    chat_room_id INTEGER REFERENCES chat_room(chat_room_id)
);

CREATE TABLE room_members (
    room_member_id SERIAL PRIMARY KEY,
    team_member_id INTEGER REFERENCES team_members(team_member_id),
    chat_room_id INTEGER REFERENCES chat_room(chat_room_id)
);