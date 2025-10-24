/*function crearCookie(nombre, valor, dias) {
	let expiracion="";
	if(dias){
        let fecha=new Date();
        fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
        expiracion="; expires="+fecha.toUTCString();
	}
	document.cookie=nombre+"="+valor+"; "+expiracion+"; path=/";
}


//Leer una cookie
function leerCookie(nombre) {
	let cookies=document.cookie.split("; ");
	for (let cookie of cookies) {
        let [clave, valor]=cookie.split("=");
        if(clave==nombre)
            return valor;
	}
	return null; // Si no existe
}*/

//Crear una cookie
function crearCookie(nombre, valor, dias) {
    let expiracion;
    if(dias>0){
        let fecha=new Date();
        fecha.setTime(fecha.getTime()+(dias*24*60*60*1000));
        expiracion="; expires="+fecha.toUTCString();
        document.cookie=nombre+"="+valor+"; "+expiracion+"; path=/";
    }else{
        document.cookie=nombre+"="+valor+"; path=/";
    }
}

//Leer una cookie
function leerCookie(nombre) {
    //Le mete un punto y coma a cada cookie
    let cookies=document.cookie.split("; ");
    let valorCookie=0;
    //cookie es nombre=Juan
    cookies.forEach(cookie => {
        //ahora es i=nombre / = / valor=Juan
        let [i, valor]=cookie.split("=");
        //Si es igual el nombre (i del array) a nombre (nombre introducido)
        if(i.trim()==nombre)
            //Se mete el valor del array en valorCookie
            valorCookie=valor;
    });

    //Se devuelve si esta o no
    if(valorCookie==0){
        return null; //Si no existe
    }else{
        return valorCookie;
    }
}

//Eliminar una cookie
function eliminarCookie(nombre) {
    //Debe de ser la fecha del pasado para que borre
    document.cookie=nombre+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

//Contar Visitas
function contadorVisitas(){
    let visitas=leerCookie("Visitas");;

    if(visitas){    
        visitas++;
        crearCookie("Visitas", visitas, 10);
        return visitas;
    }else{
        crearCookie("Visitas", 1, 10);
        return 1;
    }
}

//Crear
document.getElementById("crear").addEventListener("click", () => {
    let nombreCookie=document.getElementById("nombre").value;
    let valorCookie=document.getElementById("valor").value;
    let dias=parseInt(document.getElementById("dias").value, 10); //El 10 es para que sea un decimal siempre

    if(nombreCookie && valorCookie){
        crearCookie(nombreCookie, valorCookie, dias);
        let numVisita=contadorVisitas(nombreCookie, valorCookie);

        if(numVisita<=1){
            if(dias){
                document.getElementById("resultado").textContent='Cookie "'+nombreCookie+'" creada con valor "'+valorCookie+'" y expiración en '+dias+' días. ¡Bienvenido, esta es tu visita '+numVisita+'!';
            }else{
                document.getElementById("resultado").textContent='Cookie "'+nombreCookie+'" creada con valor "'+valorCookie+'" no hay días por lo tanto desaparecerá al recargar la página. ¡Bienvenido, esta es tu visita '+numVisita+'!';
            }
        }else{
            if(dias){
                document.getElementById("resultado").textContent='Cookie "'+nombreCookie+'" creada con valor "'+valorCookie+'" y expiración en '+dias+' días. ¡Bienvenido de nuevo, esta es tu visita '+numVisita+'!';
            }else{
                document.getElementById("resultado").textContent='Cookie "'+nombreCookie+'" creada con valor "'+valorCookie+'" no hay días por lo tanto desaparecerá al recargar la página. ¡Bienvenido de nuevo, esta es tu visita '+numVisita+'!';
            }
        }
    }else{
        document.getElementById("resultado").textContent="Por favor, completa el nombre y el valor.";
    }
});

//Leer
document.getElementById("leer").addEventListener("click", () => {
    let nombreCookie=document.getElementById("nombre").value;
    if(nombreCookie){
        let valorCookie=leerCookie(nombreCookie);
        if(valorCookie){
            document.getElementById("resultado").textContent='Cookie "'+nombreCookie+'" tiene el valor "'+valorCookie+'".';
        }else{
            document.getElementById("resultado").textContent='Cookie "'+nombreCookie+'" no encontrada.';
        }
    }else{
        document.getElementById("resultado").textContent="Por favor, ingresa el nombre de la cookie para buscar.";
    }
});

//Eliminar
document.getElementById("eliminar").addEventListener("click", () => {
    let nombreCookie=document.getElementById("nombre").value;
    if(nombreCookie){
        eliminarCookie(nombreCookie);
        document.getElementById("resultado").textContent='Cookie "'+nombreCookie+'" eliminada.';
    }else{
        document.getElementById("resultado").textContent="Por favor, ingresa el nombre de la cookie para eliminar.";
    }
});

let terminos;

do{
    terminos=prompt("¿Aceptas los Términos y Condiciones? (s/n)");
}while(terminos!="s");