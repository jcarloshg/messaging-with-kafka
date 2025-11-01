CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE message (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    senderUUID TEXT NOT NULL CHECK (char_length(senderUUID) <= 50),
    content TEXT NOT NULL CHECK (char_length(content) <= 250),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);