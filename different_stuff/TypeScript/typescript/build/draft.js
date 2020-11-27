'use strict';
const video1 = {
    id: 1,
    type: "type 1",
    preview_url: "string",
    url: "string",
    name: "string",
    pos_seconds: 21,
    hotelId: "id for test",
    isMain: true,
    test: "hello world"
};
const video2 = {
    id: 2,
    type: "type 2",
    preview_url: "string 2",
    url: "string 2",
    name: "string 2",
    pos_seconds: 12,
    hotelId: "id for test 2",
    isMain: false,
    test: "hello world"
};
const videos = [video1, video2];
const photos = [
    { type: "test", url: "test" },
    { type: "test21", url: "test21" }
];
const videoItem1 = {
    id: 1,
    type: "type 1",
    preview_url: "string",
    url: "string",
    name: "string",
    pos_seconds: 21,
    hotelId: "id for test",
    isMain: true,
};
const videoItem2 = {
    id: 2,
    type: "type 2",
    preview_url: "string 2",
    url: "string 2",
    name: "string 2",
    pos_seconds: 12,
    hotelId: "id for test 2",
    isMain: false,
};
const videoItems = [videoItem1, videoItem2];
const mediaItems = [...(videoItems || []), ...photos];
console.log({ mediaItems });
