const fs = require("fs")


// // CREATE FILE
// fs.writeFile("./test.txt","make file using writefile",function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("file created")
//     }
// })



// // READ FILE
// fs.readFile("./test.txt", "utf-8", function (err, data) {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log(data) 
//     }
// })



// // ADD CONTENT IN FILE
// fs.appendFile("./test.txt","\nAdded new content",function(err){
//     if(err){console.log(err)}

//     else{console.log("Update Content ")}
// })



// // COPY FILE
// fs.cp("./test.txt","./copy.txt", function(err){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("File Copied")
//     }
// })



// //RENAME THE FILE
// fs.rename(
//     "./test.txt",
//     "./testrename.txt",
//     function(err) {
//         if (err) return console.log(err);

//         console.log("File renamed");
//     }
// );



// // DELETE THE FILE
// fs.unlink("./copy.txt", function(err) {
//     if (err) return console.log(err);

//     console.log("File deleted");
// });