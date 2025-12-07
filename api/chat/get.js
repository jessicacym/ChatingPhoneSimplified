// GET chat history endpoint
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
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const { db } = await connectToDatabase();
        const collection = db.collection('chat_history');

        // Find chat history for this user
        const chatDoc = await collection.findOne({ userId });

        if (!chatDoc) {
            // Return empty messages array if no history found
            return res.status(200).json({ messages: [] });
        }

        return res.status(200).json({
            messages: chatDoc.messages || [],
            updatedAt: chatDoc.updatedAt
        });
    } catch (error) {
        console.error('MongoDB GET Error:', error);
        return res.status(500).json({
            error: 'Failed to fetch chat history',
            details: error.message
        });
    }
};
