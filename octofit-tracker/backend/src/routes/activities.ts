import { Router } from 'express';
import Activity from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const items = await Activity.find()
      .populate('user', 'name email fitnessLevel')
      .populate('team', 'name')
      .sort({ performedAt: -1 })
      .lean();
    res.json({ resource: 'activities', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default activitiesRouter;
