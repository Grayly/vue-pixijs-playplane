import { stage } from '../config';

const bulletSpeed = 7;
const topLine = -100;
const bottomLine = stage.height + 100;

const isOverLine = (bulletY) => {
    return bulletY < topLine || bulletY > bottomLine;
}

export const moveBullets = (bullets) => {
    bullets.forEach((bullet, index) => {
        bullet.y += bulletSpeed * bullet.dir;
        if (isOverLine(bullet.y)) {
            bullets.splice(index, 1);
        }
    })
}