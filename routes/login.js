import { createSessionKey } from "../utils/session.js";

global.app.post('/login', async (req, res) => {
    if (req.body.password !== global.config.ADMIN_PASSWORD) {
        return res.status(500).json({
            error: "Das Passwort ist inkorrekt."
        });
    } 

    const sessionKey = await createSessionKey();
    res.cookie('sessionKey', sessionKey, { maxAge: 60 * 60 * 24 * 4 * 1000 });

    res.status(200).json({});
})

