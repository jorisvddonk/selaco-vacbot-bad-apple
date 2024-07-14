const fs = require('fs');
const z = fs.readFileSync("MODELDEF.txt").toString();
const lines = z.split(/\r?\n/);

const NUM_FRAMES = 960; // Total number of frames. MUST NOT EXCEED 1000 or else precaching does NOT work and you get graphical glitches!
const FRAME_TICKS = 8; // Selaco runs 35 tics per second
const CHAR = "B";
const CHAR2 = "X";

function getSprite(num) {
    return `${CHAR}${num.toString(32).padStart(3, CHAR2)}`.toUpperCase();
}

let out = [];
for (let l of lines) {
    out.push(l);
    if (l.indexOf("// GENERATED DATA BELOW") > -1) {
        break;
    }
}

for (let i = 1; i <= NUM_FRAMES; i++) {
    let v = String(i).padStart(4, '0');
    out.push(`Model VACBOT_ES_BadApple
{
    noperpixellighting  
    Path "MD/VACBOT"   
    Model 0 "VAC_SCREEN.obj"    
    Skin 0 "BAD_${v}.png"
    Scale 1.0 1.0 1.0
    angleoffset 90
    FrameIndex ${getSprite(i)} A 0 0
}`)
}

fs.writeFileSync("MODELDEF.txt", out.join('\n'));

/// --------------

const v = fs.readFileSync("VACBOT_OVERRIDE.zsc").toString();
const vlines = v.split(/\r?\n/);
out = [];
for (let l of vlines) {
    out.push(l);
    if (l.indexOf("// GENERATED DATA BEGIN") > -1) {
        break;
    }
}

out.push(`Precache:`);
for (let i = 1; i <= NUM_FRAMES; i++) {
    out.push(`  ${getSprite(i)} A 0;`);
}
out.push(`  stop;`);


for (let i = 1; i <= NUM_FRAMES; i++) {
    let v = String(i).padStart(4, '0');
    let vplus = String(i+1).padStart(4, '0');
    if (i === NUM_FRAMES) {
        vplus = "0000";
    }
    out.push(`Frame_${v}:
${getSprite(i)} A ${FRAME_TICKS} BRIGHT;
goto Frame_${vplus};`);
}

let output = false;
for (let l of vlines) {
    if (l.indexOf("// GENERATED DATA END") > -1) {
        output = true;
    }
    if (output) {
        out.push(l);
    }
}

fs.writeFileSync("VACBOT_OVERRIDE.zsc", out.join('\n'));


//////////////////////

out = [];
for (let i = 1; i <= NUM_FRAMES; i++) {
    out.push(`sprite ${getSprite(i)}, 172, 172
{}`);
}

fs.writeFileSync("TEXTURES.txt", out.join('\n'));