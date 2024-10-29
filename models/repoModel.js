const mongoose = require("mongoose");
const { Schema } = mongoose;

const RepositorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    content: [
      {
        type: String,
      },
    ],
    visibility: {
      type: Boolean,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],
  },
  { timestamps: true } // Correctly set timestamps here
);

const Repository = mongoose.model("Repository", RepositorySchema);
module.exports = Repository;
