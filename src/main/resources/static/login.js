function initialize() {
   
    isStudentValid();
}

// AJAX call and rendering using rederStudent() inside
function getStudents() {
    var link = "/studentApi/allStudents";
    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            sessionStorage.setItem("students", this.responseText);
        }
    };
    xhttpList.open("GET", link, true);
    xhttpList.send();
    console.log("Student List received");

    return sessionStorage.getItem("students");

}


function isStudentValid() {
    var students_input;
    var students;
    var emailFromLogin = document.getElementById("login").value;
    var passwordFromLogin = document.getElementById("password").value;
    var studentFound;
    var firstName;
    var lastName;
    console.log(emailFromLogin);
    console.log(passwordFromLogin);

    students_input = getStudents();
    students = JSON.parse(students_input);

    //find if the students email and password matches
    for(var index = 0; index < students.length; index++) {
        if(emailFromLogin == students[index].email  && passwordFromLogin == students[index].password) {
            studentFound = true;
            firstName = students[index].firstName;
            lastName = students[index].lastName;
        }
    }

    if(studentFound) {
        sessionStorage.setItem("studentEmail", emailFromLogin);
        alert("Login Successful");
        window.location.href = "./student.html";
        
    } else {
        alert("Login failed");
        
    }

}
