let song;
let dancers = [];
let playButton = document.getElementById("playButton");

function setup() {
    createCanvas(600, 400);
    background(240);
    playButton.addEventListener('click', togglePlay);
    let input = document.getElementById('fileInput');
    input.addEventListener('change', handleFileSelect, false);
    console.log("p5.js setup has loaded!");
}

function draw() {
    background(240);
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
    playButton.style.display = 'inline-block'; // Show play button after song is loaded
    console.log("Song has loaded!");
}

function togglePlay() {
    if (song && song.isPlaying()) { // Check if the song is loaded and playing
        song.pause();
        playButton.innerText = "Play";
    } else if (song) {
        song.play();
        playButton.innerText = "Pause";
    }
}

// Create a simple dancer class
class Dancer {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = 0;
    }

    move() {
        if (song && song.isPlaying()) { // Ensure song is loaded and playing
            let beat = song.currentTime(); 
            this.x = 200 + Math.sin(this.angle) * 100;
            this.y = 200 + Math.cos(this.angle) * 100;
            this.angle += 0.1 + (beat % 2) * 0.02; // Sync movement with the song time
        }
    }

    display() {
        fill(100, 100, 255);
        ellipse(this.x, this.y, this.radius * 2);
    }
}

// Add dancers to the stage
function keyPressed() {
    if (key === '1') {
        dancers.push(new Dancer(200, 200, 20));
    } else if (key === '2') {
        dancers.push(new Dancer(400, 200, 20));
    }
}
