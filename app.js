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

//requring routes
var commentRoutes 		= require("./routes/comments.js"),
	campgroundRoutes 	= require("./routes/campgrounds.js"),
	indexRoutes 		= require("./routes/index.js")


// seedDB()  //seed the database
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

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments" ,commentRoutes)

app.listen(3000, function () {
	console.log('The YelpCamp Server has started')
})