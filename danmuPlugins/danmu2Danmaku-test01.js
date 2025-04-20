// export function danmu2Danmaku() {
// function danmu2Danmaku() {
//     return (manager) => {
//         return {
//             name: 'danmu2Danmaku',
//             version: '0.0.1',
//             init(manager2) {
//                 let container = manager.container;
//                 if (container) {
//                     if (typeof container === 'string') {
//                         container = document.querySelector(container);
//                     }
//                     manager.mount(container);
//                 }
//                 let media = manager.media;
//                 if (media) {
//                     if (typeof media === 'string') {
//                         media = document.querySelector(media);
//                     }
//                     if (!media.paused) {
//                         manager.startPlaying();
//                     }
//                     media.addEventListener('play', (e) => {
//                         manager.unfreeze();
//                     });
//                     media.addEventListener('pause', (e) => {
//                         manager.freeze();
//                     });
//                     media.addEventListener('playing', (e) => {
//                         manager.unfreeze();
//                     });
//                     media.addEventListener('waiting', (e) => {
//                         manager.freeze();
//                     });
//                     media.addEventListener('seeking', (e) => {
//                         manager.clear();
//                     });

//                     let comments = manager.comments;
//                     if (comments && comments.length > 0) {
//                         if (!media.paused) {
//                             comments = comments.sort((a, b) => a.time - b.time);
//                             media.addEventListener('timeupdate', (e) => {
//                                 // const time = media.currentTime.toFixed(2);
//                                 // if (time ===) {
//                                     // manager.push({ content: cmt.text });
//                                 // }
//                                 comments.map(cmt => {
//                                     manager.push({ content: cmt.text });
//                                 });
//                             });
//                         }
//                     }
//                 }
//             },
//         };
//     };
// }

// const _container = document.querySelector('.skinHeader');
// debugger;
// const media = document.createElement('video');
// media.id = 'test-media';
// container.prepend(media);
// setInterval(() => { media.currentTime += 100 / 1e3 }, 100);

const manager2 = Danmu.create({
    // _container: _container,
    // media: media,
    // comments: [
    //     { time: 1.00, text: 'hello world1' },
    //     { time: 1.12, text: 'hello world2' },
    //     { time: 1.25, text: 'hello world3' },
    //     { time: 1.50, text: 'hello world4' },
    //     { time: 1.75, text: 'hello world5' },
    //     { time: 2.22, text: 'hello world6' },
    //     { time: 3.33, text: 'hello world7' },
    // ],
    mode: 'adaptive',
    trackHeight: '20%',
    plugin: {
        $createNode(danmaku) {
            danmaku.node.textContent = danmaku.data.content;
        },
        init(manager) {
            const container = document.querySelector('.activityContainer');
            manager.mount(container);
            const media = document.createElement('video');
            media.id = 'test-media';
            container.prepend(media);
            media.play();
            setInterval(() => {
                media.currentTime += 100 / 1e3;
                media.dispatchEvent(new Event('timeupdate'));
            }, 100);
            if (media) {
                debugger;
                if (!media.paused) {
                    manager.startPlaying();
                }
                // media.addEventListener('play', (e) => {
                //     manager.unfreeze();
                // });
                // media.addEventListener('pause', (e) => {
                //     manager.freeze();
                // });
                // media.addEventListener('playing', (e) => {
                //     manager.unfreeze();
                // });
                // media.addEventListener('waiting', (e) => {
                //     manager.freeze();
                // });
                // media.addEventListener('seeking', (e) => {
                //     manager.clear();
                // });

                let comments = [
                    { time: 1.00, text: 'hello world1' },
                    { time: 1.12, text: 'hello world2' },
                    { time: 1.25, text: 'hello world3' },
                    { time: 1.50, text: 'hello world4' },
                    { time: 1.75, text: 'hello world5' },
                    { time: 2.22, text: 'hello world6' },
                    { time: 3.33, text: 'hello world7' },
                ];
                if (comments && comments.length > 0) {
                    if (!media.paused) {
                        comments = comments.sort((a, b) => a.time - b.time);
                        media.addEventListener('timeupdate', (e) => {
                            // const time = media.currentTime.toFixed(2);
                            // if (time ===) {
                                // manager.push({ content: cmt.text });
                            // }
                            console.log(media.currentTime);
                            comments.map(cmt => {
                                debugger;
                                manager.push({ content: cmt.text });
                            });
                        });
                    }
                }
            }
        },
    },
});
// manager2.mount('.activityContainer');
// manager2.startPlaying();
// manager.use(danmu2Danmaku());