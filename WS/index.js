"use strict";
const express = require('express');
const Mongo  = require('mongodb');
var cors = require('cors')

const MongoClient = Mongo.MongoClient;
const DB_URL = "mongodb://root:aq1sw2@ds243041.mlab.com:43041/argus_vehicle_db";
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

let server = express();
server.use(bodyParser.json());
server.use(cors());

server
// route for adding a vehicle 
.put('/addVehicle', (req, res) => {
	addVehicleToDb(req, res);
})

// route for getting all vehicles 
.get('/getVehicles', (req, res) => {
	console.log('receivec get');
	getVehiclesFromDB(req, res);
})

// route for update vehilce data
.post('/updateVehicle/:id',(req, res) => {
	let id  = req.params.id;
	updateVehicleInDB(req, res, id);
})

// route for deleting
.delete('/deleteVehicle/:id',(req, res) => {
	let id  = req.params.id;
	deleteVehicle(req, res, id);
})

// add a vehicle to the DB
let addVehicleToDb = (req, res) => {
	let data = req.body;
	if(!data){
		res.status(400).send('Did not get any data');
		return;
	} 
	MongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, db) => {
		if(err){
			console.log('Could not connect to Database');
			res.status(503).send('could not connect to Database');
			return;
		}
		let database = db.db('argus_vehicle_db');
		let collection = database.collection('vehicle_collection');
		collection.insertOne(data, (err, cb) => {
			if(err){
				console.error(err);
				console.log('Could not insert data to db');
				res.status(503).send('write failed');
				return;
			}
			console.log(`One record was enterd successfully`);
			res.status(200).send('data created');
		});
		db.close();

	});
};

// retreive all vehicles from DB
let getVehiclesFromDB = (req, res) => {
	MongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, db) => {
		if(err){
			console.log('Could not connect to Database');
			res.status(503).send('could not connect to Database');
			return;
		}
		let database = db.db('argus_vehicle_db');
		let collection = database.collection('vehicle_collection');
		let data  = collection.find({}).toArray((err, result) => {
			if(err){
				console.error(err);
				console.log('err while searching in DB');
				res.status(503).send('find failed');
				return;
			}
			console.log(`Found ${result.length} records that matched the query`);
			if(!result[0]){
				res.status(200).send("Did not find any data")
			}
			res.status(200).send(JSON.stringify(result));
		});
		db.close();
	});
};

// pdate vehilce data in DB
let updateVehicleInDB = (req, res, id) => {
	let newData = req.body;
	if(!newData){
		res.status(400).send('Did not get input');
		return;
	}
	MongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, db) => {
		if(err){
			console.log('Could not connect to Database');
			res.status(503).send('could not connect to Database');
			return;
		}
		let database = db.db('argus_vehicle_db');
		let collection = database.collection('vehicle_collection');
		collection.updateOne({ "_id" : new Mongo.ObjectId(id) },  { $set: newData },
			(err, db) => {
				if(err){
					console.error(err);
					console.log('Could not update data');
					res.status(503).send('update failed');
					return;
				}
				console.log(`Successfully updated ${id}`);
				res.status(200).send(`Successfully updated ${id}`);
			}
		);
		db.close();
	});
};

let deleteVehicle = (req, res, id) => {
	MongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, db) => {
		if(err){
			console.log('Could not connect to Database');
			res.status(503).send('could not connect to Database');
			return;
		}
		let database = db.db('argus_vehicle_db');
		let collection = database.collection('vehicle_collection');
		collection.deleteOne(
				{ "_id" : new Mongo.ObjectId(id) },
				(err, cb) => {
					if(err){
						console.error(err)
						console.log('Could not delete data');
						res.status(503).send('delete failed');
						return;
					}
					res.status(200).send(`vehicle ${id} deleted`);
				});
			db.close();
	});
};

server.listen(PORT, () => console.log(`listening in port ${PORT}`));