// Import required modules
const express = require('express');
const cors = require('cors'); // Enable CORS if your frontend is on a different domain
const mysql = require('mysql');
const TuyaContext = require("@tuya/tuya-connector-nodejs").TuyaContext;
const dotenv = require('dotenv').config();
// Create an Express application
const app = express();

// Use middleware to parse JSON requests
app.use(express.json());
const http = require('http');
const server = http.createServer(app);

const path = require('path');
app.use(express.static(path.join(__dirname + '/build')));


// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
const context = new TuyaContext({
  baseUrl: process.env.BASE_URL,
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY,
});

const db = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.MSQL_PWD,
    database : 'leantech',
    ssl: {"rejectUnauthorized":true}
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database server');
});
global.db = db;

const controldevice = async (type,code,deviceId,remoteId,currentstatus) => {
  
  // Query device details
   const devicedetail = await context.device.detail({
     device_id: deviceId,
   });
   if(!devicedetail.success) {
     new Error();
   }
   console.log("Device details:",code);
 // Send commands
//console.log(type);
 if (type ==="air" ) {
   const commands = await context.request({
     //path: `/v1.0/iot-03/devices/${remote_id}/commands`,
     path: `/v2.0/infrareds/${deviceId}/remotes/${remoteId}/command`,
     method: 'POST',
     body: {
         "categoryId": 5,
         "key": "powerOn"
      }
   });
   if(!commands.success) {
     new Error();
   }
   updateStatus(commands.result,remoteId,deviceId,code,currentstatus);
  // console.log("Execution result:",commands);
 } else if (type ==="tv") {
   const commands = await context.request({
     //path: `/v1.0/iot-03/devices/${remote_id}/commands`,
     path: `/v2.0/infrareds/${deviceId}/remotes/${remoteId}/command`,
     method: 'POST',
     body: {
         "categoryId": 2,
         "key": code
      }
   });
   if(!commands.success) {
     new Error();
   }
   
   updateStatus(commands.result,remoteId,deviceId,code,currentstatus);
  // console.log("Execution result:",commands.result);
 }
 
 else {
   const commands = await context.request({
     path: `/v1.0/iot-03/devices/${deviceId}/commands`,
     method: 'POST',
     body:  {
       "commands":[{"code":"switch_1","value":code}]
     }
   });
   if(!commands.success) {
     new Error();
   }
   updateStatus(commands.result,remoteId,deviceId,code,currentstatus);
   //console.log("Execution result:",commands);
 } 
 };

 async function getstatus(deviceid) {


 } 

 
 function updateStatus(result,remoteId,deviceId,code,currentstatus) {
  // console.log("current status " + currentstatus);
   if (result === true) {
     let updatestatus;
     if (remoteId !== "noremote" ) {
       if (currentstatus == 1) {
         updatestatus = "UPDATE device_list SET device_status = 0  WHERE remote_id ='" + remoteId + "'"; 
       } else {
         updatestatus = "UPDATE device_list SET device_status = 1  WHERE remote_id ='" + remoteId + "'"; 
       }
       
 //      resetstatus = "UPDATE device_list SET device_status = 0 WHERE remote_id !='" + remoteId + "' AND code_value !='"+ code + "'"; 
     } else {
       if (currentstatus == 1) {
       updatestatus = "UPDATE device_list SET device_status = 0 WHERE device_id ='" + deviceId + "'"; 
       } else {
         updatestatus = "UPDATE device_list SET device_status = 1 WHERE device_id ='" + deviceId + "'"; 
       }
 
       //      resetstatus = "UPDATE device_list SET device_status = 0 WHERE device_id ='" + deviceId + "' AND code_value !='"+ code + "'"; 
     }
  //console.log( updatestatus);
       db.query(updatestatus, (err, result) => {
  return result

     });
   }
 }
// Define a simple route that responds with a JSON object
app.get('/api/data/:zoneid', (req, res) => {
   
let zoneid = req.params.zoneid;
let getbuttonlist= "SELECT * FROM device_list WHERE zone_id ="+ zoneid+ " ORDER BY order_id"  ;
//console.log(getbuttonlist);
    db.query(getbuttonlist, (err, result) => {
       // res.send(JSON.stringify(temp1));
        res.json(result);
      //  console.log(result);
  })

});
app.get('/zonelist', (req, res) => {
   
  let getzonelist= "SELECT * FROM zone_list "  ;
  //console.log(getbuttonlist);
      db.query(getzonelist, (err, result) => {
         // res.send(JSON.stringify(temp1));
          res.json(result);
        //  console.log(result);
    })
  
  });

  app.get('/getstatus/:deviceid', async (req, res) => {
    let deviceid = req.params.deviceid;
    const commands = await context.request({
      //  path: ` /v2.0/infrareds/eb1044ef635258e664492y}/remotes`,
      path: "/v1.0/devices/"+deviceid +"/status",
       method: 'GET',
     });
  console.log(commands.result);
    res.send(commands.result);
    });
  
app.post('/smarthome/control/:deviceId/:remoteId/:type/:code/:currentstatus', async (req, res) => {
  let getbuttonlist= "SELECT * FROM device_list ORDER BY order_id"  ;

  let deviceId =  req.params.deviceId;
  let remoteId =  req.params.remoteId;
  let type =  req.params.type;
  let code =  req.params.code;
  let currentstatus =  req.params.currentstatus;
 if (type === "plug" || type === "breaker") {
  code = (code === "true"); 
 }
 //console.log(currentstatus);
try {
  const response1 = await controldevice(type,code,deviceId,remoteId,currentstatus);
  res.send(response1);
} catch (error) {
  console.error('Error fetching data:', error);
} 



});

app.get('/', function (req, res) { 
  res.header('Access-Control-Allow-Origin', '*');
 res.sendFile(path.join(__dirname + '/build/index.html'),
function (err) {
if (err) {
 res.status(500).send(err);
}
}
);
});

// Define the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
