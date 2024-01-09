const formulario = document.querySelector("#formulario")
const templadeEstudiante = document.querySelector("#templadeEstudiante").content
const templadeProfesores = document.querySelector("#templadeProfesores").content
const cardsEstudiante = document.querySelector("#cardsEstudiante")
const cardsProfesores = document.querySelector("#cardsProfesores")

const contenedorEstudiantes = []
const contenedorProfesores = []


document.addEventListener("click",e=>{
    if (e.target.dataset.id) {
        if (e.target.matches(".btn-success")) {
            contenedorEstudiantes.map(a=>{
                if (a.id === e.target.dataset.id) {
                    a.setEstado = true
                }
                return a
            })
            Persona.pintarPersonaUI(contenedorEstudiantes, "estudiante")
    }else{
        contenedorEstudiantes.map(a=>{
                if (a.id === e.target.dataset.id) {
                    a.setEstado = false
                }
                return a
            })
            Persona.pintarPersonaUI(contenedorEstudiantes, "estudiante")
        }
        
    }
        // if(e.target.dataset.id ){
        //     console.log(e.target.matches(".btn-success"));
        //     if (e.target.matches(".btn-success")) {
                
        //         return a    
        //     })
                   

    

    
})


formulario.addEventListener("submit", (e)=>{
    e.preventDefault()

    const datos = new FormData(formulario)

    const [nombre, edad, carrera,opcion] = datos.values()


    if (opcion === "estudiante") {
        const estudiante = new Estudiante(nombre,edad,carrera)
        contenedorEstudiantes.push(estudiante)
        Persona.pintarPersonaUI(contenedorEstudiantes,opcion)
    }else {
        const profesor = new Profesor(nombre,edad,carrera)
        contenedorProfesores.push(profesor)
        Persona.pintarPersonaUI(contenedorProfesores)
    }



})

class Persona {
    constructor(nombre,edad,carrera){
        this.nombre = nombre
        this.edad = edad
        this.carrera = carrera
        this.id = this.generarId()
    }

    generarId(){
        const ramdom = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)
    
        return ramdom + fecha
    }

    static pintarPersonaUI(personas,tipo){
        if (tipo === "estudiante") {
            cardsEstudiante.textContent = ""
            const fragment = document.createDocumentFragment()
            personas.forEach(e=>{
                fragment.appendChild(e.agreagarNuevoEstudiante())
            })

            cardsEstudiante.appendChild(fragment)
        }else{
            cardsProfesores.textContent = ""
            const fragment = document.createDocumentFragment();
            personas.forEach(e=>{
                fragment.appendChild(e.agregarNuevoProfesor())
            })
            cardsProfesores.appendChild(fragment)
        }
    }
}

class Estudiante extends Persona{
    #estado = false
    #estudiante = "Estudiante"

     /**
     * @param {boolean} estado
     */
     set setEstado(estado){
        this.#estado = estado
    }
    get getEstudiate(){
        return this.#estudiante
    }

    agreagarNuevoEstudiante(){
        const clone = templadeEstudiante.cloneNode(true)
        clone.querySelector("h5 .text-primary").textContent = this.nombre
        clone.querySelector("#carrera").textContent = this.carrera
        clone.querySelector("p").textContent = this.edad

        if (this.#estado) {
            clone.querySelector(".badge").className = "badge btn-success"
            clone.querySelector(".badge").textContent = "Aprobado"
        }else{
            clone.querySelector(".badge").className = "badge btn-danger"
            clone.querySelector(".badge").textContent = "Reprobado"
        }

        clone.querySelector(".btn-success").dataset.id = this.id
        clone.querySelector(".btn-danger").dataset.id = this.id

        return clone

    }
}

class Profesor extends Persona{
    #profesor = "Profesor"

    agregarNuevoProfesor(){
        const clone = templadeProfesores.cloneNode(true)
        clone.querySelector("h5").textContent = this.nombre
        clone.querySelector("h6").textContent = this.#profesor
        clone.querySelector("#carrera").textContent = this.carrera
        clone.querySelector(".lead").textContent = this.edad;
        return clone
    }
}
