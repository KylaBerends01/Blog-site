require('../models/database');
const Category = require('../models/Category');
const Blog = require('../models/Blog');

// GET
// Home page
exports.homepage = async(req, res) => {
    try{
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Blog.find({}).sort({_id: -1}).limit(limitNumber);
        const drone = await Blog.find({ 'category': 'Drone'}).limit(limitNumber);
        const photos = await Blog.find({ 'category': 'Photos'}).limit(limitNumber);
        const video = await Blog.find({ 'category': 'Video'}).limit(limitNumber);

        const content = {latest, drone, photos, video};

        res.render('index', { title: 'Cooking Blog - Homepage', categories, content});
    }catch (error){
        res.status(500).send({message: error.message} || "Error Occured")
    }
} 

// GET / Categories 
// Categories 
exports.exploreCategories = async(req, res) => {
    try{
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Categories', categories });
    }catch (error){
        res.status(500).send({message: error.message} || "Error Occured")
    };
};

// GET / Categories/:id
// Categories by Id
exports.exploreCategoriesById = async(req, res) => {
    try{
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Blog.find({ 'category': categoryId }).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Categories', categoryById });
    }   catch (error){
        res.status(500).send({message: error.message} || "Error Occured")
    };
};


// GET / Blog/:id
// Blog

exports.exploreBlog = async(req, res) => {
    try{
        let blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        res.render('blog', { title: 'Camera Blog - Blog', blog});
    }catch (error){
        res.status(500).send({message: error.message} || "Error Occured")
    };
};


// POST / search
// search
exports.searchBlog = async(req, res) => {

    // searchTerm
    try {
        let searchTerm = req.body.searchTerm;
        let blog = await Blog.find({ $text : {$search: searchTerm, $diacriticSensitive: true}});
        res.render('search', { title: 'Blog - Search', blog});
    } catch (error) {
        res.status(500).send({message: error.message} || "Error Occured")
    }
}

// GET / explore-latest
// Explore Latest

exports.exploreLatest = async(req, res) => {
    try{
        const limitNumber = 20;
        const blog = await Blog.find({}).sort({ _id: -1}).limit(limitNumber);
        res.render('explore-latest', { title: 'Camera Blog - Explore Latest', blog});
    }catch (error){
        res.status(500).send({message: error.message} || "Error Occured")
    };
};


// GET / explore-random
// Explore Random

exports.exploreRandom = async(req, res) => {
    try{
       let count = await Blog.find().countDocuments();
       let random = Math.floor(Math.random() * count);
       let blog = await Blog.findOne().skip(random).exec();
        res.render('explore-random', { title: 'Camera Blog - Explore Latest', blog});
    }catch (error){
        res.status(500).send({message: error.message} || "Error Occured")
    };
};


// GET / submit-recipe
// Subm
exports.submitBlog = async(req, res) => {
    const infoErrorObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-blog', { title: 'Camera Blog - Submit Blog', infoErrorObj, infoSubmitObj});
} 

// POST / submit-recipe
// Subm
exports.submitBlogOnPost = async(req, res) => {

    try {
        const newBlog = new Blog({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image,
        });
        await newBlog.save(); 
        req.flash('infoSubmit', 'Blog has been added.');
        res.redirect('/submit-blog');
    } catch (error) {
        // res.json(error);
        req.flash('infoErrors', error );
        res.redirect('/submit-blog');
    };
};






// async function updateRecipe(){
//     try {
//         const response = await Recipe.updateOne({name: "New Recipe"}, {name: "New Recipe Updated"});
//         res.n; // number of documents matched
//         res.nModified; // number of documents modified
//     } catch (error) {
//         console.log(error);
//     }
// }

// updateRecipe();

// async function insertDummyCategoryData(){
//     try {
//         await Category.insertMany([
//                   {
//                     "name": "Thai",
//                     "image": "thai-food.jpg"
//                   },
//                   {
//                     "name": "American",
//                     "image": "american-food.jpg"
//                   }, 
//                   {
//                     "name": "Chinese",
//                     "image": "chinese-food.jpg"
//                   },
//                   {
//                     "name": "Mexican",
//                     "image": "mexican-food.jpg"
//                   }, 
//                   {
//                     "name": "Indian",
//                     "image": "indian-food.jpg"
//                   },
//                   {
//                     "name": "Spanish",
//                     "image": "spanish-food.jpg"
//                   }
//                 ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }
// insertDummyCategoryData();


