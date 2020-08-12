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

    for(index = 0; index < students; index++) {
        if(students[index].email === emailFromLoginPage) {
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

function renderCourses(purpose, id) {
    var regList =
    var courses =

}
