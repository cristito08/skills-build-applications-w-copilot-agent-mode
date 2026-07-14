import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    targetMuscles: [{ type: String, required: true, trim: true }],
    equipment: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = model<WorkoutDocument>('Workout', workoutSchema);

export default Workout;
