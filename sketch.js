// variables: F+-[]><
// axiom: X
// rules: F → F>+F<-F, 
//        X → F[+X][-X]
// > = increase angle
// < = decrease angle


var angle;
var axiom = "X";
var sentence = axiom;
var len = 100
var angleStack = [];


var rules = [];
rules[0] = {
    a: "F",
    b: "F>+F<-F"
}

rules[1] = {
    a: "X",
    b: "F[+X][-X]"
}

function generate(){
    len *= 0.5;
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++) {
        var current = sentence.charAt(i);
        var found = false;
        for (var j = 0; j < rules.length; j++) {
            if (current == rules[j].a) {
                found = true;
                nextSentence += rules[j].b;
                break;
            }
        }
        if (!found) {
        nextSentence += current;
        }
    }
    sentence = nextSentence;
    createP(sentence);
    turtle();
}

function turtle() {
    background(51);
    resetMatrix();

    angle = radians(20);   
    angleStack = [];       

    translate(width / 2, height); 

    stroke(255, 100);
    
    for (var i = 0; i < sentence.length; i++) {
        var current = sentence.charAt(i);

        if (current == "F") {
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (current == "+") {
            rotate(angle) //rotate by +x degrees
        } else if (current == "-") {
            rotate(-angle) //rotate by -x degrees 
        } else if (current == "[") { //save angle
            push(); 
            angleStack.push(angle);
        } else if (current == "]") { //restore angle
            pop();
            angle = angleStack.pop();
        } else if (current == ">") {
            angle *= 1.1;   // increase angle
        } else if (current == "<") {
            angle *= 0.9;   // decrease angle
        }
    }
}

function setup() {
  createCanvas(400, 400);
  angle = radians(20);
  background(51);
  createP(axiom);
  turtle();
  var button = createButton("generate")
  button.mousePressed(generate);
}



