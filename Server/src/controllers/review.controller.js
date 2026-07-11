import Review from "../models/reviewSchema.js";


const postReviews = async (req, res) => {
        try {
            const { name, comment, rating } = req.body;
            
            // Create a new review instance
            const newReview = new Review({ name, comment, rating });
            // Save the review to the database
            const savedReview = await newReview.save();
        
            res.status(201).json({ message: 'Review added successfully', review: savedReview });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
          }
}


const getReviews = async (req, res) => {
    try {
        // Fetch all reviews from the database
        const reviews = await Review.find();
        if(!reviews) {
            return res.status(404).send('No reviews found!!!')
        }
        return res.status(201).send({
            message:'Reviews found successfully',
            data:reviews
        })
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      }
}


export {
    postReviews,
    getReviews
}