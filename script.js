let song;
let dancers = [];

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('danceCanvas');
    background(240);

    // Event listener for adding dancers
    document.getElementById('addDancer').addEventListener('click', () => {
        let color = document.getElementById('dancerColor').value;
        let size = parseInt(document.getElementById('dancerSize').value);
        dancers.push(new StickFigure(random(width), random(height), size, color));
    });
}

function draw() {
    background(240);

    // Draw the dancers
    dancers.forEach(dancer => {
        dancer.display();
        dancer.move();
    });
}

// Stick figure class
class StickFigure {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size; // Head size determines proportions
        this.color = color;
        this.angle = random(TWO_PI); // For movement
        this.armSwing = 0; // Arm movement angle
        this.legSwing = 0; // Leg movement angle
        this.swingDirection = 1; // Control swing direction
    }

    move() {
        // Simple movement
        this.x += sin(this.angle) * 2;
        this.y += cos(this.angle) * 2;
        this.angle += 0.05;

        // Swing arms and legs
        this.armSwing += this.swingDirection * 0.05;
        this.legSwing += this.swingDirection * 0.03;

        // Reverse swing direction for natural movement
        if (this.armSwing > 0.5 || this.armSwing < -0.5) {
            this.swingDirection *= -1;
        }
    }

    display() {
        stroke(this.color);
        strokeWeight(2);

        // Head
        fill(this.color);
        ellipse(this.x, this.y, this.size); // Head is proportional to size

        // Body
        let bodyLength = this.size * 1.5;
        line(this.x, this.y + this.size / 2, this.x, this.y + this.size / 2 + bodyLength);

        // Arms
        let armLength = this.size;
        line(
            this.x, 
            this.y + this.size / 2 + bodyLength / 4, 
            this.x + armLength * cos(this.armSwing), 
            this.y + this.size / 2 + bodyLength / 4 + armLength * sin(this.armSwing)
        );
        line(
            this.x, 
            this.y + this.size / 2 + bodyLength / 4, 
            this.x - armLength * cos(this.armSwing), 
            this.y + this.size / 2 + bodyLength / 4 + armLength * sin(this.armSwing)
        );

        // Legs
        let legLength = this.size * 1.2;
        line(
            this.x, 
            this.y + this.size / 2 + bodyLength, 
            this.x + legLength * cos(this.legSwing), 
            this.y + this.size / 2 + bodyLength + legLength * sin(this.legSwing)
        );
        line(
            this.x, 
            this.y + this.size / 2 + bodyLength, 
            this.x - legLength * cos(this.legSwing), 
            this.y + this.size / 2 + bodyLength + legLength * sin(this.legSwing)
        );
    }
}
