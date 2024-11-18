let song;
let playButton;
let dancers = [];

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('danceCanvas');
    background(240);

    // Create Play Button
    playButton = createButton('Play');
    playButton.position(20, 20);
    playButton.mousePressed(togglePlayPause);
    playButton.hide();

    // File input for music
    let fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileUpload);

    // Add dancer button
    document.getElementById('addDancer').addEventListener('click', addDancer);
}

function draw() {
    background(240);

    if (song && song.isPlaying()) {
        // Visualize or sync movements with the song
    }

    dancers.forEach(dancer => {
        dancer.move();
        dancer.display();
    });
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            song = loadSound(e.target.result, () => {
                playButton.show();
            });
        };
        reader.readAsDataURL(file);
    }
}

function togglePlayPause() {
    if (song.isPlaying()) {
        song.pause();
        playButton.html('Play');
    } else {
        song.play();
        playButton.html('Pause');
    }
}

// Add a dancer with selected appearance
function addDancer() {
    const skinColor = document.getElementById('skinColor').value;
    const shirtColor = document.getElementById('shirtColor').value;
    const pantsColor = document.getElementById('pantsColor').value;
    const size = parseInt(document.getElementById('dancerSize').value);

    const x = random(width / 4, (3 * width) / 4);
    const y = random(height / 4, (3 * height) / 4);

    dancers.push(new Humanoid(x, y, size, skinColor, shirtColor, pantsColor));
}

// Humanoid class for 3D-inspired dancers
class Humanoid {
    constructor(x, y, size, skinColor, shirtColor, pantsColor) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.skinColor = skinColor || '#F5CBA7';
        this.shirtColor = shirtColor || '#2980B9';
        this.pantsColor = pantsColor || '#1C2833';
        this.armSwing = 0;
        this.legSwing = 0;
        this.swingDirection = 1;
    }

    move() {
        this.armSwing += this.swingDirection * 0.05;
        this.legSwing += this.swingDirection * 0.03;
        if (this.armSwing > 0.5 || this.armSwing < -0.5) {
            this.swingDirection *= -1;
        }
    }

    display() {
        push();
        translate(this.x, this.y);

        // Torso
        fill(this.shirtColor);
        rect(-this.size / 4, 0, this.size / 2, this.size);

        // Head
        fill(this.skinColor);
        ellipse(0, -this.size / 2, this.size / 1.5);

        // Arms
        fill(this.shirtColor);
        let armOffset = this.size / 1.5;
        let armLength = this.size * 0.8;
        let armSwingOffset = this.armSwing * this.size / 3;

        rect(-armOffset, this.size / 4 + armSwingOffset, armLength, this.size / 5);
        rect(armOffset - armLength, this.size / 4 - armSwingOffset, armLength, this.size / 5);

        // Legs
        fill(this.pantsColor);
        let legOffset = this.size / 4;
        let legLength = this.size * 1.2;
        let legSwingOffset = this.legSwing * this.size / 2;

        rect(-legOffset, this.size + legSwingOffset, this.size / 5, legLength);
        rect(legOffset - this.size / 5, this.size - legSwingOffset, this.size / 5, legLength);

        pop();
    }
}
