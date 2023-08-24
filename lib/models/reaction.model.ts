import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Reaction =
  mongoose.models.Reaction ||
  mongoose.model("Reaction", reactionSchema);

export default Reaction;
