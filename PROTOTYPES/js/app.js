//constructor
function seguro(marca,year,tipo){
    this.marca = marca;
    this.tipo = tipo;
    this.year = year;
}

seguro.prototype.cotizarSeguro = function() {

let cantidad;
const base = 2000;

    switch(this.marca){
        case "1":
                cantidad = base * 1.15;
                break;
        case "2":
                cantidad = base * 1.05;
                break;

        case "3":
                cantidad = base * 1.30;
                break;

        default:
            break;
    }

    const diferencia = new Date().getFullYear() - this.year;

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    if(this.tipo === "basico")
    {
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad;

};

function UI() {}

UI.prototype.llenarOpcion = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

        const selectYear = document.querySelector("#year");

        for(let i = max; i > min; i--){
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            selectYear.appendChild(option);
        }
        
};

//alertar
UI.prototype.mostrarMensaje = (mensaje,tipo) => {
    const div = document.createElement("div");

    if(tipo === "error")
    {
        div.classList.add("error");
    }else
    {
        div.classList.add("correcto");
    }

    div.classList.add("mensaje","mt-10");
    div.textContent = mensaje;

    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div,document.querySelector("#resultado"));

    setTimeout(() => {
        div.remove();
    },3000);

};

UI.prototype.mostrarResultado = (total,seguro) => {

    const {marca,year,tipo} = seguro;
    let textoMarca;

    switch(marca){
        case "1":
                textoMarca = "moto";
                break;
        case "2":
            textoMarca = "carro";
                break;

        case "3":
            textoMarca = "camion";
                break;
        default:
            break;
    }
    const div = document.createElement("div");
    div.classList.add("mt-10");

    div.innerHTML = `
        <p class = "header" > Tu resumen </p>
        <p class = "font-bold" > Tipo: <span class = "font-normal">${textoMarca}</span></p>
        <p class = "font-bold" > Año: <span class = "font-normal">${year}</span></p>
        <p class = "font-bold" > Tipo de Servicio: <span class = "font-normal">${tipo}</span></p>
        <p class = "font-bold" > Total: $ <span class = "font-normal">${total}</span></p>
    `;

    const resultadoDiv = document.querySelector("#resultado");
    

    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block"; 

    setTimeout(() => {
        spinner.style.display = "none"; 
        resultadoDiv.appendChild(div);
    },3000);

};

//instanciar ui
const ui = new UI();


document.addEventListener("DOMContentLoaded", () => {
    ui.llenarOpcion();

});

eventListeners();

function eventListeners(){
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit",cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    const marca = document.querySelector("#marca").value;

    const year = document.querySelector("#year").value;

    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === "" || year === "" || tipo === "")
    {
        ui.mostrarMensaje("todos los campos son obligatorios","error");
        return;
    }

    ui.mostrarMensaje("cotizando","exito");

    const resultado = document.querySelector("#resultado div");

    if(resultado != null){
        resultado.remove();
    }

    const Seguro = new seguro(marca,year,tipo);
    const total = Seguro.cotizarSeguro();

    ui.mostrarResultado(total,Seguro);
}