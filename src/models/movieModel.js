import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, "Please provide a title"],
  },
  publishing_year: {
    type: String,
  },
  image: {
    type: [String],
  },

  //   forgotPasswordToken: String,
  //   forgotPasswordTokenExpiry: Date,
  //   verifyToken: String,
  //   verifyTokenExpiry: Date,
});

const Movies = mongoose.models.movies || mongoose.model("movies", movieSchema);

export default Movies;
