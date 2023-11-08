import { v4 } from 'uuid';

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

let sessions = []

export async function createSessionKey() {
    const sessionKey = v4();

    const currentDate = new Date();

    const expiryDate = new Date(currentDate.valueOf());
    expiryDate.addHours(4);

    const expiryTimestamp = expiryDate.getTime();

    sessions.push({
        'key': sessionKey,
        'expiry': expiryTimestamp
    });

    return sessionKey;
}

function cleanExpiredSessions() {
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();

    const cleanedSessions = [];
    
    for (const session of sessions) {
        if (currentTimestamp < session.expiry) {
            cleanedSessions.push(session);
        }
    }

    sessions = cleanedSessions;
}

export async function isSessionKeyValid(key) {
    cleanExpiredSessions();

    for (const session of sessions) {
        if (session.key === key) {
            return true;
        }
    }

    return false;
}