// async function insertDummyBlogData(){
//     try {
//         await Blog.insertMany([
//                   {
//                     "name": "Above the Lens",
//                     "description": "Capturing the World with Drones",
//                     "author": "Chat.GPT",
//                     "content": [
//                         `Drones have revolutionized the way we capture the world around us. With the ability to fly high in the sky, these tiny flying machines provide a unique perspective on the world that was previously impossible to achieve.
//                         As a drone videographer, I have had the pleasure of capturing some truly stunning footage from above. From soaring over majestic mountain ranges to capturing sweeping views of bustling cities, drones offer endless opportunities for creative expression.",
//                         "One of the most exciting aspects of drone videography is the ability to capture footage that was previously impossible to obtain. Drones can fly into tight spaces, capture fast-moving action, and provide a bird's-eye view of the world that was previously reserved for pilots and astronauts.,
//                         However, with great power comes great responsibility. As drone operators, it's important that we follow regulations and guidelines to ensure the safety of others and ourselves. This includes obtaining the necessary permits and licenses, flying in designated areas, and respecting people's privacy.
//                         In addition to adhering to regulations, it's also important for drone videographers to focus on capturing footage that tells a story. Whether it's showcasing the beauty of nature or highlighting the hustle and bustle of city life, a great drone video should have a clear narrative and purpose.
//                         In conclusion, drones have opened up a world of possibilities for videographers. By taking to the skies, we can capture unique perspectives on the world around us and tell stories that were previously impossible to tell. As long as we fly responsibly and with purpose, the possibilities for creative expression are truly endless.`
//                         ],
//                     "category": "Drone",
//                     "image": "https://i.ibb.co/sHZrxbV/Drone-Photo-2x.jpg",
//                   },

//                   {
//                     "name": "Above the Lens",
//                     "description": "Capturing the World with Drones",
//                     "author": "Chat.GPT",
//                     "content": [
//                         `Drones have revolutionized the way we capture the world around us. With the ability to fly high in the sky, these tiny flying machines provide a unique perspective on the world that was previously impossible to achieve.
//                         As a drone videographer, I have had the pleasure of capturing some truly stunning footage from above. From soaring over majestic mountain ranges to capturing sweeping views of bustling cities, drones offer endless opportunities for creative expression.",
//                         "One of the most exciting aspects of drone videography is the ability to capture footage that was previously impossible to obtain. Drones can fly into tight spaces, capture fast-moving action, and provide a bird's-eye view of the world that was previously reserved for pilots and astronauts.,
//                         However, with great power comes great responsibility. As drone operators, it's important that we follow regulations and guidelines to ensure the safety of others and ourselves. This includes obtaining the necessary permits and licenses, flying in designated areas, and respecting people's privacy.
//                         In addition to adhering to regulations, it's also important for drone videographers to focus on capturing footage that tells a story. Whether it's showcasing the beauty of nature or highlighting the hustle and bustle of city life, a great drone video should have a clear narrative and purpose.
//                         In conclusion, drones have opened up a world of possibilities for videographers. By taking to the skies, we can capture unique perspectives on the world around us and tell stories that were previously impossible to tell. As long as we fly responsibly and with purpose, the possibilities for creative expression are truly endless.`],
//                     "category": "Drone",
//                     "image": "https://i.ibb.co/sHZrxbV/Drone-Photo-2x.jpg",
//                   },

//                   {
//                     "name": "Above the Lens",
//                     "description": "Capturing the World with Drones",
//                     "author": "Chat.GPT",
//                     "content": [
//                         `Drones have revolutionized the way we capture the world around us. With the ability to fly high in the sky, these tiny flying machines provide a unique perspective on the world that was previously impossible to achieve.
//                         As a drone videographer, I have had the pleasure of capturing some truly stunning footage from above. From soaring over majestic mountain ranges to capturing sweeping views of bustling cities, drones offer endless opportunities for creative expression.",
//                         "One of the most exciting aspects of drone videography is the ability to capture footage that was previously impossible to obtain. Drones can fly into tight spaces, capture fast-moving action, and provide a bird's-eye view of the world that was previously reserved for pilots and astronauts.,
//                         However, with great power comes great responsibility. As drone operators, it's important that we follow regulations and guidelines to ensure the safety of others and ourselves. This includes obtaining the necessary permits and licenses, flying in designated areas, and respecting people's privacy.
//                         In addition to adhering to regulations, it's also important for drone videographers to focus on capturing footage that tells a story. Whether it's showcasing the beauty of nature or highlighting the hustle and bustle of city life, a great drone video should have a clear narrative and purpose.
//                         In conclusion, drones have opened up a world of possibilities for videographers. By taking to the skies, we can capture unique perspectives on the world around us and tell stories that were previously impossible to tell. As long as we fly responsibly and with purpose, the possibilities for creative expression are truly endless.`],
//                     "category": "Drone",
//                     "image": "https://i.ibb.co/sHZrxbV/Drone-Photo-2x.jpg",
//                   },
//                 ]);
//     } catch (error) {
//         console.log('err', + error)
//     };
// };

// insertDummyBlogData();