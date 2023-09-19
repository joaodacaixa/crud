var form = document.getElementById("meuform"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    contratousuario = document.getElementById("contrato"),
    nome = document.getElementById("nome"),
    valor = document.getElementById("valor"),
    sData = document.getElementById("sData"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("usuarioform"),
    modalTitle = document.querySelector("#usuarioform .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId

showInfo()


newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Cadastrar',
    modalTitle.innerText = "Preencher o formulário"
    isEdit = false
    imgInput.src = "./image/Profile Icon.webp"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("Arquivo muito grande!")
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails" id="dadoscontrato">
            <td>${index+1}</td>
            <td>${element.numerocontrato}</td>
            <td>${element.nometitular}</td>
            <td>${element.valorcontrato}</td>
            <td>${element.contratodata}</td>
	<td><img src="${element.picture}" alt="" width="50" height="50"></td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.numerocontrato}', '${element.nometitular}', '${element.valorcontrato}', '${element.contratodata}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.numerocontrato}', '${element.nometitular}', '${element.valorcontrato}', '${element.contratodata}')" data-bs-toggle="modal" data-bs-target="#usuarioform"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic, Contrato, Nome, Valor, sData){

    document.querySelector('#showcontrato').value = Contrato,
    document.querySelector("#shownome").value = Nome,
    document.querySelector("#showvalor").value = Valor,
    document.querySelector("#showsDate").value = sData,
    document.querySelector('.showImg').src = pic
}


function editInfo(index, pic, Contrato, Nome, Valor, Sdata){
    isEdit = true
    editId = index
    imgInput.src = pic
    contratousuario.value = Contrato
    nome.value = Nome
    valor.value =Valor
    sData.value = Sdata
    submitBtn.innerText = "Atualiza"
    modalTitle.innerText = "Atualizar  o Formulário"
}


function deleteInfo(index){
    if(confirm("Tem certeza que quer deletar o registro?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}

function limite() {
   
     
} 

function datamax(){
	dataatual = new Date();
	let dataselecionada =sData.value
	let hoje = dataatual.value;
	dataselecionada=new Date(dataselecionada);
	dataatual = new Date(dataatual);
    
    
	if(dataselecionada > dataatual)
	{
        
		confirm("Data não pode ser maior que data atual!");
		sData.value=formataData();
	}

}

function validanome(){
	var validanome=document.getElementById('nome').value;
	
	if(validanome.length < 3){
	    confirm("nome precisa ter mais de 3 letras!");
        nome.value="";
	}

}

form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        numerocontrato: contratousuario.value,
        nometitular: nome.value,
        valorcontrato: valor.value,
        contratodata: sData.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Cadastrar"
    modalTitle.innerHTML = "Preencha o Formulário"

    showInfo()

    form.reset()

    imgInput.src = "./image/Profile Icon.webp"  
    modal.style.display = "none"
    document.querySelector(".modal-backdrop").remove()
})

function chamabuscacontrato(){
    var contratodigitado=document.getElementById('buscaporcontrato').value;
    contratodigitado=contratodigitado.toLowerCase();
    var listadecontratos=document.getElementsByClassName('employeeDetails');
    
    for(i=0; i<listadecontratos.length;i++){
      if (!listadecontratos[i].innerHTML.toLocaleLowerCase().includes(contratodigitado,20)){
         listadecontratos[i].style.display='none';
        }else{
         listadecontratos[i].style.display='';
       }
    }
 }
    
 function chamabuscanome(){
    var nomedigitado=document.getElementById('buscapornome').value;
    nomedigitado=nomedigitado.toLowerCase();
    var listadecontratos=document.getElementsByClassName('employeeDetails');
    for(i=0; i<listadecontratos.length;i++){
      if (!listadecontratos[i].innerHTML.toLowerCase().includes(nomedigitado,20)){
         listadecontratos[i].style.display='none';
        }else{
         listadecontratos[i].style.display='';
       }
    }
 }
 function formataData(){
    let data = new Date(),
    dia = data.getDate().toString().padStart(2, '0'),
    mes = (data.getMonth()+1).toString().padStart(2, '0'),
    ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`;
}


