# Selaco VAC-Bot: Bad Apple mod

This mod allows [Selaco](https://store.steampowered.com/app/1592280/Selaco/)'s VAC-Bots to play [Bad Apple!!](https://en.wikipedia.org/wiki/Bad_Apple!!). May not be compatible with other VAC-Bot mods!

## Preparing a video for VAC-Bots

In case you want to play some other video on a VAC-Bot, here's some useful info:

1. Use ffmpeg to convert a video to separate .pngs: `ffmpeg -i .\video.mp4 -r 1/0.22857142857 -vf "scale='if(gt(a,1),-2,64)':'if(gt(a,1),64,-2)',pad=width=86*2:height=86*2:x=86:y=(86*2-64):color=black" BAD_%04d.png`. Tweak the `-r` parameter value until the total amount of frames generated is less than 1000 (any more and Selaco will no longer be able to precache the frames, which causes graphical glitches or crashes).
2. Copy all .png to `MD/VACBOT`. Make sure to remove all existing PNGs there!
3. Update `update_scripts.js`'s constants.
4. `node update_scripts.js`

## Building

1. Package this entire repository (preferably: sans the `.git` folder) into a .zip archive
2. Rename the .zip to .pk3
3. Copy the .pk3 over to Selaco's `Mods` folder.
4. Enjoy!!

## Preparing a release package

1. `git archive --format=zip --output "C:\Program Files (x86)\Steam\steamapps\common\Selaco\Mods\STAGING\selaco-vacbot-bad-apple.pk3" main`
