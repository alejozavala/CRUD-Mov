let ingresos = [];
let egresos = [];

let cargarApp = () => {
  limpiarLista();
  cargarCabecero();
  obtenerEgreso();
  obtenerIngreso();
};

const limpiarLista = () => {
    const $egresobox = document.querySelector("#lista-egresos");
    $egresobox.innerHTML="";
    const $ingreso = document.querySelector("#lista-ingresos");
    $ingreso.innerHTML="";
}
// const $body = document.querySelector("body");
// $body.onload= cargarApp();

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;

  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = Math.round((totalEgresos() / totalIngresos()) * 100);
  let egresototal = totalEgresos();
  let ingresototal = totalIngresos();
  document.getElementById("presupuesto").innerHTML = "$ " + presupuesto;
  document.getElementById("egresos").innerHTML = "$ " + egresototal;
  document.getElementById("ingresos").innerHTML = "$ " + ingresototal;
  document.getElementById("porcentajeegreso").innerHTML =
    porcentajeEgreso + " %";
};

let obtenerEgreso = () => {
  const $egresobox = document.querySelector("#lista-egresos");
  for (let egreso of egresos) {
    $egresobox.innerHTML += `<div id="${egreso.id}" class="elemento limpiarEstilos">
                             <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${egreso.valor}</div>
            <div class="elemento_eliminar">
                <button id="deletee" class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
                    <ion-icon name="close-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
  }
};

let obtenerIngreso = () => {
  const $ingresobox = document.querySelector("#lista-ingresos");
  for (let ingreso of ingresos) {
    $ingresobox.innerHTML += ` <div id="${ingreso.id}" class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${ingreso.descripcion}</div>
      <div class="derecha limpiarEstilos">
          <div class="elemento_valor">${ingreso.valor}</div>
          <div class="elemento_eliminar">
              <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
                  <ion-icon name="close-outline"></ion-icon>
              </button>
          </div>
      </div>
  </div>`;
  }
};

let eliminarIngreso = (id) => {
  ingresos = ingresos.filter((ingreso) =>ingreso.id !== id);
  cargarApp();
};

let eliminarEgreso = (id) => {
  egresos = egresos.filter((egreso) =>egreso.id !== id);
  cargarApp();
};

let agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo= forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma['valor'];

    if(descripcion.value !== "" && valor.value!==""){
        if(tipo.value==="ingreso"){
            ingresos.push(new Ingreso(descripcion.value, +valor.value))
            cargarApp();
        }
        else if(tipo.value==="egreso"){
            egresos.push(new Egreso(descripcion.value, +valor.value))
            cargarApp();
        }
    }
}