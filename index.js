//const { resolveNaptr } = require("dns");
const express = require("express");

const app = express();

const fs = require("fs");

//create DUMMY DATA for post api call
// const valueadd = {
//   id: 5,
//   name: "Book E",
//   duration: 200,
//   maxGroupSize: 50,
//   difficulty: "hard",
//   ratingsAverage: 30,
//   ratingsQuantity: 200,
//   price: 3000,
//   summary: "About Stuff D",
//   description:
//     "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
// };

const datavalue = JSON.parse(
  fs.readFileSync(
    //TOP LEVEL CODE DOESNT CHANGE NEITHER NEEDS FETCHIGN AGAIN AND AGAIN SO OUTSIDE OF CALLBACK",
    "C:/Users/Naman Bhoj/Desktop/May-July/FULL_STACK/NODE/API_MODULAR_1/dev-data/data/book_info.json"
  )
);

//console.log(datavalue);
// RESTFUL ARCHITECTURE RULES:
// 1) SEPERATION OF LOGICAL RESOURCES I.E. CREATE ENDPOINT FOR  RESOURCES I.E. NOUNS AND NOT VERBS , HERE WE HAVE ONLY ONE THAT IS BOOKS

// 2)  API HAS TWO PARTS : ROUTE AND THE HTTP REQUEST BASED ON THAT YOU CREATE ADD, DELETE EDIT AND RETREIVE FUNCTIONALITY

//3) SEND RECEIVE ONLY JSON DATA_URL_DEFAULT_CHARSET

//4) STATELESS

//API ENDPOINTS AND ROUTE -> LATER SEPERATE THE CONTROLLER TO NEWFILE AND ROUTER FOR THE RESOURCE, ONLY KEEP THE ENDPOINT URL

//1) GET API
app.get("/api/v1/books/:id?", function (req, res) {
  // keeping id as an optional parameter
  // read from database in this case a json file

  if (datavalue.length == 0) {
    return res.send.status(500).json({
      status: "There is an error from the server end",
      message: "please report the error at support@founderro.com",
    });
  } else if (datavalue.length != 0 && req.params.id < datavalue.length) {
    res.status(200).json({ data: datavalue });
  }
  //    else if (req.params.id != null) {
  //     const sendvalue = datavalue.requiredid;
  //     // console.log(sendvalue);
  //     res.send(sendvalue);
  //     // console.log(req.params.id); // just printing out the optional variable
  //   }
});

// post api
//CHECK USING POSTMAN

app.post("/api/v1/books/", function (req, res) {
  res.status(200).json({
    status: "success",
    message: "post request succesful",
  });
});
// //
//
//
//
//Exports

//UPDATE API using PATCH

app.patch("/api/v1/books/:id/:price?", function (req, res) {
  const id = req.params.id;
  const new_price = req.params.price;

  // write in a file in in the position of current item
  let requiredindex = 0;
  for (i = 0; i < datavalue.length; i++) {
    if (datavalue[i].id == id) {
      requiredindex = i;
    }
  }

  datavalue[requiredindex].price = new_price; // subsituiting the price here

  // console.log(datavalue);
  console.log(" The required index for update request is " + requiredindex);
  fs.writeFileSync(
    "C:/Users/Naman Bhoj/Desktop/May-July/FULL_STACK/NODE/API_MODULAR_1/dev-data/data/book_info.json",
    JSON.stringify(datavalue)
  );

  res.status(200).json({
    status: "ok",
    message: "patch request succesful",
  });
});

//DELETE API
app.delete("/api/v1/books/:id", function (req, res) {
  const id = req.params.id;

  let requiredindex = null;
  for (i = 0; i < datavalue.length; i++) {
    if (datavalue[i].id == id) {
      requiredindex = i;
    }
  }
  console.log(" The required index for delete request is " + requiredindex);

  datavalue.splice(requiredindex, 1);
  // console.log(datavalue);
  fs.writeFileSync(
    "C:/Users/Naman Bhoj/Desktop/May-July/FULL_STACK/NODE/API_MODULAR_1/dev-data/data/book_info.json",
    JSON.stringify(datavalue)
  );
  res.status(200).json({
    status: "ok",
    message: "deletes request succesful",
  });
});

module.exports = app;
//   fs.writeFileSync(
//     "C:/Users/Naman Bhoj/Desktop/May-July/FULL_STACK/NODE/API_MODULAR_1/dev-data/data/book_info.json",
//     valueadd,
//     function (req, res) {
//       console.log("Wrote to the file");
//     }
//   );
