const express = require('express');
const DonorProfile = require('../models/DonorProfile');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create or Update donor profile
router.post('/profile', protect, async (req, res) => {
  try {
    let profile = await DonorProfile.findOne({ user: req.user._id });
    if (profile) {
      Object.assign(profile, req.body);
      profile = await profile.save();
    } else {
      profile = await DonorProfile.create({ ...req.body, user: req.user._id });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get my donor profile
router.get('/profile/me', protect, async (req, res) => {
  try {
    const profile = await DonorProfile.findOne({ user: req.user._id }).populate('user', 'name email phone');
    if (!profile) {
      return res.status(404).json({ message: 'Donor profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all donors with filtering
router.get('/', protect, async (req, res) => {
  try {
    const { bloodGroup, department, availability } = req.query;
    let filter = {};
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (department) filter.department = { $regex: department, $options: 'i' };
    if (availability) filter.availability = availability;

    const donors = await DonorProfile.find(filter)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update availability
router.patch('/availability', protect, async (req, res) => {
  try {
    const profile = await DonorProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Donor profile not found' });
    }
    profile.availability = req.body.availability;
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get donor by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const donor = await DonorProfile.findById(req.params.id).populate('user', 'name email phone');
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;