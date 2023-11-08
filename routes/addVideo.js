import {getVideoDurationInSeconds} from 'get-video-duration';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import fs from 'fs/promises';
import thumbsupply from 'thumbsupply';
import path from 'path';

import { addVideo } from '../utils/videos.js';
import { isSessionKeyValid } from '../utils/session.js';

const videoStorage = multer.diskStorage({
    destination: './static/userVideos',
    filename: (req, file, cb) => {
        const fileNameSplit = file.originalname.split('.');
        const fileExtension = fileNameSplit[fileNameSplit.length - 1];

        cb(null, uuidv4() + '.' + fileExtension);
    }
});
const videoUpload = multer({storage: videoStorage});

global.app.post(
    '/add-video', 
    videoUpload.single('video'), 
    (req, res) => {
    if (!req.file) {
        res.status(400).json({
            error: 'Kein Video wurde hochgeladen.'
        });

        return;
    }

    if (!isSessionKeyValid(req.cookies.sessionKey)) {
        res.status(400).json({
            error: 'Ungültiger Sitzungsschlüssel.'
        });

        return;
    }

    getVideoDurationInSeconds(req.file.path).then(async durationInSeconds => {
        if (!req.body.title || req.body.title.length === 0) {
            await fs.unlink(req.file.path);

            res.status(400).json({
                error: 'Der angegebene Titel ist nicht gültig.'
            });

            return;
        }

        if (durationInSeconds < 1) {
            await fs.unlink(req.file.path);

            res.status(400).json({
                error: 'Das hochgeladene Video ist zu kurz.'
            });

            return;
        }

        const durationMinutes = Math.floor(durationInSeconds / 60);
        const durationSeconds = parseInt(durationInSeconds - durationMinutes * 60);
        
        const lengthStr = `${String(durationMinutes).padStart(2, '0')}:`
            + `${String(durationSeconds).padStart(2, '0')}`;

        try {
            const thumbnailPath = await thumbsupply.generateThumbnail(req.file.path, {
                size: thumbsupply.ThumbSize.LARGE,
                timestamp: '10%',
                forceCreate: true,
                cacheDir: './static/userVideos/thumbnails'
            });

            const thumbnailFileName = path.basename(thumbnailPath);

            await addVideo(req.file.filename, req.body.title, lengthStr, thumbnailFileName);
    
            res.status(200).json({});
        } catch (_) {
            await fs.unlink(req.file.path);

            res.status(400).json({
                error: 'Nur unterstützte Video-Dateien können hochgeladen werden.'
            });
        }

    }).catch(async err => {
        await fs.unlink(req.file.path);

        res.status(400).json({
            error: 'Nur unterstützte Video-Dateien können hochgeladen werden.'
        });
    });
});