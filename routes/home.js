const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Concept = require('../models/Concept');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', async (req, res) => {
    try {
        const concepts = await Concept.find({}); 
        res.render('home', { concepts }); 
    } catch (error) {
        console.error("Error fetching concepts:", error);
        res.render('home', { concepts: [] }); 
    }
});

router.post('/add', async (req, res) => { 
  const { concept, definition } = req.body;

  console.log(concept, definition);

  try {
    const conceptDef = new Concept({
      concept: concept,
      definition: definition
    });

    await conceptDef.save();
    console.log("Concept added successfully");

    res.redirect("/")
  } catch (error) {
    console.error("Something went wrong:", error);
    res.send("Error occurred while adding concept");

  }
});

router.post("/edit/:id", async (req, res) => {
    try {
        const { concept, definition } = req.body; 

        const updatedConcept = await Concept.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: { concept, definition } }, 
            { new: true } 
        );

        console.log("Updated Concept:", updatedConcept);
        res.redirect("/"); 
    } catch (error) {
        console.error("Error:", error);
        res.send("Error updating concept");
    }
});



router.get("/edit/:id", async (req, res) => {
    try {
        const concept = await Concept.findById(req.params.id);
        res.render('edit', { concept }); 
    } catch (error) {
        console.error("Error:", error);
        res.send("Error fetching concept for editing");
    }
});


router.get("/delete/:id", async (req, res) => {
    try {
        await Concept.findByIdAndDelete(req.params.id);
        console.log("Concept deleted successfully");
        res.redirect("/");
    } catch (error) {
        console.error("Error:", error);
        res.send("Error deleting concept");
    }
});




module.exports = router;
