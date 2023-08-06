import pgPromise from 'pg-promise';
const pgp = pgPromise();
const connectionString = 'postgres://postgres:1234@localhost:5432/books-crud';
const db = pgp(connectionString);
export default db;
