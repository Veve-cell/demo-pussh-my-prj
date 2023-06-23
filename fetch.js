var postApi = 'https://jsonplaceholder.typicode.com/posts';

//stream
fetch(postApi)
   .then(function (response) {
        return response.json(); //trả lại 1 promise
        //JSON.parse -> JSON ->js types
   })
   .then(function (posts) {
        var htmls = posts.map(function (post) 
                        { 
                            return `<li>
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                            </li>`;
                        });
        var html = htmls.join();
        document.getElementById('post-block').innerHTML = html;
   })
   .catch(function (err) {
    console.log('Có lỗi');
   })

   var courseApi = 'http://localhost:3000/posts';
fetch(courseApi)
   .then(function (response) {
     return response.json(); //trả lại 1 promise
          //
   })
   .then(function (courses){
     console.log(courses);
   })