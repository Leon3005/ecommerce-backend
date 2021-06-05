const { Router } = require("express");

const apiRoutes = require("./api");

const router = Router();

//  Using Express Router to define the /api route.
router.use("/api", apiRoutes);

// If the route doesn't exist, the below is returned:
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
