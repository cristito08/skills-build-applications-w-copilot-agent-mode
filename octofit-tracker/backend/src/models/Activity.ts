import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: {
      type: String,
      enum: ['run', 'walk', 'cycling', 'strength', 'yoga', 'swim'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    caloriesBurned: { type: Number, min: 0, required: true },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = model<ActivityDocument>('Activity', activitySchema);

export default Activity;
