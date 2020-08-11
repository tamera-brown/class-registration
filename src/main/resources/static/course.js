function initialize() {
 
  // renderCourses("/studentApi/courses");
}


function renderCourses(data) {

    var json = JSON.parse(data);

    for(var i = 0; i < json.length; i++){

        var tableHtml = '<table>'
        +'<tr>'
         +' <th>Course ID</th>'
          +'<th>Coouse Name</th>'
          +'<th>Department</th>'
          +'<th>Credit Hours</th>'
       +' </tr>'
       +' <tr>'
          +'<td></td>'
          +'<td></td>'
          +'<td></td>'
          +'<td></td>'
       +' </tr>'
               
     +' </table>'
      

        document.getElementById("courses").insertAdjacentHTML("beforeend", tableHtml);
        
        
    }
}