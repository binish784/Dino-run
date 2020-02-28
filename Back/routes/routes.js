const express= require("express");

const router= express.Router();

const controller = require("../controller/score");

router.post("/",controller.saveScore);

router.get("*",controller.notFound);


module.exports=router;