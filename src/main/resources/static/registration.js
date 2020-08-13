function initialize() {
 
     getCourses("/courseApi/courses");
  }


  function getCourses(url) {

    //make initial api call to get Student list
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

    var json = JSON.parse(data);

    for(var i = 0; i < json.length; i++){

        var tableHtml = ''
        + '<td>' + json[i].course_id + '</td>'
        + '<td>' + json[i].course_Name + '</td>'
        + '<td>' + json[i].credit +'</td>'
        + '<td>' + json[i].department + '</td>'
        + '<td>'
        + '<button type="button" class="btn btn-success" id="Enroll" onclick="EnrolltoCourse()">Enroll</button>'
        + '</td>'
        + '</tr>';

        document.getElementById("regTable").insertAdjacentHTML("beforeend", tableHtml);
        
      
    }
    
}
  function EnrolltoCourse(){

   
    var ok=confirm("Are you sure that you want to enroll in this course? \nPress ok to continue or cancel to abort");
      if(ok==true){
          alert("Successfully Enrolled!");
          initialize1();

          document.getElementById("Enroll").setAttribute("disabled",true);
          
       }

      
     
  }
  
