const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(cors()); 

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'node',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.json({ error: 'Error fetching data from the database' });
    } else {
      res.json(data);
    }
  });
});


app.post('/create', (req, res) => {
  const sql = "INSERT INTO student (name, email) VALUES (?, ?)";
  const values = [req.body.name, req.body.email];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Error creating student' });
    }
    console.log('Student created successfully:', data);
    return res.status(201).json({ success: true });
  });
});



app.put('/update/:id',(req,res)=>{
  const sql = 'UPDATE student SET `name`=?, `email`=? WHERE id=?';
  const id = req.params.id;

  db.query(sql,[req.body.name, req.body.email, id], (err,result)=>{
    if(err) return res.json("Error");
    return res.json(result);
  })
})

app.delete('/student/:id',(req, res) => {
  const sql = "DELETE FROM student WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id],(err,data) => {
    if(err) return res.json("Error");
    return res.json(data);
  })
})


const PORT = process.env.PORT || 1072;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
