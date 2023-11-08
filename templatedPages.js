import { isSessionKeyValid } from './utils/session.js';
import { getVideos } from './utils/videos.js';

const pages = [
    {
        url: "/",
        file: "index",
        title: "Startseite",
        hideFromNavbar: false,
        adminOnly: false
    },
    {
        url: "/learn",
        file: "learn",
        title: "Lernen",
        hideFromNavbar: false,
        adminOnly: false
    },
    {
        url: "/configure",
        file: "configure",
        title: "Konfiguration",
        hideFromNavbar: false,
        adminOnly: true
    },    
    {
        url: "/chooseVideo",
        file: "chooseVideo",
        title: "Video auswählen",
        hideFromNavbar: true,
        adminOnly: false
    },
    {
        url: "/privacy-policy",
        file: "privacy-policy",
        title: "Datenschutzerklärung",
        hideFromNavbar: true,
        adminOnly: false
    },
    {
        url: "/imprint",
        file: "imprint",
        title: 'Impressum',
        hideFromNavbar: true,
        adminOnly: false
    },
    {
        url: "/login",
        file: "login",
        title: 'Login',
        hideFromNavbar: true,
        adminOnly: false
    },
    {
        url: "/login-failed",
        file: "login-failed",
        title: 'Login fehlgeschlagen',
        hideFromNavbar: true,
        adminOnly: false
    },
    {
        url: "/404-not-found",
        file: "404",
        title: "404 - Seite nicht gefunden!",
        hideFromNavbar: true,
        adminOnly: false,
        statusCode: 404
    },
    {
        url: "/herr-dr-thomas-hillebrand-beim-seminar-auf-schloss-dagstuhl",
        file: "hillebrand",
        title: "Hillebrands Dagstuhl Abenteuer",
        hideFromNavbar: true,
        adminOnly: false,
        statusCode: 418
    }
];

export function registerRoutes() {
    for (const page of pages) {
        global.app.get(page.url, async (req, res) => {
            const loggedIn = await isSessionKeyValid(req.cookies.sessionKey);

            const isAccessable = loggedIn || !page.adminOnly;

            const cookiesAccepted = req.cookies.cookiesAccepted === "true";
    
            const baseParameters = {
                ...global.config,
                pages,
                shouldShowCookieBanner: !cookiesAccepted
            }

            if (!isAccessable) {
                return res.status(403).render(
                    "login",
                    {
                        ...baseParameters,
                        page: {
                            title: "Login erforderlich"
                        },
                    }
                );
            }

            const statusCode = page.statusCode || 200;

            const videos = await getVideos();

            const renderDetails =                 {
                ...baseParameters,
                page,
                'videos': videos
            };

            if (page.url === '/learn') {
                renderDetails['video'] = {
                    title: 'Kein Video ausgewählt.'
                }

                for (const video of videos) {
                    if (video.fileName === req.query.vid) {
                        renderDetails['video'] = video;
                    }
                }
            }

            res.status(statusCode).render(
                page.file, 
                renderDetails
            );
    
            console.log("Served " + page.url + ` (Logged in: ${loggedIn}).`);
        });
    }
}

