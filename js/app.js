$(function functionName() {

const apiUrl="http://localhost:3000/users";
const userList=document.querySelector(".user_list");
const addBtn=document.querySelector("#addUsr");

const nickInput=document.querySelector(".get_nick");
const nameInput=document.querySelector(".get_name");
const surnameInput=document.querySelector(".get_surname");
const passwordInput=document.querySelector(".get_password");
const dobInput=document.querySelector(".get_dob");
const groupInput=document.querySelector(".get_group");
const error=document.querySelector(".error");



//event on button -> add to database user-> star function
addBtn.addEventListener("click",function(event) {
  event.preventDefault();
  //check all inputs, they can't by empty
  if (nickInput.value==="" || nameInput.value==="" || surnameInput.value===""
        || passwordInput.value==="" || dobInput.value==="") {
        error.innerText="Wypełnij wszystkie pola!";
  }else if (passwordInput.value.length<6) {
      error.innerText="Hasło musi mieć przynajmniej 6 znaków";
  }//password must to have min 6 signs

  else{
        error.innerText='';

// take value of inputs
  let nickFromInput = nickInput.value;
  let nameFromInput = nameInput.value;
  let surnameFromInput = surnameInput.value;
  let passwordFromInput = passwordInput.value;
  let dobFromInput = dobInput.value;
  let groupFromInput =groupInput.value;
  //create new object
  var newUser = {
    nick:nickFromInput,
    name:nameFromInput,
    surname:surnameFromInput,
    password:passwordFromInput,
    dob:dobFromInput,
    group:groupFromInput,
  }
    $.ajax({
      type:"POST",
      url:apiUrl,
      data:newUser,
      dataType:"json"
    }).done(function (response) {
        renderUsers(response);
    }).fail(function (error) {
        console.log("error form POST");
  });

}//end of else
});
//event on button -> add to database user-> end of function


//event on button DELETE

//   $("body").on("click",".delete",function (event) {
//   let trToDel = $(this).parent().parent();
//   let clickedId =trToDel.attr('data-id');
//
//   $.ajax({
//     type:"DELETE",
//     url:apiUrl+'/'+clickedId,
//     dataType:"json"
//   }).done (function (response) {
//
//     trToDel.remove();
//   }).fail(function (error) {
//     console.log("error from DELETE");
//   })
//
// });






















//function renderUsers-> start function

function renderUsers(user) {
  let newTrElement= document.createElement("tr");
//create new li


//create 2 buttons
let removeBtn = document.createElement("button");
let editBtn = document.createElement("button");


removeBtn.classList.add("delete");//add "delete" class
removeBtn.innerText="Delete";
editBtn.classList.add("edit");//add "edit" class
editBtn.innerText="Edit";

let tdBtn1 =document.createElement("td");
let tdBtn2 =document.createElement("td");


let nick =  document.createElement("td");
nick.classList.add("nick");
nick.innerText=user.nick;

//create new span with nick user
  let name =  document.createElement("td");
  name.innerText=user.name;
//create new span with name user
  let surname =  document.createElement("td");
  surname.innerText=user.surname;
  //create new span with surname user
  let password =  document.createElement("td");
  password.innerText="XXX";
  //create new span with password user
  let dob =  document.createElement("td");
  dob.innerText=user.dob;
  //create new span with dob user
  let group =  document.createElement("td");
  group.innerText=user.group;
  //create new span with group user



  newTrElement.dataset.id=user.id;
//add id to new tr
  nick=newTrElement.appendChild(nick);
  name=newTrElement.appendChild(name);
  surname=newTrElement.appendChild(surname);
  password=newTrElement.appendChild(password);
  dob=newTrElement.appendChild(dob);
  group=newTrElement.appendChild(group);
//add 6xtd to tr

  editBtn=tdBtn1.appendChild(editBtn);
  removeBtn=tdBtn2.appendChild(removeBtn);
  tdBtn1=newTrElement.appendChild(tdBtn1);
  tdBtn2=newTrElement.appendChild(tdBtn2);

  newTrElement=userList.appendChild(newTrElement);
// add td to tr


/// event on removeBtn to delete clicked row.
removeBtn.addEventListener("click",function (event) {
  let trToDel = this.parentElement.parentElement;
  let clickedDelId= trToDel.getAttribute('data-id');
  $.ajax({
    type:"DELETE",
    url:apiUrl+'/'+clickedDelId,//go to clicked row
    dataType:"json"
  }).done (function (response) {
    // remove table row for table
    trToDel.parentNode.removeChild(trToDel);
  }).fail(function (error) {
    console.log("error from DELETE");
  });
});//end of event removeBtn to delete



$("body").on("click",".edit",function () {
  let $trToEdit = $(this).parent().parent();
  let clickedEditId = $trToEdit.data("id");


  let oldNick = $trToEdit.find("td").text();
  $trToEdit.addClass("editable");
  // $trToEdit.children().hide();

  let $nickInput = $("<input>");
  $nickInput.val(oldNick);
  console.log($trToEdit);
  $trToEdit.append($nickInput);
})









}//end of click




function loadUser() {

  $.ajax({
    type:"GET",
    url:apiUrl,
    dataType:"json"
  }).done(function (response) {
    for (var i = 0; i < response.length; i++) {
      renderUsers(response[i]);
    }
  }).fail(function (error) {
    console.log("error from loadUser");
  })
}
loadUser();









});
