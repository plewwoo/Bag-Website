const express = require('express');
const router = express.Router();

const bags = require('../data/all_data');
let currentBagsId = 18;

router.get('/', (req,res) => {
    res.json(bags);
});

router.get('/:id', (req,res) => {
    const bagsId = Number.parseInt(req.params.id, 10);
    const bag = bags.find((bag) => bag.id === bagsId)
    res.json(bag);
});

router.post('/', (req,res) => {
    currentBagsId +=1;
   const newBag = {
       id: currentBagsId,
       ...req.body
   };
   bags.push(newBag);
    res.json(newBag);
});

router.put('/:id',(req,res) => {
    const bagsId = Number.parseInt(req.params.id, 10);
    const bagIndex = bags.findIndex((bag) => bag.id === bagsId);
    const updatedBag = {
        id: bagsId,
        ...req.body
    };
    bags[bagIndex] = updatedBag;
    res.json(updatedBag);
});

router.delete('/:id', (req,res) => {
    const bagsId = Number.parseInt(req.params.id, 10);
    const bagIndex = bags.findIndex((bag) => bag.id === bagsId)
    restaurants.splice(bagIndex, 1);
    res.sendStatus(204)
});

module.exports = router;