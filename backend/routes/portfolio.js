const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Academic = require('../models/Academic');

// Update bio
router.put('/bio', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.bio = req.body.bio;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add academic detail
router.post('/academic', auth, async (req, res) => {
  try {
    const academic = new Academic({
      ...req.body,
      user: req.user.id
    });
    await academic.save();
    res.status(201).json(academic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update academic detail
router.put('/academic/:id', auth, async (req, res) => {
  try {
    const academic = await Academic.findOne({ _id: req.params.id, user: req.user.id });
    if (!academic) {
      return res.status(404).json({ message: 'Academic detail not found' });
    }
    Object.assign(academic, req.body);
    await academic.save();
    res.json(academic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete academic detail
router.delete('/academic/:id', auth, async (req, res) => {
  try {
    const academic = await Academic.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!academic) {
      return res.status(404).json({ message: 'Academic detail not found' });
    }
    res.json({ message: 'Academic detail deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add project
router.post('/project', auth, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      user: req.user.id
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update project
router.put('/project/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    Object.assign(project, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete project
router.delete('/project/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Project Routes
router.get('/project', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Academic Routes
router.get('/academic', auth, async (req, res) => {
  try {
    const academics = await Academic.find({ user: req.user.id });
    res.json(academics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 