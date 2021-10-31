DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    steam_app_id INT NOT NULL,
    CONSTRAINT user_favs UNIQUE(user_id, steam_app_id)
);