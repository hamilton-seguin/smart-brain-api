BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Tim', 'tim@gmail.com', 5, '2023-06-22');
INSERT into login (hash, email) values ('$2a$10$BxJvp2HaYgUDiWnTfMXKVu5fvez5gwTgtyP0hpCtOZmcSLXtkZ4oK', 'tim@gmail.com');

COMMIT;