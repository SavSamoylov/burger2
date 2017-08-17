const express = require('express')
const db = require('../models')

let router = express.Router();


// Show all Burgers
router.get("/", (req, res)=>{

  db.burgers.findAll({order: [['burger_name', 'ASC']]}).then(function(result){
    let handlebarsObj = {
      burgers: result
    }
    res.render("index", handlebarsObj)
  })


})

router.put("/:id", (req,res)=>{
  let burger_id = req.params.id;

  db.burgers.update(
    {
      devoured: true,
    },
    {
      where: {id: burger_id}
    })
    .then(function(result){

          res.redirect("/")

    })

  })

  router.post("/", (req,res)=>{

    db.burgers.create({burger_name: req.body.burger_name})
              .then((results)=>{
                res.redirect("/")
              })


  })

  // router.put("/:id", (req,res)=>{
  //   let burger_id = req.params.id;
  //
  //   burgers.updateOne(burger_id, (result)=>{
  //     res.redirect("/")
  //   })
  //
  // })
  //
  // router.post("/", (req,res)=>{
  //   let burgerName = req.body.burger_name;
  //
  //   burgers.insertOne(burgerName, (result)=>{
  //     res.redirect("/");
  //   })
  // })

  module.exports = router;
