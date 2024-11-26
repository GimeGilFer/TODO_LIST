// Función para cargar tareas desde LocalStorage
function cargarTareas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas.forEach(tarea => {
        agregarTareaDOM(tarea.texto, tarea.completada);
    });
}

// Función para guardar tareas en LocalStorage
function guardarTareas() {
    const tareas = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        const texto = li.querySelector('.task-text').textContent;
        const completada = li.classList.contains('done');
        tareas.push({ texto, completada });
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para añadir tareas al DOM
function agregarTareaDOM(textoTarea, completada = false) {
    // Crea un nuevo elemento <li> para la lista de tareas
    const li = document.createElement('li');

    // Crea un elemento <span> para el contenido de la tarea
    const contenidoTarea = document.createElement('span');
    contenidoTarea.textContent = textoTarea;
    contenidoTarea.classList.add('task-text'); // Añade una clase para estilos

    // Botón para marcar como completado
    const botonCompletado = document.createElement('button');
    botonCompletado.textContent = 'Hecho'; // Texto del botón
    botonCompletado.classList.add('done-btn'); // Clase para estilos
    botonCompletado.addEventListener('click', function () {
        li.classList.toggle('done'); // Alterna la clase 'done'
        guardarTareas(); // Actualiza LocalStorage
    });

    // Botón para editar la tarea
    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar'; // Texto del botón
    botonEditar.classList.add('edit-btn'); // Clase para estilos
    botonEditar.addEventListener('click', function () {
        const nuevoTextoTarea = prompt('Edita tu tarea:', contenidoTarea.textContent);
        if (nuevoTextoTarea !== null && nuevoTextoTarea.trim() !== '') {
            contenidoTarea.textContent = nuevoTextoTarea.trim(); // Actualiza el texto en el DOM
            guardarTareas(); // Actualiza LocalStorage
        } else {
            alert('El texto ingresado no es válido.'); // Maneja entradas inválidas
        }
    });

    // Botón para eliminar la tarea
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar'; // Texto del botón
    botonEliminar.classList.add('delete-btn'); // Clase para estilos
    botonEliminar.addEventListener('click', function () {
        li.remove(); // Elimina el elemento <li> de la lista
        guardarTareas(); // Actualiza LocalStorage
    });

    // Agrega los elementos al <li>
    li.appendChild(contenidoTarea);
    li.appendChild(botonCompletado);
    li.appendChild(botonEditar);
    li.appendChild(botonEliminar);

    // Marca como completada si corresponde
    if (completada) {
        li.classList.add('done');
    }

    // Agrega el <li> a la lista de tareas
    document.getElementById('task-list').appendChild(li);
}

// Evento para añadir una nueva tarea
document.getElementById('add-task').addEventListener('click', function () {
    const textoTarea = document.getElementById('new-task').value.trim();
    if (textoTarea === '') return; // Si no hay texto, no hace nada

    agregarTareaDOM(textoTarea); // Agrega la tarea al DOM
    guardarTareas(); // Guarda la tarea en LocalStorage
    document.getElementById('new-task').value = ''; // Limpia el campo de entrada
});

// Carga las tareas al iniciar la aplicación
document.addEventListener('DOMContentLoaded', cargarTareas);
