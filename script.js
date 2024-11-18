let song;
let dancers = [];
let playButton;

function setup() {
    createCanvas(600, 400);
    background(240);
    playButton = createButton("Play");
    playButton.position(10, 10);
    playButton.mousePressed(togglePlay);

    let input = document.getElementById('fileInput');
    input.addEventListener('change', handleFileSelect, false);
}

function draw() {
    background(240);

    // Draw the dancers
    dancers.forEach(dancer => {
        dancer.display();
        dancer.move();
    });
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            song = loadSound(e.target.result, songLoaded);
        };
        reader.readAsDataURL(file);
    }
}

function songLoaded() {
    playButton.show();
}

function togglePlay() {
    if (song.isPlaying()) {
        song.pause();
        playButton.html("Play");
    } else {
        song.play();
        playButton.html("Pause");
    }
}

// Create a humanoid dancer class
class Dancer {
    constructor(x, y, scale) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.angle = 0;
    }

    move() {
        // Sync movement with the song's current time
        let beat = song.currentTime(); 
        this.angle = Math.sin(beat * 2 * Math.PI) * 0.5; // Simple sway movement

        // Make the dancer move left and right
        this.x = 300 + Math.sin(beat) * 150;
        this.y = 200 + Math.cos(beat) * 50;
    }

    display() {
        fill(100, 100, 255);
        stroke(0);

        // Draw head
        ellipse(this.x, this.y - 40, 30);

        // Draw body
        line(this.x, this.y - 20, this.x, this.y + 30);

        // Draw arms
        line(this.x - 30, this.y, this.x + 30, this.y);

        // Draw legs
        line(this.x, this.y + 30, this.x - 30, this.y + 60);
        line(this.x, this.y + 30, this.x + 30, this.y + 60);
    }
}

// Add dancers to the stage
function keyPressed() {
    if (key === '1') {
        dancers.push(new Dancer(200, 200, 1));
    } else if (key === '2') {
        dancers.push(new Dancer(400, 200, 1));
    }
}
