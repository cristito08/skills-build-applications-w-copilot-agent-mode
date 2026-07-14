import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const items = await Leaderboard.find()
      .populate('entries.user', 'name email fitnessLevel')
      .sort({ startsAt: -1 })
      .lean();
    res.json({ resource: 'leaderboard', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default leaderboardRouter;
