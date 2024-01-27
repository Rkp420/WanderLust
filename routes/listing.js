const express = require("express");
const wrapAsync = require('../utils/wrapAsync.js');
const multer = require('multer');
const Listing = require('../models/listing.js');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

// const ExpressError = require('../utils/expressError.js');
// const { listingSchema } = require("../schema.js");

const { isLoggedIn , isOwner, validateListing } = require('../middleware.js');
const ListingController = require('../Controllers/listings.js');

const router = express.Router({mergeParams: true});

//index route
router.route("/")
.get(wrapAsync(ListingController.index))
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync( ListingController.create )
  );



// New Route
router.get("/new", isLoggedIn, ListingController.new);

//Show Route && Update && Delete Route
router.route("/:id")
.get(wrapAsync( ListingController.show ))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(ListingController.update)
  )
.delete(
  isLoggedIn,
  wrapAsync( ListingController.destroy )
  );


//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,  //Authentication Middleware
  wrapAsync( ListingController.edit ));

module.exports = router;