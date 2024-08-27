require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3001;
const multer = require("multer");
const cloudinary = require("./cloudinary");
const pool = require("./database/bd");
const cors = require("cors");
const upload = multer({ dest: "uploads/" }); // Carpeta temporal para archivos

app.use(express.json());

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:5173", // Ajusta este valor si es necesario
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("servidor ok");
});
// Ruta para crear un nuevo post
app.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const { file } = req;

    if (!file) {
      return res
        .status(400)
        .json({ error: "No se ha proporcionado ninguna imagen" });
    }

    const result = await cloudinary.uploader.upload(file.path);
    const imageUrl = result.secure_url;

    const resultDB = await pool.query(
      "INSERT INTO posts (title, description, image_url) VALUES (?, ?, ?)",
      [title, description, imageUrl]
    );

    res
      .status(201)
      .json({ message: "Post creado con éxito", id: resultDB.insertId });
  } catch (error) {
    console.error("Error creando el post:", error);
    res.status(500).json({ error: "Error al crear el post" });
  }
});

// Ruta para obtener todos los posts
app.get("/posts", async (req, res) => {
  try {
    const [rows] = [await pool.query("SELECT * FROM posts")];
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo posts:", error.message);
    res
      .status(500)
      .json({ error: "Error al obtener posts", details: error.message });
  }
});

// Ruta para obtener un post por ID
app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [post] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
    if (post.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(post[0]);
  } catch (error) {
    console.error("Error obteniendo el post:", error);
    res.status(500).json({ error: "Error al obtener el post" });
  }
});

// Ruta para editar un post por ID
app.put("/posts/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const { file } = req;

    let imageUrl = null;
    if (file) {
      // Subir imagen a Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      imageUrl = result.secure_url;
    }

    // Actualizar el post en la base de datos
    let updateQuery =
      "UPDATE posts SET title = ?, description = ? WHERE id = ?";
    const updateValues = [title, description, id];

    if (file) {
      updateQuery =
        "UPDATE posts SET title = ?, description = ?, image_url = ? WHERE id = ?";
      updateValues.unshift(imageUrl); // Añade la imagen URL al inicio de los valores
    }

    await pool.query(updateQuery, updateValues);

    res.json({ message: "Post actualizado con éxito" });
  } catch (error) {
    console.error("Error actualizando el post:", error);
    res.status(500).json({ error: "Error al actualizar el post" });
  }
});

// Ruta para eliminar un post por ID
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Asegúrate de que el ID sea un número
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Ejecutar la consulta para eliminar el post
    const result = await pool.query("DELETE FROM posts WHERE id = ?", [id]);

    // Imprimir el resultado para verificar su estructura
    console.log("Resultado de la consulta:", result);

    // Verificar la estructura del resultado
    if (result && result.affectedRows !== undefined) {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      return res.json({ message: "Post eliminado con éxito" });
    } else {
      throw new Error("Estructura de resultado inesperada");
    }
  } catch (error) {
    console.error("Error al eliminar el post:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor activado en el puerto ${PORT}`);
});
