import JavascriptObfuscator from 'javascript-obfuscator';
import { existsSync, readFileSync } from "fs";
import { join } from 'path';

export function enable() {
    const fileCache = {};

    global.app.get('/static/js/:filePath', (req, res) => {
        res.type('.js');
    
        const filePath = req.params.filePath;
    
        if (fileCache.hasOwnProperty(filePath)) {
            return res.send(fileCache[filePath]);
        }
    
        const fullFilePath = join(global.dirname, 'static', 'js', filePath);
    
        if (!existsSync(fullFilePath)) {
            return res.status(500).send(`
                    /* Diese Javascript-Datei existiert nicht. */
                    console.warn("Failed to load obfuscated javascript ressource.");
                `);
        }
    
        const scriptContent = readFileSync(
            fullFilePath,
            {
                encoding: 'utf8'
            }
        );
    
        const obfuscatedContent = JavascriptObfuscator.obfuscate(
            scriptContent,
            {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                numbersToExpressions: true,
                simplify: true,
                stringArrayShuffle: true,
                splitStrings: true,
                splitStringsChunkLength: 3,
                stringArrayThreshold: 1,
                selfDefending: true,
                deadCodeInjection: true,
                unicodeEscapeSequence: true
            }
        );
    
        fileCache[filePath] = `/* Der folgende JavaScript-Quellcode wurde einer maschinellen Verschleierung unterzogen. */\n`
            +  `/* Du willst mehr darüber erfahren, wie eine solche Webseite entwickelt wird? Die MINT-AG des Gymnasium Lindlars
            findet jeden Freitag statt. Dort kannst du unter der Aufsicht von Dr. Thomas Hillebrand alles über die Entwicklung
            von Webseiten oder andere Informatikthemen, die dich interessieren, lernen! */\n\n`
            + obfuscatedContent;
    
        return res.send(fileCache[filePath]);
    });
}