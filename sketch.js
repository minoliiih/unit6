// variables: XF+-[]
// axiom: X
// rules: X → F+X-F+X, F → FF

let angle;
let axiom = "X";
let sentence = axiom;
let len = 10;

let rules = [
  { a: "F", b: "FF" },
  { a: "X", b: "F+X-F+X" }
];

function generate() {
  len *= 0.9;

  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;

    for (let r of rules) {
      if (current === r.a) {
        nextSentence += r.b;
        found = true;
        break;
      }
    }

    if (!found) {
      nextSentence += current;
    }
  }

  sentence = nextSentence;
  drawMotif();
}

function turtle() {
  resetMatrix();
  translate(width / 2, height / 2);
  rotate(-HALF_PI);

  stroke(255);
  strokeWeight(1);

  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if (current === "F") {
      line(0, 0, len, 0);
      translate(len, 0);
    } else if (current === "+") {
      rotate(angle);
    } else if (current === "-") {
      rotate(-angle);
    }
    // X is ignored on purpose
  }
}

function drawMotif() {
  background(51);
  translate(width / 2, height / 2);

  let copies = 4; // try 6 or 8 next
  for (let i = 0; i < copies; i++) {
    push();
    rotate((TWO_PI / copies) * i);
    turtle();
    pop();
  }
}

function setup() {
  createCanvas(400, 400);
  angle = radians(45);
  drawMotif();

  let button = createButton("generate");
  button.mousePressed(generate);
}
