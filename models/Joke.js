import { Schema, model, models } from 'mongoose';

const JokeSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Joke = models.Joke || model('Joke', JokeSchema);

export default Joke;
