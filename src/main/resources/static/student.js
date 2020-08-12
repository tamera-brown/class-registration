function initialize() {

    getStudents("/studentApi/allStudents");

}
function getStudents(url) {

    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            g(this.responseText);
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    //console.log("Student List stored");


}
function getStudentName(){

}