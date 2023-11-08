import { isSessionKeyValid } from "../utils/session.js";
import { applyVideoOrder } from "../utils/videos.js";

global.app.post('/set-video-order', async (req, res) => {
    if (!isSessionKeyValid(req.cookies.sessionKey)) {
        res.status(400).json({
            error: 'Ungültiger Sitzungsschlüssel.'
        });

        return;
    }

    const order = req.body.order;

    if (!order || !order.length) {
        res.status(400).json({
            error: 'Ungültige Reihenfolge.'
        });

        return;
    }

    if (!applyVideoOrder(req.body.order)) {
        res.status(400).json({
            error: 'Ungültige Reihenfolge.'
        });
        
        return;
    }

    res.status(200).json({});
});