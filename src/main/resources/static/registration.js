function initialize() {
 
    getCourses("/courseApi/courses");
   
 }


 function getCourses(url) {

   //make initial api call to get Course list
   var xhttpList = new XMLHttpRequest();

   // Read JSON - and put in storage
   xhttpList.onreadystatechange = function () {

       if (this.readyState == 4 && this.status == 200) {
           renderCourses(this.responseText);
           
          
       }
   };
   xhttpList.open("GET", url, true);
   xhttpList.send();
   console.log("Course List stored");


}
// function getReg(url) {
//
//     //make initial api call to get Registration list
//     var xhttpList = new XMLHttpRequest();
//
//     // Read JSON - and put in storage
//     xhttpList.onreadystatechange = function () {
//
//         if (this.readyState == 4 && this.status == 200) {
//             createReg(this.responseText);
//
//
//         }
//     };
//     xhttpList.open("GET", url, true);
//     xhttpList.send();
//     console.log("Registration List stored");
//
//
//  }

 function getOneCourse(id) {
   var url = "/courseApi/courses/" + id;
   //make initial api call to get Course list
   var xhttpList = new XMLHttpRequest();
   var course;

   // Read JSON - and put in storage
   xhttpList.onreadystatechange = function () {

       if (this.readyState == 4 && this.status == 200) {
           sessionStorage.setItem("regTable", this.responseText);
       }
   };
   xhttpList.open("GET", url, false);
   xhttpList.send();
   console.log("Single Course retrieved");

   return sessionStorage.getItem("regTable");
}

function renderCourses(data) {

   var courseList= JSON.parse(data);

   for(var i = 0; i < courseList.length; i++){

       var tableHtml = ''
       + '<td>' + courseList[i].course_id + '</td>'
       + '<td>' + courseList[i].course_Name + '</td>'
       + '<td>' + courseList[i].credit +'</td>'
       + '<td>' + courseList[i].department + '</td>'
       + '<td> <button type="button" class="btn btn-success" id="Enroll" onclick="EnrolltoCourse(' + courseList[i].course_id + ')">Enroll</button>'
       + '</td>'
       + '</tr>';

       document.getElementById("regTable").insertAdjacentHTML("beforeend",tableHtml);      
     
   } 
   

   
}
 function EnrolltoCourse(courseId){
    var RegList_input = getRegistrationList();
    var regList = JSON.parse(RegList_input);
    var getEmailFromLoginPage = sessionStorage.getItem("studentEmail");
    var students_input = getStudentsList();
    var students = JSON.parse(students_input);
    var studentId;
    var isStudentEnrolledInCourse;

    // find the studentId by matching the email addresses
    for(var index = 0; index < students.length; index++) {
        if(getEmailFromLoginPage == students[index].email) {
            studentId = students[index].studentId;
            break;
        }
    }

    // now check if the user has already registers in the registration table
    for(var index = 0; index < regList.length; index++) {
        if(studentId == regList[index].studentId && courseId == regList[index].course_id) {
            isStudentEnrolledInCourse = true;
        }
    }

    if(!isStudentEnrolledInCourse) {
        console.log("Can login");
        var ok = confirm("Are you sure that you want to enroll in this course? \nPress ok to continue or cancel to abort");
        if (ok == true) {

            alert("Successfully Enrolled!");
            document.getElementById("Enroll").setAttribute("disabled", true);
            //TODO wrong link, need add on the url
            // getReg("/regApi/registration/");
            registerStudent(studentId, courseId);
        }
    } else {
        console.log("cannot login");
        alert("You are already enrolled in this course.");

    }
 }

//  function createReg(data) {
//
//     var json=JSON.parse(data);
//
//     for( let index = 0; index < json.length; index++) {
//
//         let courseID=json[index].course_id;
//         let studentID=json[index].studentId;
//         let Dropped=false;
//
//         var sendData = {
//
//             "course_id": courseID,
//             "is_dropped": Dropped,
//             "student_id": studentID,
//
//         }
//
//
//     }
//     console.log(sendData);
//
//         var xhttp = new XMLHttpRequest();
//         xhttp.open("POST", "/regApi/add/registration/", true);
//         xhttp.setRequestHeader('Content-Type', 'application/json');
//         xhttp.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 console.log("Registration created!");
//             }
//         };
//
//         xhttp.send(sendData);
// }

function getStudentsList() {
    link = "/studentApi/allStudents";

    var xhttpList = new XMLHttpRequest();

    xhttpList.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            sessionStorage.setItem("students", this.responseText);
        }
    };

    xhttpList.open("GET", link, false);
    xhttpList.send();
    console.log("Students retrieved");

    return sessionStorage.getItem("students");
}

function getRegistrationList() {
    var url = "/regApi/registration"

    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            sessionStorage.setItem("reg", this.responseText);
        }
    };
    xhttpList.open("GET", url, false);
    xhttpList.send();
    console.log("registration list retrieved");

    return sessionStorage.getItem("reg");

}

function registerStudent(studentId, courseId) {
    var sendData = {
        "course_id": courseId,
        "studentId": studentId,
        "dropped": false
    }

    console.log(sendData);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/regApi/add/registration", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            console.log("Registered!");

        }
    };

    xhttp.send(JSON.stringify(sendData));
}

function logout() {
    sessionStorage.clear();
}