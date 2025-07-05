const express = require("express");
const router = express.Router();

// Dummy data
let polls = [
  {
    id: "1",
    question: "What's your favorite color?",
    options: ["Red", "Blue", "Green"],
    votes: [0, 0, 0],
  },
];

// Get all polls
router.get("/", (req, res) => {
  res.json(polls);
});

// Submit a vote
router.post("/vote", (req, res) => {
  const { pollId, optionIndex } = req.body;
  const poll = polls.find((p) => p.id === pollId);

  if (poll && poll.votes[optionIndex] !== undefined) {
    poll.votes[optionIndex]++;
    return res.json({ success: true, poll });
  } else {
    return res.status(400).json({ success: false, message: "Invalid vote" });
  }
});

// POST: Create a new poll
router.post("/", (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ success: false, message: "Invalid poll data" });
  }

  const newPoll = {
    id: Date.now().toString(),
    question,
    options,
    votes: Array(options.length).fill(0),
  };

  polls.push(newPoll);
  return res.status(201).json({ success: true, poll: newPoll });
});

module.exports = router;
