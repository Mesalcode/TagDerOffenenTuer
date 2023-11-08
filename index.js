import mysql from "mysql2/promise";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import express from "express";
import expressNunjucks from "express-nunjucks";
import expressCompression from 'express-compression';
import helmet from 'helmet';
import favicon from 'serve-favicon';

import * as Obfuscator from './obfuscator.js';

import * as TemplatedPages from './templatedPages.js';
import * as Api from './apiRoutes.js';

import CONFIG from './config.json' assert {type: "json"};

console.log("Config loaded.");

global.config = CONFIG;

global.dirname = dirname(fileURLToPath(import.meta.url));

global.app = express();
global.app.set("views", global.dirname + "/templates");

expressNunjucks(global.app, {
    watch: global.config.IS_DEV,
    noCache: global.config.IS_DEV
});

global.app.use(express.json());
global.app.use(cookieParser());

if (!global.config.IS_DEV) {
    console.log("Launched in production - obfuscation and compression is enabled.");

    global.app.use(
        helmet.hidePoweredBy({setTo: 'PHP/5.2.10-2ubuntu6.7'})
    );
    Obfuscator.enable();

    global.app.use(expressCompression());
}

global.app.use('/static', express.static(join(global.dirname, 'static')));
global.app.use(favicon(join(global.dirname, 'static', 'img', 'favicon.ico')));

console.log("Middlewares intialized.");

TemplatedPages.registerRoutes();
await Api.registerRoutes();

app.use(function (req, res) {
    res.redirect(`/404-not-found#${req.url}`);
});

console.log("Routes registered.");

global.app.listen(global.config.PORT_SERVER, "0.0.0.0");

console.log("Now listening.");