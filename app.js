var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport 	  = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground    = require("./models/campground.js"),
    seedDB 		  = require("./seeds.js"),
    Comment       = require("./models/comment.js"),
    User 		  = require("./models/user")

seedDB()
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))


//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Rusty is the best dog",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function (req, res, next) {
	res.locals.currentUser = req.user
	next()
})





app.get('/', function(req, res){
	res.render("landing")
})

//INDEX 

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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req,res) {
	
	// find campground by ID
	Campground.findById(req.params.id, function (err, campground) {
		if (err) {
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground})
		}
	})
	
})


app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
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

//AUTH ROUTES
//=================
//show register form
app.get("/register", function (req, res){
	res.render("register")
})
//handle sign up logic

app.post("/register", function (req, res) {
	var newUser = new User({username:req.body.username})
	User.register(newUser, req.body.password, function  (err, user) {
		if (err) {
			console.log(err)
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds")
		})
	})
})

// show login form
app.get("/login", function (req, res) {
	res.render("login")
})

//handlong login logic

app.post("/login", passport.authenticate("local", 
	{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
	}),function (req, res) {
	
})



// logic route

app.get("/logout",function (req,res) {
	req.logout()
	res.redirect("/campgrounds")
} )

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	} 
	res.redirect("/login")
}

app.listen(3000, function () {
	console.log('The YelpCamp Server has started')
})