
const _container = document.querySelector('.activityContainer');
const _media = document.createElement('video');
_media.id = 'test-media';
_container.prepend(_media);
_media.play();
setInterval(() => {
    _media.currentTime += 100 / 1e3;
    // _media.dispatchEvent(new Event('timeupdate'));
}, 100);
// available mode: 'ltr', 'rtl', 'top', 'bottom'
const mode = 'top';
const comments = [
    { time: 1.00, text: 'hello world1' },
    { time: 1.12, text: 'hello world2' },
    { time: 1.25, text: 'hello world3' },
    { time: 1.50, text: 'hello world4' },
    { time: 1.75, text: 'hello world5' },
    { time: 2.22, text: 'hello world6' },
    { time: 3.33, text: 'hello world7' },
];
for (let i = 0; i < 1e6; i++) {
    const t = comments[comments.length - 1].time + 0.01;
    comments.push({
        time: t,
        text: `hello world- ${t}`,
        mode: mode,
    });
}

const danmu2DanmakuPlugin = {
    $createNode(danmaku) {
        const cmt = danmaku.data;
        danmaku.node.textContent = cmt.text;
        if (cmt.style) {
            for (const key in cmt.style) {
                danmaku.setStyle(key, cmt.style[key]);
            }
        }
        danmaku.direction = { 'ltr': 'left', 'rtl': 'right', }[cmt.mode];
        console.log(danmaku.direction);
    },
    init(manager) {
        const _plugin = { 
            name : 'danmu2Danmaku',
            version: '0.0.1',
            description: '将弹幕转成弹幕',
            author: '1111',
        };
        manager[_plugin.name] = {
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
            manager[_plugin.name].container = container;
        }
        let media = manager.options.media;
        if (media) {
            if (typeof media === 'string') {
                media = document.querySelector(media);
            }
            manager[_plugin.name].media = media;
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
            manager[_plugin.name].comments = _comments;
            if (_comments && _comments.length > 0) {
                if (!media.paused) {
                    _comments = _comments.sort((a, b) => a.time - b.time);
                    function raf(timestamp) {
                        // console.log("Current raf timestamp:", timestamp);
                        if (!manager[_plugin.name].stopRaf) {
                            manager.nextFrame(raf);
                        }
    
                        const cmt = _comments[manager[_plugin.name].position];
                        if (!cmt) return;
                        const ct = media.currentTime;
                        if (Math.abs(ct - cmt.time) < manager[_plugin.name].timeEpsilon) {
                            if (['ltr', 'rtl'].includes(cmt.mode) || !cmt.mode) {
                                manager.push(cmt);
                            } else {
                                manager.pushFlexibleDanmaku(cmt, {
                                    duration: 5000,
                                    direction: 'none',
                                    position(danmaku, container) {
                                        let positionOpt = {
                                            x: (container.width - danmaku.getWidth()) * 0.5,
                                            y: (container.height - danmaku.getHeight()) * 0.5,
                                        };
                                        if (cmt.mode === 'bottom') {
                                            [pos.x, pos.y] = [pos.y, pos.x];
                                        }
                                        return positionOpt;
                                    },
                                });
                            }
                            // manager.unshift(cmt);
                            // manager.render();
                            manager[_plugin.name].position++;
                        }
                        // console.log(media.currentTime);
                    }
                    manager.nextFrame(raf);
                    // media.addEventListener('timeupdate', (e) => {
                    //     const cmt = _comments[manager[_plugin.name].position++];
                    //     if (!cmt) {
                    //         return;
                    //     }
                    //     const ct = media.currentTime.toFixed(2);
                    //     if (ct == cmt.time) {
                    //         debugger;
                    //         manager.push(cmt);
                    //     }
                    //     console.log(media.currentTime);
                    //     // comments.map(cmt => {
                    //     //     manager.push(cmt);
                    //     // });
                    // });
                }
            }
        }    
    },
};

const manager2 = Danmu.create({
    container: _container,
    media: _media,
    comments: comments,
    // mode: 'adaptive',
    trackHeight: 20,
    plugin: {
        $createNode(danmaku) {
            danmu2DanmakuPlugin.$createNode(danmaku);
        },
        init(manager) {
            danmu2DanmakuPlugin.init(manager);
        },
    },
});
// manager2.mount('.activityContainer');
// manager2.startPlaying();
// manager.use(danmu2Danmaku());