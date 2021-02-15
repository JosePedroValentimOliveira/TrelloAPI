const express = require('express');
const axios = require('axios');

const env = require('../env');

const router = express.Router();

const apiKey = "457ff21fab600bdc0161dd1ea135943d";
const userToken = "260c5623602921c5d6999e70c3a4874e7616012a5b1b86a76f3652eb386f917e";
const myId = "5fb78a0e4d5b225efd617756";

// Start writing your integration here

router.get('/board',async(req,res)=>{
  const {boardName} = req.query;

  
  const [boardsData,userData] = await Promise.all(
    [
      axios.get(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${userToken}`),
      axios.get(`https://api.trello.com/1/members/me?key=${apiKey}&token=${userToken}`)
    ]);

  const boards = boardsData.data;
  const user = userData.data;
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
  const [boardsData,userData] = await Promise.all(
      [
        axios.get(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${userToken}`),
        axios.get(`https://api.trello.com/1/members/me?key=${apiKey}&token=${userToken}`)
      ]);

  
  const boards = boardsData.data;
  const user = userData.data;
  let obj = {};
  obj.ownedBoards = {quantity:0};
  obj.participatingBoards = {quantity:0};
  obj.ownedBoards.boards= [];
  obj.participatingBoards.boards= [];
  
  for (let i = 0; i < boards.length; i++) {
    const b = boards[i];
    let cardsObj = {};
    let activeCards = 0;
    let openCards = 0;
    let myCards = 0;
    const {data:cards} = await axios.get(`https://api.trello.com/1/boards/${b.id}/cards?key=${apiKey}&token=${userToken}`);
    cards.map(c=> c.idMembers.length >0 ? c.idMembers == user.id? myCards++ : activeCards++ : openCards++);
    cardsObj["open"] = openCards;
    cardsObj["active"] = activeCards;
    cardsObj["mine"] = myCards;
    if(b.idMemberCreator == myId){
      obj.ownedBoards.quantity ++;
      obj.ownedBoards.boards.push({name:b.name,cards:cardsObj})
    }
    else{
      obj.participatingBoards.quantity ++;
      obj.participatingBoards.boards.push({name:b.name,cards:cardsObj})
    }
  }
  
  res.json(obj);
})

// required setup route
router.get('/setup', (req, res) => {
  return res.status(200).json('setup route');
})

module.exports = router;
