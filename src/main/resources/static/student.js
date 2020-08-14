function initialize() {

    getStudents("/studentApi/allStudents");

}
function getStudents(url) {

    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            getStudents(this.responseText);
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    //console.log("Student List stored");


}
function getStudents(data){
    var students = JSON.parse(data);
    var emailFromLoginPage = document.getElementById("login").value;
    var purpose = StudentProfile

    for(let index = 0; index < students.length; index++) {
        if(students[index].email == emailFromLoginPage) {
             document.getElementById("profileTitle").textContent=`Welcome ${students[index].firstName} ${students[index].lastName}`;
            var tableHtml = ''
                + '<td>' + students[index].studentId + '</td>'
                + '<td>' + json[index].firstName + '</td>'
                + '<td>' + json[index].lastName +'</td>'
                + '<td>' + json[index].email + '</td>'
                + '<td> <button data-toggle="modal" data-target="#' + purpose + students[index].studentId + '" class="btn btn-secondary">Courses</button></td>'
                + '<td><br>'
                + '</div>'
                + '</td>'
                + '</tr>';

            document.getElementById("regTable").insertAdjacentHTML("beforeend", tableHtml);
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

    // find all the courses id from the registration list by matching the student id
    for( let index = 0; index < regList.length; index++) {
        if(regList[index].studentId == id) {
            studentCourses.push(regList[index].course_id);
        }
    }

    for(let index = 0; index < studentCourses.length; index++) {
        for(let index2 = 0; index2 < courses.length; index2++) {
            if(studentCourses[index] == courses[index2].course_id) {
                studentCourses[index] = courses[index2];
            }
        }
    }

    var modalTable = ' <div class="modal fade" id="' + modalPurpose + id + '"> '
        + ' <div class="modal-dialog modal-xl"> '
        + ' <div class="modal-content"> '

        + '<div class="modal-header">'
        + '<h4 class="modal-title"></h4>'
        + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
        + '</div>'
        + '<div class="modal-body">'

        + '<div class="container">'
        + '<h2> Stats </h2>'
        + '<table class="table table-dark">'
        + '<thead>'
        + '<tr>'
        + '<th>Courses Id</th>'
        + '<th>Courses Title</th>'
        + '<th>Credit Hours</th>'
        + '<th>Department</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody>'
        + '<tr>'
        + tableEntries(studentCourses)
        + '</tr>'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '</div>'

        + '<div class="modal-footer">'
        + '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
        + '</div>'

        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';




}

function tableEntries(courses) {
    var entries;
    for(let index = 0; index < courses.length; index++) {
        entries += '<td>' + courses[index].course_id + '</td>'
                 + '<td>' + courses[index].course_Name + '</td>'
                 + '<td>' + courses[index].credit + '</td>'
                 + '<td>' + courses[index].department + '</td>';
    }
    return entries;
}
