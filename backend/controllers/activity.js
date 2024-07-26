const db = require('../config/db');

exports.logActivity = (req, res) => {
    const { userId, pageName } = req.body;

    db.query(
        'INSERT INTO user_activity (user_id, page_name, click_count) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE click_count = click_count + 1, last_click = CURRENT_TIMESTAMP',
        [userId, pageName],
        (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Database error', error });
            }
            res.status(200).json({ message: 'Activity logged' });
        }
    );
};

exports.getActivity = (req, res) => {
    const { userId } = req.params;

    db.query(
        'SELECT page_name, click_count FROM user_activity WHERE user_id = ?',
        [userId],
        (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Database error', error });
            }
            res.status(200).json(results);
        }
    );
};
