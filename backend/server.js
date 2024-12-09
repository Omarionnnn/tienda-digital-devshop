const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();
const port = 5000;


dotenv.config();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173' 
}));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});


db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos: ', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

app.use(express.json());

//registro de usuarios
app.post('/registro', (req, res) => {
    const { name, email, password } = req.body;

    // Validación de campos
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const query = 'INSERT INTO usuarios (name, email, pwd) VALUES (?, ?, ?)'; 

    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            return res.status(500).json({ message: 'Error al registrar el usuario' });
        }

        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
    });
});
    
// login de usuarios
app.post('/login', (req, res) => {
    console.log('Se ha hecho una solicitud POST a /login');
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ? AND pwd = ?';
    db.query(query, [email, password], (err, result) => {
        if (err) {
            console.error('Error al buscar en la base de datos:', err);
            return res.status(500).json({ message: 'Error al verificar las credenciales' });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = {
            userId: result[0].userUid,
            name: result[0].name, 
        };
        
        console.log('Usuario retornado:', user);
        res.status(200).json({
            message: 'Login exitoso',
            userId: user.userId,
            name: user.name,  
        });
        
    });
});

    // para guardar los comentarios
    app.post('/comentarios', (req, res) => {
        console.log('Solicitud POST a /comentarios recibida');
        const { usuario, mensaje } = req.body;
      
        if (!usuario || !mensaje) {
          return res.status(400).json({ message: 'El usuario y el mensaje son requeridos.' });
        }
      
        const query = "INSERT INTO comentarios (usuario, mensaje) VALUES (?, ?)";
        db.query(query, [usuario, mensaje], (err, result) => {
          if (err) {
            console.error('Error al insertar el comentario en la base de datos:', err);
            return res.status(500).json({ message: 'Error al guardar el comentario.' });
          }
          res.status(201).json({ message: 'Comentario guardado correctamente.' });
        });
      });
      

        // para obtener los comentarios
        app.get('/comentarios', (req, res) => {
            const query = 'SELECT * FROM comentarios ORDER BY fecha DESC';
          
            db.query(query, (err, result) => {
              if (err) {
                console.error('Error al obtener los comentarios:', err);
                return res.status(500).json({ message: 'Error al obtener los comentarios.' });
              }
              res.status(200).json(result); 
            });
          });


    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });