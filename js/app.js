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
  if (nickInput.value==="" || nameInput.value==="" || surnameInput.value===""
        || passwordInput.value==="" || dobInput.value==="") {
        error.innerText="Wypełnij wszystkie pola!";
  }else if (passwordInput.value.length<6) {
      error.innerText="Hasło musi mieć przynajmniej 6 znaków";
  }

  else{
        error.innerText='';


  let nickFromInput = nickInput.value;
  let nameFromInput = nameInput.value;
  let surnameFromInput = surnameInput.value;
  let passwordFromInput = passwordInput.value;
  let dobFromInput = dobInput.value;
  let groupFromInput =groupInput.value;
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



//function renderUsers-> start function

function renderUsers(user) {
  let newListElement= document.createElement("li");
//create new li
let nick =  document.createElement("span");
nick.innerText=user.nick;
//create new span with nick user
  let name =  document.createElement("span");
  name.innerText=user.name;
//create new span with name user
  let surname =  document.createElement("span");
  surname.innerText=user.surname;
  //create new span with surname user
  let password =  document.createElement("span");
  password.innerText="XXX";
  //create new span with password user
  let dob =  document.createElement("span");
  dob.innerText=user.dob;
  //create new span with dob user
  let group =  document.createElement("span");
  group.innerText=user.group;
  //create new span with group user



  newListElement.dataset.id=user.id;
//add id to new li
  nick=newListElement.appendChild(nick);
  name=newListElement.appendChild(name);
  surname=newListElement.appendChild(surname);
  password=newListElement.appendChild(password);
  dob=newListElement.appendChild(dob);
  group=newListElement.appendChild(group);
//add 2xh3 to li
  newListElement=userList.appendChild(newListElement);
// add li to ul
}












});
