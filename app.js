var express = require("express")
var app = express()
var bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.get('/', function(req, res){
	res.render("landing")
})

var campgrounds = [
		{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1306&q=80"},
		{name: "Granite Hill", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1306&q=80"},
		{name: "Mountain Goa's Rest", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1306&q=80"},
		{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1306&q=80"},
		{name: "Granite Hill", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1306&q=80"},
		{name: "Mountain Goa's Rest", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1306&q=80"}

	]

app.get('/campgrounds', function(req, res){
	

	res.render("campgrounds", {campgrounds: campgrounds});
})
 
app.post("/campgrounds", function(req, res){

	//get data from form and add to camp array
	var name = req.body.name
	var image = req.body.image
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground)
	//redirect back to camp page

	res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function(req, res){
	res.render("new")
})

app.listen(3000, function () {
	console.log('The YelpCamp Server has started')
})