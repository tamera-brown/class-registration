function initialize() {
    // This render Modal call create our button and modal for creating a student at page onload.
    //renderModal("createSneaker", "modals");
    // Our get students function also does our rendering of all our cards, by calling the renderStudent() function.
   getStudents("/studentApi/allStudents");
}

// AJAX call and rendering using rederStudent() inside
function getStudents(url) {

    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            isValidStudent(this.responseText);
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Student List stored");


}

// We need this single student AJAX call to get API data when we update the student
function getOneStudent(id) {
    var url = "/studentApi/student/" + id;
    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();
    var student;

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            sessionStorage.setItem("student", this.responseText);
        }
    };
    xhttpList.open("GET", url, false);
    xhttpList.send();
    console.log("Single student retrieved");

    return sessionStorage.getItem("student");
}

function isValidStudent(data){
    var json = JSON.parse(data);

    // Ajax returns an array of JSON objects - the index represents each individual JSON object from our AJAX call
    // We can the iterate over all of our students

    var valid;
    
    var email=document.getElementById("login").value;
    var pwd=document.getElementById("password").value;
   
    console.log(email);
    console.log(pwd);

    for (var index = 0; index < json.length; index++) {
      
        if((json[index].email==email) && (json[index].password==pwd)){

             valid=true;
            
        }
        else{
            valid=false;
        }
}
    if(valid==true){

        sessionStorage.setItem('studentEmail', document.getElementById("login").value);
        alert("Login successful");
        window.location.href = "./student.html";
        var studentName='<h1 class="schoolHead" id="profileTitle">Welcome Back,'+ json[index].firstName+' ' + json[index].lastName+'</h1>'
        JSON.stringify(studentName);
        document.getElementById("profileTitle").insertAdjacentHTML("beforeend", studentName);
      
    }
    else{
        alert("Login Failed");
        window.location.href = "./login.html";
    }
}
