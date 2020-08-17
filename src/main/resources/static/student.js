function initialize() {
    // console.log("in initialzie")
    getStudents("/studentApi/allStudents");
}

function displayStudent(data) {

    var students = JSON.parse(data);
    var emailFromLoginPage = sessionStorage.getItem("studentEmail");

    for(let index = 0; index < students.length; index++) {
        if(students[index].email == emailFromLoginPage) {
            var headHtml = '<h1 class="schoolHead">Welcome Back ' + students[index].firstName + ' ' + students[index].lastName + '!</h1>'

            document.getElementById("studentHead").insertAdjacentHTML("beforeend", headHtml);
        }

    }
}
function getStudents(url) {
    // console.log("inside getStudents")
    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            renderStudents1(this.responseText);
            displayStudent(this.responseText);
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    //console.log("Student List stored");


}
function renderStudents1(data){
    // console.log("did i get here");
    var students = JSON.parse(data);
    var emailFromLoginPage = sessionStorage.getItem("studentEmail");
    console.log("here is " + emailFromLoginPage);
    var purpose = "StudentProfile";

    for(let index = 0; index < students.length; index++) {
        if(students[index].email == emailFromLoginPage) {
            var tableHtml = '<tr>'
                + '<td>' + students[index].studentId + '</td>'
                + '<td>' + students[index].firstName + '</td>'
                + '<td>' + students[index].lastName +'</td>'
                + '<td>' + students[index].email + '</td>'
                + '<td> <button data-toggle="modal" data-target="#' + purpose + students[index].studentId + '" class="btn btn-secondary" id="coursesTable">Courses</button></td>'
                + '</tr>';

            document.getElementById("studentTable").insertAdjacentHTML("beforeend", tableHtml);
            renderCourses(purpose, students[index].studentId);
        }

    }

}

function getCourses() {
    var url = "/courseApi/courses"

    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            sessionStorage.setItem("courses", this.responseText);
        }
    };
    xhttpList.open("GET", url, false);
    xhttpList.send();
    console.log("courses retrieved");

    return sessionStorage.getItem("courses");

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


//TODO must find all the coursesIDs from the registration table
//TODO add the courseID's to an array in javascript
//TODO then search in the courses table by doing a double for loop
//TODO outer for loop will iterate based of the courseID in the array
//TODO innerloop will fetch the course from the course table
function renderCourses(purpose, id) {
    var pregList = getRegistrationList();
    var pcourses = getCourses();
    var regList = JSON.parse(pregList);
    var courses = JSON.parse(pcourses);
    var studentCourses = [];
    var regIds = [];

    // find all the courses id from the registration list by matching the student id
    for( let index = 0; index < regList.length; index++) {
        if(regList[index].studentId == id) {
            studentCourses.push(regList[index].course_id);
            regIds.push(regList[index].registration_id);
        }
    }

    for(let index = 0; index < studentCourses.length; index++) {
        for(let index2 = 0; index2 < courses.length; index2++) {
            if(studentCourses[index] == courses[index2].course_id) {
                studentCourses[index] = courses[index2];
            }
        }
    }

    console.log(courses);
    console.log(regList);
    console.log(studentCourses);
    console.log(regIds);

    var modalTable = ' <div class="modal fadeIn" id="' + purpose + id + '"> '
        + ' <div class="modal-dialog modal-xl"> '
        + ' <div class="modal-content"> '

        + '<div class="modal-header">'
        + '<h4 class="modal-title"></h4>'
        + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
        + '</div>'
        + '<div class="modal-body">'

        + '<div class="container">'
        + '<h2 class="schoolHead">Courses</h2>'
        + '<table class="table">'
        + '<thead class="headers">'
        + '<tr>'
        + '<th>Courses Id</th>'
        + '<th>Courses Title</th>'
        + '<th>Credit Hours</th>'
        + '<th>Department</th>'
        + '<th>Drop Course</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody class="tableBody">'
        + tableEntries(studentCourses, regIds)
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '</div>'

        + '<div class="modal-footer">'
        + '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
        + '</div>'

        + '</div>'
        + '</div>'
        + '</div>';


    document.getElementById("modals").insertAdjacentHTML("beforeend", modalTable);

}

function tableEntries(courses, regIds) {
    var entries;
    // console.log(courses);
    for(let index = 0; index < courses.length; index++) {
        entries += '<tr id="' + courses[index].course_id + '">'
                 +'<td>' + courses[index].course_id + '</td>'
                 + '<td>' + courses[index].course_Name + '</td>'
                 + '<td>' + courses[index].credit + '</td>'
                 + '<td>' + courses[index].department + '</td>'
                 + '<td><button type="button" onclick="deleteCourseFromRegistrationList(' + courses[index].course_id + ',' + regIds[index] + ')" class="btn btn-danger" >Drop</button></td>'
                 + '</tr>';
    }
    return entries;
}

function deleteCourseFromRegistrationList(courseId, registrationId) {
    console.log("courseId: " + courseId);
    console.log("regId: " + registrationId);

    var link = "/regApi/delete/registration/" + registrationId;

    var ok = confirm("Are you sure you want to delete?\nPress 'OK' to confirm, or 'cancel' to cancel");

    if(ok == true) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", link, true);

        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200) {
                var removeEntry = document.getElementById(courseId);
                removeEntry.parentNode.removeChild(removeEntry);
                console.log("Removed entry from table");


            }
        };

        xhttp.send(null);
    }



}
