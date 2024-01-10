const express = require('express');
const router = express.Router();
const Concept = require('../models/Concept');


router.get('/', async (req, res) => {
    try {
        const concepts = await Concept.find({}); // Fetch all concepts from the database
        res.render('home', { concepts }); // Pass fetched concepts to the view
    } catch (error) {
        console.error("Error fetching concepts:", error);
        res.render('home', { concepts: [] }); // Render the view with an empty array if an error occurs
    }
});

router.post('/add', async (req, res) => { // Make sure this line has async keyword
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
        const { concept, definition } = req.body; // Retrieve updated concept and definition from the form

        const updatedConcept = await Concept.findOneAndUpdate(
            { _id: req.params.id }, // condition to find the document
            { $set: { concept, definition } }, // update to be applied
            { new: true } // to return the updated document
        );

        console.log("Updated Concept:", updatedConcept);
        res.redirect("/"); // Redirect to the home page or any desired route
    } catch (error) {
        console.error("Error:", error);
        res.send("Error updating concept");
    }
});


// Assuming this is the route for rendering the edit form for a specific concept
router.get("/edit/:id", async (req, res) => {
    try {
        const concept = await Concept.findById(req.params.id);
        res.render('edit', { concept }); // Render the edit form with the concept details
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
