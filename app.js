var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")


// Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
	  

})
var Campground = mongoose.model("Campground", campgroundSchema)




app.get('/', function(req, res){
	res.render("landing")
})



app.get('/campgrounds', function(req, res){
	
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log('Smth went wrong!')
			console.log(err)
		} else {
				res.render("index", {campgrounds: allCampgrounds});
			}
	})
	 
})
 
app.post("/campgrounds", function(req, res){

	//get data from form and add to camp array
	var name = req.body.name
	var image = req.body.image
	var description = req.body.description
	var newCampground = {name: name, image: image, description: description}
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


app.get("/campgrounds/new", function(req, res){
	res.render("new")
})


// SHOW - shows more info about one camp

app.get("/campgrounds/:id", function(req, res){
	//find the campground with proveded id
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			console.log(err)
		} else {
			// render shoq template 
			res.render("show", {campground: foundCampground})
		}
	})
	
	// render show template with that campground

})

app.listen(3000, function () {
	console.log('The YelpCamp Server has started')
})