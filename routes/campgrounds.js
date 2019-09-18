var express = require("express")
var router = express.Router()
var Campground = require("../models/campground.js")
var Comment = require("../models/comment.js")


//INDEX 

router.get('/', function(req, res){
	
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log('Smth went wrong!')
			console.log(err)
		} else {
				res.render("campgrounds/index", {campgrounds: allCampgrounds});
			}
	})
	 
})
 
 //create route
router.post("/", isLoggedIn, function(req, res){

	//get data from form and add to camp array
	var name = req.body.name
	var image = req.body.image
	var description = req.body.description
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: description, author: author}
	

	// create new camp and save to db

	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err)
		} else {
			//redirect back to camp page
			res.redirect("/campgrounds")
		}
	})

})

//NEW
router.get("/new",isLoggedIn, function(req, res){
	res.render("campgrounds/new")
})


// SHOW - shows more info about one camp

router.get("/:id", function(req, res){
	//find the campground with proveded id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err) {
			console.log(err)
		} else {
			console.log(foundCampground)
			// render shoq template 
			res.render("campgrounds/show", {campground: foundCampground})
		}
	})
	
	// render show template with that campground

})
//middleware
function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	} 
	res.redirect("/login")
}


module.exports = router