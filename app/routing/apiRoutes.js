const express = require('express');
const routerApi = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const friends = require('../data/friends');


routerApi.use(bodyParser.urlencoded({extended : false}));
routerApi.use(bodyParser.json());

routerApi.get('/api/friends', (req, res) => {
    res.json(friends);
})

routerApi.post('/api/friends', (req, res) => {
	//new friend input
	let newFriend = req.body;

	let newFriendScores = newFriend.scores.map(parseFloat);

	let matchName = '';
	let matchImg = '';
	let totalDifference = 10000;

	let friendsScores = friends.forEach (friend => {
		friend.scores = friend.scores.map(parseFloat)

		let difference = 0;
		friend.scores.forEach( (score, index) => {
			difference += Math.abs(newFriendScores[index] - score)
		})

		if (difference < totalDifference){
			totalDifference = difference;
			matchName = friend.name;
			matchImg = friend.photo
		}
	});

	friends.push(newFriend);
	res.json({status: '200', 
	matchName: matchName,
	matchImg: matchImg});
});

module.exports = routerApi;

