import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(getCurrentTime, 1000));

function getCurrentTime(time) {
    const currentTime = time.seconds;

    localStorage.setItem(KEY_TIME, currentTime);

};

player.setCurrentTime(saveTime()).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});

function saveTime() {
    return Number(localStorage.getItem(KEY_TIME));
}