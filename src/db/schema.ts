import { sql } from '.';

export const createSchema = async () => {
    await sql`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    email VARCHAR (255)UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    age INT,
    role VARCHAR (30) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
    `;

    await sql`
    CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    food TEXT NOT NULL,
    price NUMERIC (10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
    `;
};
