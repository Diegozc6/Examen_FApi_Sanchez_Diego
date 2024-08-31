const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_proyectos'
});

db.connect(err => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
      return;
    }
    console.log('Conexión a la base de datos exitosa');
  });
  
  module.exports = db;
// Rutas de la API

// Obtener todos los empleados
app.get('/api/empleados', (req, res) => {
    db.query('SELECT * FROM empleados', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Crear un empleado
app.post('/api/empleados', (req, res) => {
    const { nombre, puesto } = req.body;
    db.query('INSERT INTO empleados (nombre, puesto) VALUES (?, ?)', [nombre, puesto], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, nombre, puesto });
    });
});

// Actualizar un empleado
app.put('/api/empleados/:id', (req, res) => {
    const { nombre, puesto } = req.body;
    db.query('UPDATE empleados SET nombre = ?, puesto = ? WHERE id = ?', [nombre, puesto, req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Eliminar un empleado
app.delete('/api/empleados/:id', (req, res) => {
    db.query('DELETE FROM empleados WHERE id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Repite las rutas para proyectos y tareas

// Obtener todos los proyectos
app.get('/api/proyectos', (req, res) => {
    db.query('SELECT * FROM proyectos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Crear un proyecto
app.post('/api/proyectos', (req, res) => {
    const { nombre, descripcion } = req.body;
    db.query('INSERT INTO proyectos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, nombre, descripcion });
    });
});

// Actualizar un proyecto
app.put('/api/proyectos/:id', (req, res) => {
    const { nombre, descripcion } = req.body;
    db.query('UPDATE proyectos SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Eliminar un proyecto
app.delete('/api/proyectos/:id', (req, res) => {
    db.query('DELETE FROM proyectos WHERE id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// Obtener todas las tareas

app.get('/api/tareas', (req, res) => {
    db.query('SELECT * FROM tareas', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Crear un tareas
// Obtener todas las tareas
app.get('/api/tareas', (req, res) => {
    db.query('SELECT * FROM tareas', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Obtener una tarea por su ID
app.get('/api/tareas/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM tareas WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Crear una nueva tarea
app.post('/api/tareas', (req, res) => {
    const { nombre, proyectoId, empleadoId } = req.body;
    db.query('INSERT INTO tareas (nombre, proyectoId, empleadoId) VALUES (?, ?, ?)', [nombre, proyectoId, empleadoId], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, nombre, proyectoId, empleadoId });
    });
});

// Actualizar una tarea existente
app.put('/api/tareas/:id', (req, res) => {
    const { nombre, proyectoId, empleadoId } = req.body;
    db.query('UPDATE tareas SET nombre = ?, proyectoId = ?, empleadoId = ? WHERE id = ?', [nombre, proyectoId, empleadoId, req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Eliminar una tarea
app.delete('/api/tareas/:id', (req, res) => {
    db.query('DELETE FROM tareas WHERE id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
