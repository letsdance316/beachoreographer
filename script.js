let song;
let dancers = [];
let playButton;
let canvas;

function setup() {
    canvas = createCanvas(600, 400);
    canvas.parent('danceCanvas');
    background(240);

    // Initialize play button
    playButton = select('#playButton');
    playButton.mousePressed(togglePlay);

    // File input setup
    const fileInput = select('#fileInput');
    fileInput.changed(handleFileSelect);
}

function draw() {
    background(240);

    // Draw dancers
    dancers.forEach(dancer => {
        dancer.display();
        dancer.move();
    });
}

// Handle audio file upload
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            song = loadSound(e.target.result, songLoaded, songError);
        };
        reader.readAsDataURL(file);
    }
}

// Called when the song is loaded successfully
function songLoaded() {
    playButton.removeAttribute('disabled');
}

// Called if there's an error loading the song
function songError(err) {
    console.error('Error loading song:', err);
}

// Play/pause toggle
function togglePlay() {
    if (song && song.isPlaying()) {
        song.pause();
        playButton.html('Play');
    } else if (song) {
        song.play();
        playButton.html('Pause');
    }
}

// Simple Dancer class
class Dancer {
    constructor(x, y, size, skinColor, shirtColor, pantsColor) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.skinColor = skinColor;
        this.shirtColor = shirtColor;
        this.pantsColor = pantsColor;
    }

    move() {
        // Basic movement logic
        this.y += sin(frameCount * 0.1) * 2;
    }

    display() {
        push();
        fill(this.skinColor);
        ellipse(this.x, this.y - this.size * 0.6, this.size * 0.4); // Head

        fill(this.shirtColor);
        rect(this.x - this.size * 0.2, this.y - this.size * 0.3, this.size * 0.4, this.size * 0.5); // Body

        fill(this.pantsColor);
        rect(this.x - this.size * 0.15, this.y, this.size * 0.1, this.size * 0.4); // Left leg
        rect(this.x + this.size * 0.05, this.y, this.size * 0.1, this.size * 0.4); // Right leg
        pop();
    }
}

// Add dancer when the button is clicked
select('#addDancer').mousePressed(() => {
    const skinColor = select('#skinColor').value();
    const shirtColor = select('#shirtColor').value();
    const pantsColor = select('#pantsColor').value();
    const size = parseInt(select('#dancerSize').value(), 10);

    dancers.push(new Dancer(random(100, 500), 300, size, skinColor, shirtColor, pantsColor));
});
