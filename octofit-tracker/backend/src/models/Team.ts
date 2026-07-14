import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    weeklyTargetMinutes: { type: Number, min: 0, required: true },
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema> & {
  members: Types.ObjectId[];
};

const Team = model<TeamDocument>('Team', teamSchema);

export default Team;
