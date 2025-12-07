// SAVE chat history endpoint
const { connectToDatabase } = require('../lib/mongodb');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { userId, messages, updatedAt } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        if (!Array.isArray(messages)) {
            return res.status(400).json({ error: 'messages must be an array' });
        }

        const { db } = await connectToDatabase();
        const collection = db.collection('chat_history');

        // Upsert (update if exists, insert if not)
        const result = await collection.updateOne(
            { userId },
            {
                $set: {
                    messages,
                    updatedAt: updatedAt || new Date().toISOString()
                }
            },
            { upsert: true }
        );

        return res.status(200).json({
            success: true,
            matched: result.matchedCount,
            modified: result.modifiedCount,
            upserted: result.upsertedCount
        });
    } catch (error) {
        console.error('MongoDB SAVE Error:', error);
        return res.status(500).json({
            error: 'Failed to save chat history',
            details: error.message
        });
    }
};
