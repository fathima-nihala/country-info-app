import { Router } from 'express';
import countryRoutes from './countryRoutes';

const router = Router();

router.use('/countries', countryRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
});

export default router;
