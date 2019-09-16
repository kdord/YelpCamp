var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground.js"),
    seedDB 		  = require("./seeds.js"),
    Comment       = require("./models/comment.js")

seedDB()
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")






app.get('/', function(req, res){
	res.render("landing")
})



app.get('/campgrounds', function(req, res){
	
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log('Smth went wrong!')
			console.log(err)
		} else {
				res.render("campgrounds/index", {campgrounds: allCampgrounds});
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

//NEW
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new")
})


// SHOW - shows more info about one camp

app.get("/campgrounds/:id", function(req, res){
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


//=============================================
// COMMENTS ROUTES

app.get("/campgrounds/:id/comments/new", function (req,res) {
	
	// find campground by ID
	Campground.findById(req.params.id, function (err, campground) {
		if (err) {
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground})
		}
	})
	
})


app.post("/campgrounds/:id/comments", function (req, res) {
	// lookup campground using id
	Campground.findById(req.params.id, function (err, campground) {
		if (err) {
			console.log(err)
			redirect("/campgrounds")
		} else {
			

			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err)
				} else {
					campground.comments.push(comment)
					campground.save()
					res.redirect("/campgrounds/"+campground._id)
				}
			})
		}
	})
	// create new comment
	// connect new comment to campground
	// redirect to campground show page
})

//=============================================



app.listen(3000, function () {
	console.log('The YelpCamp Server has started')
})