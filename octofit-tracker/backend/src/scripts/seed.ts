import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Sofia Reyes',
        email: 'sofia.reyes@octofit.dev',
        age: 29,
        fitnessLevel: 'advanced',
        weeklyGoalMinutes: 320,
      },
      {
        name: 'Mateo Cruz',
        email: 'mateo.cruz@octofit.dev',
        age: 34,
        fitnessLevel: 'intermediate',
        weeklyGoalMinutes: 240,
      },
      {
        name: 'Valentina Ortiz',
        email: 'valentina.ortiz@octofit.dev',
        age: 26,
        fitnessLevel: 'beginner',
        weeklyGoalMinutes: 180,
      },
      {
        name: 'Diego Navarro',
        email: 'diego.navarro@octofit.dev',
        age: 31,
        fitnessLevel: 'intermediate',
        weeklyGoalMinutes: 210,
      },
      {
        name: 'Camila Vega',
        email: 'camila.vega@octofit.dev',
        age: 28,
        fitnessLevel: 'advanced',
        weeklyGoalMinutes: 300,
      },
    ]);

    const [sofia, mateo, valentina, diego, camila] = users;

    const teams = await Team.insertMany([
      {
        name: 'Andes Endurance',
        description: 'Team focused on cardio consistency and long-distance sessions.',
        createdBy: sofia._id,
        members: [sofia._id, mateo._id, diego._id],
        weeklyTargetMinutes: 720,
      },
      {
        name: 'Core Builders',
        description: 'Strength and mobility group for full-body conditioning.',
        createdBy: camila._id,
        members: [camila._id, valentina._id, mateo._id],
        weeklyTargetMinutes: 600,
      },
    ]);

    const [andesEndurance, coreBuilders] = teams;

    await Workout.insertMany([
      {
        title: '5K Progression Run',
        level: 'intermediate',
        durationMinutes: 45,
        targetMuscles: ['legs', 'core'],
        equipment: ['running shoes'],
      },
      {
        title: 'Upper Body Strength Circuit',
        level: 'advanced',
        durationMinutes: 50,
        targetMuscles: ['chest', 'back', 'shoulders'],
        equipment: ['dumbbells', 'bench'],
      },
      {
        title: 'Beginner Mobility Flow',
        level: 'beginner',
        durationMinutes: 25,
        targetMuscles: ['hips', 'hamstrings', 'lower back'],
        equipment: ['yoga mat'],
      },
      {
        title: 'Tempo Cycling Session',
        level: 'intermediate',
        durationMinutes: 40,
        targetMuscles: ['legs', 'glutes'],
        equipment: ['stationary bike'],
      },
      {
        title: 'Full Body HIIT Blast',
        level: 'advanced',
        durationMinutes: 35,
        targetMuscles: ['core', 'legs', 'shoulders'],
        equipment: ['kettlebell', 'jump rope'],
      },
      {
        title: 'Recovery Yoga Session',
        level: 'beginner',
        durationMinutes: 30,
        targetMuscles: ['core', 'hips', 'back'],
        equipment: ['yoga mat', 'strap'],
      },
    ]);

    const now = Date.now();

    await Activity.insertMany([
      {
        user: sofia._id,
        team: andesEndurance._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 510,
        performedAt: new Date(now - 1000 * 60 * 60 * 24 * 1),
      },
      {
        user: mateo._id,
        team: andesEndurance._id,
        type: 'cycling',
        durationMinutes: 47,
        caloriesBurned: 430,
        performedAt: new Date(now - 1000 * 60 * 60 * 24 * 2),
      },
      {
        user: diego._id,
        team: andesEndurance._id,
        type: 'walk',
        durationMinutes: 38,
        caloriesBurned: 220,
        performedAt: new Date(now - 1000 * 60 * 60 * 24 * 2),
      },
      {
        user: camila._id,
        team: coreBuilders._id,
        type: 'strength',
        durationMinutes: 55,
        caloriesBurned: 480,
        performedAt: new Date(now - 1000 * 60 * 60 * 24 * 1),
      },
      {
        user: valentina._id,
        team: coreBuilders._id,
        type: 'yoga',
        durationMinutes: 33,
        caloriesBurned: 140,
        performedAt: new Date(now - 1000 * 60 * 60 * 24 * 3),
      },
      {
        user: mateo._id,
        team: coreBuilders._id,
        type: 'strength',
        durationMinutes: 41,
        caloriesBurned: 350,
        performedAt: new Date(now - 1000 * 60 * 60 * 24 * 4),
      },
      {
        user: sofia._id,
        team: andesEndurance._id,
        type: 'run',
        durationMinutes: 62,
        caloriesBurned: 590,
        performedAt: new Date(now - 1000 * 60 * 60 * 24 * 5),
      },
      {
        user: camila._id,
        team: coreBuilders._id,
        type: 'swim',
        durationMinutes: 44,
        caloriesBurned: 410,
        performedAt: new Date(now - 1000 * 60 * 60 * 24 * 6),
      },
    ]);

    await Leaderboard.insertMany([
      {
        periodLabel: 'Week 28 - 2026',
        startsAt: new Date('2026-07-06T00:00:00.000Z'),
        endsAt: new Date('2026-07-12T23:59:59.000Z'),
        entries: [
          { user: sofia._id, points: 930, rank: 1 },
          { user: camila._id, points: 870, rank: 2 },
          { user: mateo._id, points: 760, rank: 3 },
          { user: diego._id, points: 610, rank: 4 },
          { user: valentina._id, points: 520, rank: 5 },
        ],
      },
      {
        periodLabel: 'Week 27 - 2026',
        startsAt: new Date('2026-06-29T00:00:00.000Z'),
        endsAt: new Date('2026-07-05T23:59:59.000Z'),
        entries: [
          { user: camila._id, points: 910, rank: 1 },
          { user: sofia._id, points: 890, rank: 2 },
          { user: mateo._id, points: 720, rank: 3 },
          { user: valentina._id, points: 560, rank: 4 },
          { user: diego._id, points: 540, rank: 5 },
        ],
      },
    ]);

    console.log('Inserted sample data for users, teams, activities, leaderboard, and workouts');

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
