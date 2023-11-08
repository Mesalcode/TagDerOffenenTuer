import fs from 'fs/promises';

let videos = [];

function fullPathFromFileName(fileName) {
    return `./static/userVideos/${fileName}`;
}

function fullThumbnailPathFromFileName(fileName) {
    return `./static/userVideos/thumbnails/${fileName}`;
}

try {
    await fs.access('./videos.json', fs.constants.F_OK);

    const fileContent = await fs.readFile('./videos.json');

    videos = JSON.parse(fileContent);
} catch (_) {
    console.log("Created videos.json.");
}

async function saveVideos() {
    const videosJSONStr = JSON.stringify(videos);

    return await fs.writeFile('./videos.json', videosJSONStr);
}

export async function addVideo(fileName, title, lengthStr, thumbnailFileName) {
    videos.push({
        title: title,
        lengthStr: lengthStr,
        fileName: fileName,
        thumbnailFileName: thumbnailFileName
    });

    await saveVideos();
}

export async function applyVideoOrder(order) {
    const videosInOrder = [];

    for (const fileName of order) {
        for (const video of videos) {
            if (fileName === video.fileName) {
                videosInOrder.push(video);
            }
        }
    }

    if (videosInOrder.length != videos.length) {
        return false;
    }

    videos = videosInOrder;

    await saveVideos();

    return true;
}

export async function removeVideo(fileName) {
    let videosNew = [];
    let affectedVideo = null;

    for (const video of videos) {
        if (video.fileName !== fileName) {
            videosNew.push(video);
        } else {
            affectedVideo = video;
        }
    }

    if (!affectedVideo) {
        return false;
    }

    try {
        await fs.unlink(fullPathFromFileName(fileName));
        await fs.unlink(fullThumbnailPathFromFileName(affectedVideo.thumbnailFileName));
    
        videos = videosNew;
    
        await saveVideos();
    
        return true;
    } catch (_) {
        return false;
    }
}

export async function getVideos() {
    return videos;
}