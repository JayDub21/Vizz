const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

const genres = [
  { id: 1, name: 'genre1' },
  { id: 2, name: 'genre2' },
  { id: 3, name: 'genre3' },
];

app.post('/api/genres', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(details[0].message);

  const course = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
