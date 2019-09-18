var  mongoose = require("mongoose")
var Campground = require("./models/campground.js")
var Comment = require("./models/comment.js")

var data = [
	{
		name: "Camp1", 
		image: "https://media.istockphoto.com/photos/friends-hikers-sitting-beside-camp-and-tents-in-the-night-picture-id678554980",
		description: "blah-blah-blah" 
	},
	{
		name: "Camp2", 
		image: "https://media.istockphoto.com/photos/friends-hikers-sitting-beside-camp-and-tents-in-the-night-picture-id678554980",
		description: "blah-blah-blah" 
	},
	{
		name: "Camp3", 
		image: "https://media.istockphoto.com/photos/friends-hikers-sitting-beside-camp-and-tents-in-the-night-picture-id678554980",
		description: "blah-blah-blah" 
	}
]

function  seedDB() {
	// remove all campgrounds
		Campground.deleteMany({}, function (err) {
		// if (err) {
		// 	console.log(err)
		// }
		// console.log("removed campground")
		// // add a few campgrounds
		// data.forEach(function(seed){
		// 	Campground.create(seed, function (err, campground) {
		// 		if (err) {
		// 			console.log(err)
		// 		} else {
		// 			console.log('added a campground');
		// 			//create a comment
		// 			Comment.create(
		// 				{text: "BLAH-BLAH-BLAH",
		// 				 author: "Homer"
		// 				}, function (err, comment) {
		// 					if (err) {
		// 						console.log(err)
		// 					} else {
		// 						campground.comments.push(comment);
		// 						campground.save()
		// 						console.log('Created a comment')
		// 					}
							
		// 				})
		// 		}
		// 	})
		// })
	})
	

	
	// add a few comments
}


module.exports = seedDB

