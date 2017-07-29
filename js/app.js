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
  // event.preventDefault();

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
nickFromInput.value==="s"
}//end of else
});
//event on button -> add to database user-> end of function





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
nick.innerText=user.nick;
nick.classList.add("nick");

//create new span with nick user
  let name =  document.createElement("td");
  name.innerText=user.name;
  name.classList.add("name");
//create new span with name user
  let surname =  document.createElement("td");
  surname.innerText=user.surname;
  surname.classList.add("surname");
  //create new span with surname user
  let password =  document.createElement("td");
  password.innerText="XXX";
  password.classList.add("password");
  //create new span with password user
  let dob =  document.createElement("td");
  dob.innerText=user.dob;
  dob.classList.add("dob");
  //create new span with dob user
  let group =  document.createElement("td");
  group.innerText=user.group;
  group.classList.add("group");
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
}//end of renderUsers
$("body").on("click",".edit",function () {
  let $trToEdit = $(this).parent().parent();
  let clickedEditId = $trToEdit.data("id");
  console.log(clickedEditId);
  let $oldNick = $trToEdit.find(".nick").text();
  let $oldName = $trToEdit.find(".name").text();
  let $oldSurname = $trToEdit.find(".surname").text();
  let $oldPassword = $trToEdit.find(".password").text();
  let $oldDob = $trToEdit.find(".dob").text();
  let $oldGroup = $trToEdit.find(".group").text();

  $trToEdit.addClass("editable");
  $trToEdit.children().hide();

  $tdToIn1 = $("<td>");
  $tdToIn2 = $("<td>");
  $tdToIn3 = $("<td>");
  $tdToIn4 = $("<td>");
  $tdToIn5 = $("<td>");
  $tdToIn6 = $("<td>");


  let $nickInput = $("<input>");
  $nickInput.val($oldNick);

  let $nameInput = $("<input>");
  $nameInput.val($oldName);

  let $surnameInput = $("<input>");
  $surnameInput.val($oldSurname);

  let $passwordInput = $("<input>");
  $passwordInput.val($oldPassword);
  let $passwordInputsecond = $("<input>");
  $passwordInputsecond.attr("placeholder", "powtórz hasło");

  let $dobInput = $("<input>").attr('type','date');
  $dobInput.addClass("dob_edit");
  $dobInput.val($oldDob);

  let $groupInput = $("<select>");
  let $groupInputsel1 = $('<option>').text("group 1");
  let $groupInputsel2 = $('<option>').text("group 2");
  $groupInput.append($groupInputsel1);
  $groupInput.append($groupInputsel2);
  $groupInput.val($oldGroup);

  let $submitButton = $("<button>");
  $submitButton.text("Save");

  //add inputs to new td
  $tdToIn1.append($nickInput);
  $tdToIn2.append($nameInput);
  $tdToIn3.append($surnameInput);
  $tdToIn4.append($passwordInput);
  $tdToIn4.append($passwordInputsecond);
  $tdToIn5.append($dobInput);
  $tdToIn6.append($groupInput);

  //add tds to tr.editable
  $trToEdit.append($tdToIn1);
  $trToEdit.append($tdToIn2);
  $trToEdit.append($tdToIn3);
  $trToEdit.append($tdToIn4);
  $trToEdit.append($tdToIn5);
  $trToEdit.append($tdToIn6);
  $trToEdit.append($submitButton);


  $submitButton.on("click", function() {
    let nickFromInputSave = $nickInput.val();
    let nameFromInputSave = $nameInput.val();
    let surnameFromInputSave = $surnameInput.val();
    let passwordFromInputSave = $passwordInput.val();
    let dobFromInputSave = $dobInput.val();
    let groupFromInputSave = $groupInput.val();

    if (nickFromInputSave==="" || nameFromInputSave===""
        || surnameFromInputSave==="" || passwordFromInputSave===""
        || dobFromInputSave==="") {
          $(".error").text("Wypełnij wszystkie pola!");
    }else if (passwordFromInputSave.length<6) {
        $(".error").text("Hasło musi mieć przynajmniej 6 znaków");
    }else if (passwordFromInputSave!==$passwordInputsecond.val()) {
        $(".error").text("Wpisz dwa razy takie samo hasło");
    }
    else{
        error.innerText='';
        let: editUser = {
          nick:nickFromInputSave,
          name:nameFromInputSave,
          surname:surnameFromInputSave,
          password:passwordFromInputSave,
          dob:dobFromInputSave,
          group:groupFromInputSave
      }

      $.ajax({
        type:"PUT",
        url: apiUrl +"/"+clickedEditId,
        data: editUser,
        dataType:'json'
      }).done(function (response) {
          //show TR and remove class edit
          $trToEdit.children().show();
          $trToEdit.removeClass("editable");

          //remove all what i create in click edit
          $tdToIn1.remove();
          $tdToIn2.remove();
          $tdToIn3.remove();
          $tdToIn4.remove();
          $tdToIn5.remove();
          $tdToIn6.remove();

          $nickInput.remove();
          $nameInput.remove();
          $surnameInput.remove();
          $passwordInput.remove();
          $dobInput.remove();
          $groupInput.remove();
          $submitButton.remove();

          $trToEdit.find(".nick").text(response.nick);
          $trToEdit.find(".name").text(response.name);
          $trToEdit.find(".surname").text(response.surname);
          $trToEdit.find(".password").text("new XXX");
          $trToEdit.find(".dob").text(response.dob);
          $trToEdit.find(".group").text(response.group);
      });


    }



  });

});//end of edit btn event click


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


let nickSort = document.querySelector(".first_nick");
let nameSort = document.querySelector(".first_name");
let surnameSort = document.querySelector(".first_surname");
let passwordSort = document.querySelector(".first_password");
let dobSort = document.querySelector(".first_dob");
let groupSort = document.querySelector(".first_group");

nickSort.addEventListener("click",function() {
  sortTable(0);
});
nameSort.addEventListener("click",function() {
  sortTable(1);
});
surnameSort.addEventListener("click",function() {
  sortTable(2);
});
passwordSort.addEventListener("click",function() {
  sortTable(3);
});
dobSort.addEventListener("click",function() {
  sortTable(4);
});
groupSort.addEventListener("click",function() {
  sortTable(5);
});



function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.querySelector(".user_list_table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("tr");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}




});
