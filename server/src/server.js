// server.js

import express from 'express';
import cors from 'cors';
import * as webauthn from './webauthn';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// In-memory storage for demo purposes
const challenges = new Map();
const JWT_SECRET = process.env.JWT_SECRET;
const RP_ID = process.env.RP_ID;

// Start authentication
app.post('/auth/initiate', (req, res) => {
  const { userId } = req.body;

  const options = webauthn.server.generateAuthenticationOptions({
    rpID: RP_ID,
    userVerification: "preferred",
  });

  // Store challenge temporarily in memory
  challenges.set(userId, options.challenge);

  res.json(options);
});

// Complete authentication
app.post('/auth/complete', (req, res) => {
  const { userId, response } = req.body;
  const expectedChallenge = challenges.get(userId);

  if (!expectedChallenge) {
    return res.status(400).json({ error: "Challenge not found or expired." });
  }

  try {
    const verification = webauthn.server.verifyAuthenticationResponse({
      response,
      expectedChallenge,
    });

    if (verification.verified) {
      // Issue JWT without storing in a database
      const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    challenges.delete(userId); // Clean up challenge from memory after use
  }
});

app.listen(3000, () => console.log(`Auth service running on port 3000 with RP ID: ${RP_ID}`));
