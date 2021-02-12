const express = require('express');
const axios = require('axios');

const env = require('../env');

const apiKey = "457ff21fab600bdc0161dd1ea135943d";
const userToken = "260c5623602921c5d6999e70c3a4874e7616012a5b1b86a76f3652eb386f917e";
const router = express.Router();
const myId = "5fb78a0e4d5b225efd617756";

// Start writing your integration here

router.get('/board',async(req,res)=>{
  const {boardName} = req.query;
  const {data:boards} = await axios.get(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${userToken}`);
  const {data:user} = await axios.get(`https://api.trello.com/1/members/me?key=${apiKey}&token=${userToken}`);
  console.log(user.id);
  
  let obj = {};
  let activeCards = 0;
  let openCards = 0;
  let myCards = 0;
  const board = boards.filter(e => e.name.toLowerCase() === boardName.toLowerCase());
  const {data:cards} = await axios.get(`https://api.trello.com/1/boards/${board[0].id}/cards?key=${apiKey}&token=${userToken}`);
  cards.map(c=> c.idMembers.length >0 ? c.idMembers == user.id? myCards++ : activeCards++ : openCards++);
  obj["open"] = openCards;
  obj["active"] = activeCards;
  obj["mine"] = myCards;
  res.json(obj);
})

router.get('/boards', async (req, res) => {
  let obj = {};
  let ownedBoards = 0;
  let participatingBoards = 0;
  const {data:boards} = await axios.get(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${userToken}`);
  const array = [];
  boards.map(b=> b.idMemberCreator == myId? ownedBoards++:participatingBoards++)
  obj["ownedBoards"] = ownedBoards;
  obj["participatingBoards"] = participatingBoards;
  res.json(obj);
})

// required setup route
router.get('/setup', (req, res) => {
  return res.status(200).json('setup route');
})

module.exports = router;
