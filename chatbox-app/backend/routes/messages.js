const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET mensagens
router.get('/', async (req, res) => {
  const messages = await Message.find().sort({ createdAt: 1 });
  res.json(messages);
});

// POST nova mensagem
router.post('/', async (req, res) => {
  const newMsg = new Message({ text: req.body.text });
  await newMsg.save();
  res.status(201).json(newMsg);
});

module.exports = router;
