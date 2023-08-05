import  express from 'express';
import bodyParser from 'body-parser';
import db from './db';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/books', async (req, res) => {
  try {
    const books = await db.any('SELECT * FROM books');
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await db.one('SELECT * FROM books WHERE id = $1', req.params.id);
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Book not found' });
  }
});

app.post('/books', async (req, res) => {
  try {
    const { title, author } = req.body;
    const result = await db.one(
      'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING id',
      [title, author]
    );
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const { title, author } = req.body;
    await db.none('UPDATE books SET title = $1, author = $2 WHERE id = $3', [
      title,
      author,
      req.params.id
    ]);
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    await db.none('DELETE FROM books WHERE id = $1', req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
