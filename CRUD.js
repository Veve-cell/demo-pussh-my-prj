var courseApi = 'http://localhost:3000/course';

function start(){
    getCourses(renderCourses);
    handleCreateForm();
}

start();

//Functions
function getCourses(callback) {
    fetch(courseApi)
        .then(function (response){
            return response.json();
        })
        // .then(function (courses){
        //     console.log(courses);
        //   });
        .then(callback);
}

function createCourse(data, callback) {
    var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    fetch(courseApi,options)
    .then(function (response){
        return response.json();
      })
    .then(callback);
}

function renderCourses(courses) {
    var listCourseBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function (course) {
        return `
        <li class = "course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick = "handleDeleteCourse(${course.id})">Xóa</button>
        </li>
        `;
    });
    listCourseBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    document.addEventListener('click', function(event) {
      if (event.target.id === 'create') {
        alert('Create button clicked');
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
                    name: name,
                    description: description
                };
        
        createCourse(formData, function () {
            getCourses(renderCourses);
        });
    }
    });
  }
  
  function handleDeleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(data)
    };
    fetch(courseApi + '/' + id,options)
    .then(function (response){
        return response.json();
    })
    .then(function(){
        var courseItem = document.querySelector('.course-item-'+ id);
        if(courseItem){
            courseItem.remove();
        }
    });
  }