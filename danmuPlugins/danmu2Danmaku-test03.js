
const _container = document.querySelector('.activityContainer');
const _media = document.createElement('video');
_media.id = 'test-media';
_container.prepend(_media);
_media.play();
setInterval(() => {
    _media.currentTime += 100 / 1e3;
    // _media.dispatchEvent(new Event('timeupdate'));
}, 100);
const comments = [
    { time: 1.00, text: 'hello world1' },
    { time: 1.12, text: 'hello world2' },
    { time: 1.25, text: 'hello world3' },
    { time: 1.50, text: 'hello world4' },
    { time: 1.75, text: 'hello world5' },
    { time: 2.22, text: 'hello world6' },
    { time: 3.33, text: 'hello world7' },
];
for (let i = 0; i < 10000; i++) {
    const t = comments[comments.length - 1].time + 0.1;
    comments.push({
        time: t,
        text: `hello world- ${t}`,
    });
}

const manager2 = Danmu.create({
    container: _container,
    media: _media,
    comments: comments,
    // mode: 'adaptive',
    // trackHeight: '20%',
    plugin: {
        $createNode(danmaku) {
            danmaku.node.textContent = danmaku.data.content;
        },
        init(manager) {
            manager.danmu2Danmaku = {
                container: null,
                media: null,
                comments: null,
                stopRaf: false,
                position: 0,
                timeEpsilon: 1,
            };
            let container = manager.options.container;
            if (container) {
                if (typeof container === 'string') {
                    container = document.querySelector(container);
                }
                manager.mount(container);
                manager.danmu2Danmaku.container = container;
            }
            let media = manager.options.media;
            if (media) {
                if (typeof media === 'string') {
                    media = document.querySelector(media);
                }
                manager.danmu2Danmaku.media = media;
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

                let _comments = manager.options.comments;
                manager.danmu2Danmaku.comments = _comments;
                if (_comments && _comments.length > 0) {
                    if (!media.paused) {
                        _comments = _comments.sort((a, b) => a.time - b.time);
                        manager.danmu2Danmaku.stopRaf = false;
                        function raf(timestamp) {
                            // console.log("Current raf timestamp:", timestamp);
                            if (!manager.danmu2Danmaku.stopRaf) {
                                manager.nextFrame(raf);
                            }

                            const cmt = _comments[manager.danmu2Danmaku.position];
                            if (!cmt) return;
                            const ct = media.currentTime;
                            if (Math.abs(ct - cmt.time) < manager.danmu2Danmaku.timeEpsilon) {
                                manager.push({ content: cmt.text });
                                manager.danmu2Danmaku.position++;
                            }
                            // console.log(media.currentTime);
                        }
                        manager.nextFrame(raf);
                        // media.addEventListener('timeupdate', (e) => {
                        //     const cmt = _comments[manager.danmu2Danmaku.position++];
                        //     if (!cmt) {
                        //         return;
                        //     }
                        //     const ct = media.currentTime.toFixed(2);
                        //     if (ct == cmt.time) {
                        //         debugger;
                        //         manager.push({ content: cmt.text });
                        //     }
                        //     console.log(media.currentTime);
                        //     // comments.map(cmt => {
                        //     //     manager.push({ content: cmt.text });
                        //     // });
                        // });
                    }
                }
            }
        },
    },
});
// manager2.mount('.activityContainer');
// manager2.startPlaying();
// manager.use(danmu2Danmaku());