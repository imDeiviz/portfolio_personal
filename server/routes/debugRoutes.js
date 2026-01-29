const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

// RUTA DE DEBUG TEMPORAL - BORRAR DESPUÉS
router.get('/db-check', async (req, res) => {
    try {
        const users = await User.find({}, 'email role');
        const dbName = mongoose.connection.name;
        const host = mongoose.connection.host;

        // Censurar password de la URI
        const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@') : 'No definida';

        res.json({
            status: 'Debug Info',
            database: dbName,
            host: host,
            userCount: users.length,
            users: users,
            nodeEnv: process.env.NODE_ENV,
            uriMasked: uri
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
