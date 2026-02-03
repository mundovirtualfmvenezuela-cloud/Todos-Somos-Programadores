
            function ocultaventana(id) {
				if (document.getElementById(id).style.display == "none")
				{
				   document.getElementById(id).style.display = "block";
				}
				else
				{
                   document.getElementById(id).style.display = "none";
				}
            };
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
 // The maximum is exclusive and the minimum is inclusive
};
function pinta_tablamayor()
{
	    let Tam= document.getElementById("TamRifa").value;
        let grupos= document.getElementById("cartones").value;
		let por_fila= document.getElementById("inARow").value;
		let por_fila_en_el_carton= document.getElementById("inARowInside").value;
		

var miarray = new Array(Tam);
for (let j = 0; j< Tam; j++){
miarray[j]=j;
}
for (let j = 0; j< Tam*5; j++){
let uno=getRandomInt(0,Tam);
let dos=getRandomInt(0,Tam);
let tres=miarray[uno];
miarray[uno]=miarray[dos];
miarray[dos]=tres;
}

var cartones= new Array(grupos);
for (let j = 0; j< grupos; j++){
cartones[j]= [];
}

			    tabla="<table border='1'><tr>";
         for (let j = 1; j<= grupos; j++){
         if (j==1)
         {
         tabla+="<td></td><td>Carton "+j+"</td>";
         } else {
tabla+="<td>Carton "+j+"</td>";
         }

}
tabla+="</tr><tr><td> 1</td>";
				let esgrupo=0;
        let fila=2;
				for (let i = 0; i < Tam; i++) {
  
if (i<10 )    
{   tabla+="<td>"+miarray[i]+"</td>";
}
if (i>9 && i<100)
{
tabla+="<td>"+miarray[i]+"</td>";

}
if (i>=100)
{
tabla+="<td>"+miarray[i]+"</td>";
}
         cartones[esgrupo].push(miarray[i]); 
					esgrupo++;
					if (esgrupo==grupos)
					{
						tabla +="</tr><tr><td>"+fila+"</td>";
						esgrupo=0;
            fila++;
					}
				}
					tabla +="</tr></table>";

			
			// Vamos a pintar una tabla con todos los numeros de la rifa
			//document.getElementById("Tabla").innerHTML=tabla;



//Ordenar los numeros dentro de los cartones
for (let j = 0; j< grupos; j++){
	ordenado=0
	while (ordenado==0)
	{
		ordenado=1
		for (let i=0; i < cartones[j].length-1; i++)
		{
			if (cartones[j][i]>cartones[j][i+1])
			{
				temp = cartones[j][i];
				cartones[j][i]= cartones[j][i+1];
				cartones[j][i+1]= temp;
				ordenado=0;
			}
		}
	}
}
tabla2="<br /><br />";
tabla2+="<table id='ParaExcel'>";
let qtycartones=por_fila;
for (let j = 0; j< grupos; j++){
	 k=j+1;
	 if (qtycartones==por_fila)
	 {
		tabla2+="<tr><td  style='border:0px'>"
	 }
     //tabla2+= "CARTON "+k+"<br />";
	 //tabla2+="</td></tr><tr><td>";
	 tabla2+="<h3><table id='carton"+k+"' style='width:300px'><tr>";
	 fila=0;
	 for (let i=0; i < cartones[j].length; i++)
	 {
		 if (cartones[j][i]<10)
		 {
			tabla2+="<td><div> &nbsp;&nbsp;00"+cartones[j][i]+"</div> </td>";
			
		 }
		 if (cartones[j][i]>9 && cartones[j][i]<100 )
		 {
			tabla2+="<td><div> &nbsp;&nbsp;0"+cartones[j][i]+"</div> </td>";
		 }
		 if (cartones[j][i]>99)
		 {
			tabla2+="<td><div> &nbsp;&nbsp;"+cartones[j][i]+"</div> </td>";
		 }
	     fila++;
	     if (fila==por_fila_en_el_carton)
		 {
			 tabla2+="</tr><tr>";
			 fila=0;
		 }
     }
	 tabla2+="</table><button onclick=downloadImage('carton"+k+"','CARTON"+k+"')>CARTON "+k+"</button></h3><br />";
	 qtycartones--;
	 if (qtycartones>0)
	 {
        tabla2+="</td><td style='border:0px;'></td><td style='border:0px;'>";
	 }
	 else{
		qtycartones=por_fila;
        tabla2+="</td></tr>";
	 }
	 
}
tabla2+="</table>";

document.getElementById("Carton").innerHTML=tabla2;



			};
 
function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}
 
function downloadImage(contenido,nomarch){
    var content = document.getElementById(contenido);
  domtoimage.toBlob(content)
    .then(function(blob) {
      window.saveAs(blob, nomarch);
    });
}
 
