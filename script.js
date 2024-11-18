let dancers = [];
let song;
let isPlaying = false;
let playPauseButton;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('danceCanvas');
    background(240);

    // Button to add dancers
    document.getElementById('addDancer').addEventListener('click', () => {
        let color = document.getElementById('dancerColor').value;
        let size = parseInt(document.getElementById('dancerSize').value);
        dancers.push(new StickFigure(random(width), random(height), size, color));
    });

    // Music controls
    playPauseButton = document.getElementById('playPauseButton');
    playPauseButton.addEventListener('click', togglePlayPause);

    let fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileUpload);
}

function draw() {
    background(240);

    // Draw dancers
    dancers.forEach(dancer => {
        dancer.display();
        dancer.move();
    });
}

// Handle file upload for music
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            song = loadSound(e.target.result, () => {
                playPauseButton.disabled = false; // Enable play button
            });
        };
        reader.readAsDataURL(file);
    }
}

// Play or pause the music
function togglePlayPause() {
    if (song.isPlaying()) {
        song.pause();
        playPauseButton.textContent = "Play";
        isPlaying = false;
    } else {
        song.play();
        playPauseButton.textContent = "Pause";
        isPlaying = true;
    }
}

// StickFigure class
class StickFigure {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size; // Head size determines proportions
        this.color = color;
        this.angle = random(TWO_PI);
        this.armSwing = 0;
        this.legSwing = 0;
        this.swingDirection = 1;
    }

    move() {
        // Make movements synchronize with music beat if music is playing
        if (isPlaying && song) {
            let beat = map(song.currentTime() % 1, 0, 1, -0.5, 0.5);
            this.armSwing += this.swingDirection * (0.05 + beat);
            this.legSwing += this.swingDirection * (0.03 + beat);
        } else {
            // Default swinging motion
            this.armSwing += this.swingDirection * 0.05;
            this.legSwing += this.swingDirection * 0.03;
        }

        if (this.armSwing > 0.5 || this.armSwing < -0.5) {
            this.swingDirection *= -1;
        }
    }

    display() {
        stroke(this.color);
        strokeWeight(2);

        // Head
        fill(this.color);
        ellipse(this.x, this.y, this.size);

        // Body
        let bodyLength = this.size * 1.5;
        line(this.x, this.y + this.size / 2, this.x, this.y + this.size / 2 + bodyLength);

        // Arms
        let armLength = this.size;
        line(this.x, this.y + this.size / 2 + bodyLength / 4,
             this.x + armLength * cos(this.armSwing),
             this.y + this.size / 2 + bodyLength / 4 + armLength * sin(this.armSwing));
        line(this.x, this.y + this.size / 2 + bodyLength / 4,
             this.x - armLength * cos(this.armSwing),
             this.y + this.size / 2 + bodyLength / 4 + armLength * sin(this.armSwing));

        // Legs
        let legLength = this.size * 1.2;
        line(this.x, this.y + this.size / 2 + bodyLength,
             this.x + legLength * cos(this.legSwing),
             this.y + this.size / 2 + bodyLength + legLength * sin(this.legSwing));
        line(this.x, this.y + this.size / 2 + bodyLength,
             this.x - legLength * cos(this.legSwing),
             this.y + this.size / 2 + bodyLength + legLength * sin(this.legSwing));
    }
}


