// /*Giới thiệu 1 số hàm built-in
//     1. Alert
//     2. Console
//     3. Confirm
//     4. Prompt
//     5. Set timeout
//     6. Set interval */

// // prompt("Please enter");

// setTimeout(function() {
//     alert("Please enter");
// }, 5000);

// //Template string ES 6
// var a = ' String';
// var b = 'ES 6';
// console.log(`Template : ${a} ${b}`);

// //JS String Method

// //1. Length

// console.log(a.length);
// console.log(b.length);

// //2. find index

// console.log(a.indexOf('ring'));
// console.log(b.indexOf('6'));

// //3. cut string

// console.log(a.slice(0, 5));
// console.log(b.slice(0, 5));

// //4. replace

// console.log(a.replace('ring', '6'));
// console.log(b.replace('ring', '6'));
// console.log(a.replace(/ring/g, '6'));


// //5. convert to upper case

// console.log(a.toUpperCase());
// console.log(b.toUpperCase());

// //6. convert to lower case

// console.log(a.toLowerCase());
// console.log(b.toLowerCase());

// //7. trim
// // Xử lý khi người dùng nhập vào những ký tự trống
// console.log(a.trim());
// console.log(b.trim());
// //8. Split

// console.log(a.split(' '));
// console.log(b.split(' '));

// //9. Get a character by index

// console.log(a.charAt(0));
// console.log(b.charAt(0));

// //Javascript Array Methods
// var languages = [
//     'JavaScript',
//     'HTML',
//     'CSS',
//     'PHP',
//     'Java',
// ];
// //1. toString

// console.log(languages.toString());
// //2. Join

// console.log(languages.join(', '));

// //3. Pop

// console.log(languages.pop()); //delete end elements and return them

// //4. Push

// console.log(languages.push('C#','Dart')); //add element to end of array

// //5. Shift

// console.log(languages.shift()); //delete first element and return it

// //6. Unshift

// console.log(languages.unshift('C#','Dart')); //add element to start of array

// //7. Splicing

// console.log(languages.splice(0, 1, 'C#','Dart')); //delete first element and add new element

// //8. Concat

// console.log(languages.concat('C#','Dart')); //add element to end of array

// //9. Slicing

// console.log(languages.slice(0, 1));

// //Tham số hàm
// // Arguments?
// function writeLog() {
//     var myString  = '';
//     for (var param of arguments) {
//         myString += `${param} - `
//     }
//     console.log(myString);
// }

// writeLog('First', 'Second', 'Third');

// //Return trong hàm
// //Làm thế nào để biết người dùng chọn ok hay cancel?
// var isConfirm = confirm('Confirm');
// console.log(isConfirm);

// //types of functions
// //decralation function

// function dec(num) {
//     return num - 1;
// }

// console.log(dec(5));
// //expression function
// var expression = function(){
//     console.log(arguments);
// }
// setTimeout(function autologin(){});

// var myObj ={
//     myFunction: function(){}
// }



// //Polyfill function

// //Object function
// var myInfo = {
//     firstName: 'John',
//     lastName: 'Doe',
//     age: 30,
//     address: {
//         city: 'New York',
//         state: 'NY'
//     }
// }
// console.log(myInfo['address']);
// console.log(myInfo.age);

// delete myInfo['address'];
// var person = { name: "John", age: 30, city: "New York" };
// for (var key in person) {
//   console.log(key + ": " + person[key]);
// }

// var array = [1, 2, 3, 4, 5];
// var sum = array.reduce(function (accumulator, currentValue) {
//   return accumulator + currentValue;
// }, 0);
// console.log(sum);

//Bài tập: Flat - "Làm phẳng" mảng từ Deth Array - "Mảng sâu"
// var depthArray = [1,2,[3,4,5,6],3,4,5,6,[7,8,9,10]];

// var flatArray = depthArray.reduce(function(flatOutput, depthItem) {
//     return flatOutput.concat(depthItem);
// }, []);

// console.log(flatArray);

//2 bước tạo ra 1 promise
//1. new Promise
// //2. Excecutor
// var promise = new Promise(
//     //Excecutor
//     function(resolve, reject) {
//         //Logic
//         //Thành công: resolve()
//         //Thất bại: reject()

//         //Fake call API
//         // resolve([
//         //     {
//         //         Id: 1,
//         //         name: 'Javascript'
//         //     }
//         // ]);
//         reject('Error');

//     }
// );

// promise.then(function(courses) {
//     console.log(courses);
// });

// promise.catch(function(Error) {
//     console.log(Error);
// });

// promise.finally(function() {
//     console.log('finished');
// });

// //Hàm cách 1
// function logger(log){
//     console.log(log);
// }
// logger('message');

// //Hàm cách 2
// // const logger = function(log){
// //     console.log(log);
// // }

// //Arrow function

// // const logger = (log) => {
// //     console.log(log);
// // }

// const Course = function(name, price)  {
//     this.name = name;
//     this.price = price;
// }

// const course1 = new Course('Javascript', 100);

// console.log(course1);

var users = [
    {
        id: 1,
        name: 'John',
        age: 30
    },
    {
        id: 2,
        name: 'Mike',
        age: 20
    },
    {
        id: 3,
        name: 'Jackson',
        age: 30
    }
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'What year was this book published?'
    },
    {
        id: 2,
        users_id: 2,
        content: 'This book was written in 1994'
    }
];

//Back end cung cấp 2 api, 1 để lấy bình luận, 2 để lấy user bình luận
//1. Lấy comment
//Từ comment lấy ra user_id
//Từ User_id lấy ra user tương ứng

//Fake API
function getComments() {
    return new Promise(function (resolve) {
        setTimeout( function () {
            resolve(comments);
        },1000);
    })
}

function getUserByIds(userIds) {
    return new Promise(function (resolve) {
        var result = users.filter(function (user) {
            return userIds.includes(user.id);
        });
        setTimeout(() => {
            resolve(result);
        }, 1000);
        
    },2000);
}

getComments()
   .then(function (comments) {
        var userIds = comments.map(function (comment) {
            return comment.user_id;
        });

        return getUserByIds(userIds)
            .then(function (users) {
                    return {
                        users: users,
                        comments: comments
                    };
                })
    })
    .then(function (data) {
        var commentBolcks = document.getElementById('comment-block');
        
        var html = '';
        data.comments.forEach(function (comment) {
            var user = data.users.find(function (user){
                return user.id === comment.user_id;
            });
            html += `${user.name}: ${comment.content}`;
        });

        commentBolcks.innerHTML = html;
    });
