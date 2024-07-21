/*
Paso 1: Crear la clase Alumno
*/

class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materiasInscritas = [];
        this.calificaciones = {};
    }

    inscribirMateria(materia) {
        this.materiasInscritas.push(materia);
    }

    asignarCalificacion(materia, calificacion) {
        this.calificaciones[materia] = calificacion;
    }

    obtenerPromedio() {
        let sum = 0;
        let count = 0;
        for (let materia in this.calificaciones) {
            sum += this.calificaciones[materia];
            count++;
        }
        return count === 0 ? 0 : sum / count;
    }
}

let alumnos = []; 

const saveBtn = document.querySelector('#btn')
const nuevoAlumnoForm = document.querySelector('#form')
const nombreInput = document.querySelector('#nombre')
const apellidoInput = document.querySelector('#apellido')
const edadInput = document.querySelector('#edad')
  
function onSave(e) {
  e.preventDefault();
  let primerNombre = nombreInput.value;
  let apellido = apellidoInput.value;
  let edad = edadInput.value;
  const nuevoAlumno = new Alumno(primerNombre, apellido, edad)
  console.log(nuevoAlumno)
  alumnos.push(nuevoAlumno);
  console.log(alumnos);
  
    renderStudentsTable()
  
    nombreInput.value = '';
    apellidoInput.value = '';
    edadInput.value = '';
}

function renderStudentsTable() {
  document.querySelector('#students-table').innerHTML = '';
  for (let i = 0; i < alumnos.length; i++) {
    const row = document.createElement('div');
    row.setAttribute('class', 'student-row');
    const innerHtml = `
      <div>${alumnos[i].nombre}</div>
      <div>${alumnos[i].apellido}</div>
      <div>${alumnos[i].edad}</div>
    `
    row.innerHTML = innerHtml
    document.querySelector('#students-table').appendChild(row);
  }
}

nuevoAlumnoForm.addEventListener('submit', onSave);


// Función para dar de alta un alumno
function altaAlumno(nombre, apellido, edad) {
    let alumno = new Alumno(nombre, apellido, edad);
    alumnos.push(alumno);
    guardarAlumnosEnLocalStorage();
    return alumno;
}

console.log(altaAlumno(nombre, apellido, edad));

// Función para guardar alumnos en LocalStorage
function guardarAlumnosEnLocalStorage() {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

// Función para cargar alumnos desde LocalStorage al inicio
function cargarAlumnosDesdeLocalStorage() {
    const almacenados = localStorage.getItem('alumnos');
    if (almacenados) {
        alumnos = JSON.parse(almacenados).map(a => new Alumno(a.nombre, a.apellidos, a.edad));
    }
}

// Función para inscribir un alumno a una materia
function inscribirAlumno(alumno, materia) {
    alumno.inscribirMateria(materia);
    guardarAlumnosEnLocalStorage();
}

// Función para asignar calificación a un alumno
function asignarCalificacion(alumno, materia, calificacion) {
    alumno.asignarCalificacion(materia, calificacion);
    guardarAlumnosEnLocalStorage();
}

// Función para crear un grupo y asignarle alumnos
function crearGrupo(nombreGrupo, alumnosDelGrupo) {
    let grupo = {
        nombre: nombreGrupo,
        alumnos: alumnosDelGrupo
    };
}

// Funciones para buscar alumnos por nombre y apellido
function buscarPorNombre(nombre) {
    return alumnos.filter(a => a.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

function buscarPorApellido(apellido) {
    return alumnos.filter(a => a.apellidos.toLowerCase().includes(apellido.toLowerCase()));
}

// Función para obtener promedio de un alumno
function obtenerPromedioAlumno(alumno) {
    return alumno.obtenerPromedio();
}

// Función para obtener promedio del grupo
function obtenerPromedioGrupo(grupo) {
    let sum = 0;
    grupo.alumnos.forEach(alumno => {
        sum += obtenerPromedioAlumno(alumno);
    });
    return grupo.alumnos.length === 0 ? 0 : sum / grupo.alumnos.length;
}

// Funciones para ordenar alumnos por calificación ascendente y descendente
function ordenarAlumnosAscendente() {
    return alumnos.slice().sort((a, b) => {
        return obtenerPromedioAlumno(a) - obtenerPromedioAlumno(b);
    });
}

function ordenarAlumnosDescendente() {
    return alumnos.slice().sort((a, b) => {
        return obtenerPromedioAlumno(b) - obtenerPromedioAlumno(a);
    });
}

cargarAlumnosDesdeLocalStorage(alumnos);