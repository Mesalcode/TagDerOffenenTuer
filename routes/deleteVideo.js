import { removeVideo } from "../utils/videos.js";
import { isSessionKeyValid } from "../utils/session.js";

global.app.post('/delete-video', async (req, res) => {
    if (!isSessionKeyValid(req.cookies.sessionKey)) {
        res.status(400).json({
            error: 'Ungültiger Sitzungsschlüssel.'
        });

        return;
    }

    const videoFileName = req.body.fileName;

    if (!videoFileName) {
        res.status(400).json({
            error: 'Ungültiger Videoname.'
        });

        return;
    }

    const wasDeleted = await removeVideo(videoFileName);

    if (!wasDeleted) {
        res.status(400).json({
            error: 'Video nicht gefunden.'
        });
    }

    res.status(200).json({});
});