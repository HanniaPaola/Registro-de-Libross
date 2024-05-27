import BST from '../models/tree/BST.js';
import Libro from '../models/Libro.js';
import { bst } from './dependencies.js';

// Referencias a los elementos del DOM
const addBtn = document.getElementById("libros-btn");
const printBtn = document.getElementById("print-btn");
const searchBtn = document.getElementById("search-btn");
const searchIdBtn = document.getElementById("search-id-btn");
const minBtn = document.getElementById("min-btn");
const maxBtn = document.getElementById("max-btn");
const booksTableBody = document.querySelector("#books-table tbody");

// Función para agregar un libro al BST y actualizar la tabla
function addBook() {
    const id = document.getElementById("id").value;
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;

    if (id && titulo && autor) {
        const libro = new Libro(id, titulo, autor);
        const success = bst.add(libro);

        if (success) {
            alert("Registro exitoso");
            updateBooksTable();
        } else {
            alert("Falló el registro");
        }

        // Limpiar los campos del formulario
        document.getElementById("id").value = '';
        document.getElementById("titulo").value = '';
        document.getElementById("autor").value = '';
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

// Función para actualizar la tabla de libros
function updateBooksTable(books = null) {
    booksTableBody.innerHTML = ''; // Limpiar la tabla

    const libros = books || [];
    if (!books) {
        bst.traverseInOrder(libro => {
            libros.push(libro);
        });
    }

    libros.forEach(libro => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = libro.id;
        row.appendChild(idCell);

        const tituloCell = document.createElement('td');
        tituloCell.textContent = libro.titulo;
        row.appendChild(tituloCell);

        const autorCell = document.createElement('td');
        autorCell.textContent = libro.autor;
        row.appendChild(autorCell);

        booksTableBody.appendChild(row);
    });
}

// Eventos
addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBook();
});

printBtn.addEventListener("click", (event) => {
    event.preventDefault();
    updateBooksTable();
});

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const autor = document.getElementById("autor").value;
    const node = bst.search(autor);
    if (node) {
        alert("Libro encontrado: " + node.value.titulo);
        updateBooksTable([node.value]);
    } else {
        alert("Libro no encontrado");
        updateBooksTable([]);
    }
});

searchIdBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const id = document.getElementById("search-id").value;
    const node = bst.searchById(id);
    if (node) {
        alert("Libro encontrado: ID=" + node.value.id + ", Título=" + node.value.titulo + ", Autor=" + node.value.autor);
        updateBooksTable([node.value]);
    } else {
        alert("Libro no encontrado");
        updateBooksTable([]);
    }
});

minBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const node = bst.findMin();
    if (node) {
        alert("Libro con el menor título: " + node.value.titulo);
        updateBooksTable([node.value]);
    } else {
        alert("No hay libros en el árbol");
        updateBooksTable([]);
    }
});

maxBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const node = bst.findMax();
    if (node) {
        alert("Libro con el mayor título: " + node.value.titulo);
        updateBooksTable([node.value]);
    } else {
        alert("No hay libros en el árbol");
        updateBooksTable([]);
    }
});
