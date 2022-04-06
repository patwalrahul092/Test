//global array to store details of all employees
let allEmployees = [];  

if(localStorage.length>0)
{
    allEmployees = JSON.parse(localStorage.getItem("data"));
}
// open form to add employees
let form = document.getElementById("form")
function openform(){    
    form.style.display = "block";
    del_form[0].style.display = "none"
}

function closeform(){    
    form.style.display = "none";
    del_form[0].style.display = "none"
}
//function to add employees
function addEmployees(){
    let ele = document.getElementsByTagName("input");
    event.preventDefault();
    let gender = getGender(ele);
    curr_employee = [
        ele[0].value,
        ele[1].value,
        ele[2].value,
        gender,
        ele[5].value,
        ele[6].value
    ];
    if(allEmployees.length>0)
    {
        clearTable();
    }
    allEmployees.push(curr_employee);
    displayData();
    form.style.display = "none";


    localStorage.setItem('data', JSON.stringify(allEmployees));
    allEmployees = JSON.parse(localStorage.getItem("data"));
    form.reset();
}
// function to get gender 
function getGender(ele){
    for(let i = 0; i < ele.length; i++) {
                  
        if(ele[i].type=="radio") {
          
            if(ele[i].checked)
            return ele[i].value;
        }
    }
}

///////////////////////////////////////////////////////////////DELETE EMPLOYEE RECORD //////////////////////////////
//function to delete employee

let del_form = document.getElementsByClassName("delete_form");
function openDeleteForm(){
    del_form[0].style.display = "block"
    form.style.display = "none";
}

function deleteEmployee(){
    event.preventDefault();
    let to_delete = Number(document.getElementById("Emp_id").value);
    let delete_index = -1;
    for(let i = 0; i<allEmployees.length; i++)
    {
        if(allEmployees[i][1] == to_delete)
        {
            delete_index = i;
            clearTable();
            allEmployees.splice(i, 1);
            break;
        }
    }
    if(delete_index == -1)
    {
        window.alert("please enter a valid employee code !")
    }
    else
    {
        displayData();
        del_form[0].style.display = "none"
    }
    localStorage.setItem('data', JSON.stringify(allEmployees));
    allEmployees = JSON.parse(localStorage.getItem("data"));
}

function clearTable(){

    for(let i =0; i<allEmployees.length; i++)
    {
        var tbody = document.getElementById('list').getElementsByTagName('tbody')[0];
        tbody.deleteRow(1);
    }
}

//function to display data 
function displayData(){
    var tbody = document.getElementById('list').getElementsByTagName('tbody')[0];
    for(let i = 0; i<allEmployees.length; i++)
    {
        let row = tbody.insertRow(i+1);
        for(let j = 0; j<6 ; j++)
        {
            row.insertCell(j).innerHTML = allEmployees[i][j];
        }
    }
}

displayData();