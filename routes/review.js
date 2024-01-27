const express = require("express");
const wrapAsync = require('../utils/wrapAsync.js');
const reviewRouter = express.Router({mergeParams: true});

const { validateReview , isLoggedIn, isReviewAuthor} = require('../middleware.js');

const ReviewController = require('../Controllers/review.js');
  
  //Post Route For Reviews

  reviewRouter.post("/",
    isLoggedIn,
    validateReview ,
    wrapAsync( ReviewController.create ));


  //Delete Route for Reviews

  reviewRouter.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync( ReviewController.destroy ));

  module.exports = reviewRouter;