import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connectionString = 'postgres://username:1234@localhost:5432/books-crud';
const db = pgp(connectionString);

export default db;
