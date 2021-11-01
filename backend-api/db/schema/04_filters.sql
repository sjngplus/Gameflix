DROP TABLE IF EXISTS filters CASCADE;
CREATE TABLE filters(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    filter_settings JSON,
    CONSTRAINT user_filters UNIQUE(user_id, name)
);