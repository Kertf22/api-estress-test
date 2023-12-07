
create table users (
    id serial primary key,
    username varchar(255) not null UNIQUE,
    password varchar(255) not null,
    name varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);