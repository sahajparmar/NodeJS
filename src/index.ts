import { Server } from './server';

let server = new Server().app;
let port = 3000;

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});



// mongoose
//   .connect(getEnvironmentVariables().db_url)
//   .then(() => {
//     console.log("Connected to mongodb.");
//   });

// function is_MathsByX_Available() {
//   return false;
// }

// function is_MathsByY_Available() {
//   return false;
// }

// function is_ScByX_Available() {
//   return false;
// }

// function is_ScByY_Available() {
//   return false;
// }

// Promises for Book Availability

// function resultMathsBook() {
//   return new Promise((resolve, reject) => {
//     if (is_MathsByX_Available()) {
//       resolve(true);
//     } else if (is_MathsByY_Available()) {
//       resolve(true);
//     } else {
//       reject(false);
//     }
//   });
// }

// function resultScienceBook(): Promise<string> {
//   return new Promise((resolve, reject) => {
//     if (is_ScByX_Available()) {
//       resolve("Science by X available");
//     } else if (is_ScByY_Available()) {
//       resolve("Science by Y available");
//     } else {
//       reject("Both books not available");
//     }
//   });
// }

// // Synchronous Promises Handling

// resultMathsBook()  // executed first
//   .then((result) => {
//     console.log(result);
//     if (result) {
//       resultScienceBook()
//         .then((data) => {
//           console.log(data);
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     }
//   })
//   .catch((error) => {
//     console.log("error: ", error);
//   });

//   // Asynchronous Function with async/await

//   async function final() {
//     try {
//         let result1 = await resultMathsBook();
//         if(result1) result1 = await resultScienceBook();
//         return result1;
//     } catch(e) {
//         return Promise.reject(e);
//     }
// }

// final().then(data => {
//     console.log('data: ', data);
// }).catch(e => {
//     console.log(e);
// })

// // const object1 = { id: 1, name: 'Technyks'};
// // const object2 = { ...object1, email: 'technyks@gmail.com', id:2, name: 'Nikhil' };
// // const object3 = { ...object1, ...object2, phone: '3232432', id: 4 };
// // console.log(object3);

// const array1 = [1,2,3];
// const array2 = [1,2,3];
// const array3 = [ ...array1, ...array2, 1, 2, 3];
// console.log(array3.length);

// app.get("/api/login", (req, res) => {
//   console.log(req);
//   const data = {name: 'Technyks', email: 'technyks1@gmail.com'};
//   res.status(200).send(data);
//   // console.log('success')
// });

// app.use(function (req, res, next) {
//   console.log("middleware1");
//   next();
// }); //middelware



// app.use(function (req, res, next) {
//   console.log("middleware1");
//   next();
// });
