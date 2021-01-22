const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll().then(pokemons => {
    res.render('Pokemon/index', { pokemons })
  })
  // TODO: Get all records from the DB and render to view
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(pokemon => {
    res.redirect('/pokemon')
  })
});

// router.get('/:id', (req, res) => {
//   db.pokemon.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//   .tjem(poke => {
//     let pokemonUrl
//     axios.get(pokemonUrl)
//   })
// })

router.get('/:name', (req, res) => {
  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
  .then(pokemonInfo => {
    let pokemonData = pokemonInfo.data
    res.render('pokemon/show', {
    name: pokemonData.name,
    image: pokemonData.sprites.front_shiny,
    types: pokemonData.types
    })
    }).catch(error =>{
      console.log(error)
    })
  })



module.exports = router;
