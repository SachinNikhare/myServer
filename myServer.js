let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const port = process.env.PORT||2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

// let baseURL = "https://repo-8qu2.onrender.com/productServer";
let axios = require("axios");

app.post("/fetch", function (req, res) {
  let { method, fetchURL, data } = req.body;
  console.log("METHOD",method);
  console.log("fetchURL",fetchURL);
  console.log("data",data);
  if (method === "GET") {
    axios
      .get(fetchURL)
      .then(function (response) {
        console.log(response.data);
        res.send(response.data);
      })
      .catch(function (err) {
        // if (err.response) {
        //   let { status, statusText } = err.response;
          // console.log(status, statusText);
          res.status(401).send({code:err.code,message:err.message,status:401});
        // } else {
        //   res.status(401).send({code:err.code,message:err.message});
        // }
      });
  } else {
    axios
      .post(fetchURL, data)
      .then(function (response) {
        console.log(response.data);
        res.send(response.data);
      })
      .catch(function (err) {
        // if (err.response) {
          // let { status, statusText } = err.response;
          // console.log(status, statusText);
          console.log(err);
          res.status(401).send({code:err.code,message:err.message,status:401});
        // } else {
        //   res.status(401).send({code:err.code,message:err.message});
        // }
      });
  }
});
