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
function getReg(url) {

    //make initial api call to get Registration list
    var xhttpList = new XMLHttpRequest();
 
    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {
 
        if (this.readyState == 4 && this.status == 200) {
            createReg(this.responseText);
            
           
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Registration List stored");
 
 
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

   var courseList= JSON.parse(data);

   for(var i = 0; i < courseList.length; i++){

       var tableHtml = ''
       + '<td>' + courseList[i].course_id + '</td>'
       + '<td>' + courseList[i].course_Name + '</td>'
       + '<td>' + courseList[i].credit +'</td>'
       + '<td>' + courseList[i].department + '</td>'
       + '<td> <button type="button" class="btn btn-success" id="Enroll" onclick="EnrolltoCourse()">Enroll</button>'
       + '</td>'
       + '</tr>';

       document.getElementById("regTable").insertAdjacentHTML("beforeend",tableHtml);      
     
   } 
   

   
}
 function EnrolltoCourse(){

  
   var ok=confirm("Are you sure that you want to enroll in this course? \nPress ok to continue or cancel to abort");
     if(ok==true){

         alert("Successfully Enrolled!");
         

         document.getElementById("Enroll").setAttribute("disabled",true);

         getReg("/regApi/registration/");
        
        
             
      }
    

     
    
 }

 function createReg(data) {

    var json=JSON.parse(data);

    for( let index = 0; index < json.length; index++) {

        let courseID=json[index].course_id;
        let studentID=json[index].studentId;
        let Dropped=false;

        var sendData = {

            "course_id": courseID,
            "is_dropped": Dropped,
            "student_id": studentID,
            
        }
        
        
    }
    console.log(sendData);
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/regApi/add/registration/", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                coconsole.log("Registration created!");
            }
        };
       
        xhttp.send(sendData);
    
       
        
    

}
