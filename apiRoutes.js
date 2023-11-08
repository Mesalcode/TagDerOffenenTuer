const routes = [
    'login',
    'addVideo',
    'deleteVideo',
    'setVideoOrder'
];

export async function registerRoutes() {
    for (const route of routes) {
        await new Promise(resolve => {
            import(`./routes/${route}.js`).then(resolve);
        });
    }
}
