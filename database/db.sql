drop table if exists users;
create table users
(
    id            serial primary key,
    username      text unique not null,
    password_hash text        not null
);

drop table if exists admins;
create table admins
(
    id            serial primary key,
    username      text unique not null,
    password_hash text        not null
);

drop table if exists movies;
create table movies
(
    id          serial primary key,
    name        text not null,
    rating      int,
    description text
);

drop table if exists cinemas;
create table cinemas
(
    id            serial primary key,
    name          text not null,
    address       text,
    seat_capacity int
);

drop table if exists movie_showings;
create table movie_showings
(
    id        serial primary key,
    id_cinema int,
    id_movie  int,
    from_date date,
    to_date   date
);

drop table if exists booked_performance_seats;
create table booked_performance_seats
(
    id          serial primary key,
    id_cinema   int,
    seat_number int,
    date        date,
    from_time   time,
    to_time     time,
    id_booking  int,
    money       int
);

drop table if exists bookings;
create table bookings
(
    id      serial primary key,
    id_user int,
    money   int
);

insert into movies(name, rating, description)
values ('Endgame', 10, 'Endgame'),
       ('IT 2', 9, 'IT 2'),
       ('Pikachu', 10, 'Pikachu');

insert into cinemas(name, address, seat_capacity)
values ('Nigamon Nguyễn Văn Cừ', '1 Nguyễn Văn Cừ Hồ Chí Minh', 10),
       ('Nigamon Giảng Võ', '2 Giảng Võ Hà Nội', 10);

insert into movie_showings(id_cinema, id_movie, from_date, to_date)
values (1, 1, '2019-01-01', '2020-01-01'),
       (2, 1, '2019-01-01', '2020-01-01'),
       (1, 2, '2019-01-01', '2020-01-01'),
       (2, 2, '2019-01-01', '2020-01-01');
