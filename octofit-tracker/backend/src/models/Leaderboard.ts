import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    periodLabel: { type: String, required: true, trim: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    entries: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        points: { type: Number, min: 0, required: true },
        rank: { type: Number, min: 1, required: true },
      },
    ],
  },
  { timestamps: true }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

export default Leaderboard;
