import pgPromise from 'pg-promise';
const pgp = pgPromise();
const connectionString = 'postgres://postgres:1234@localhost:3003/books-crud';
const db = pgp(connectionString);
export default db;
