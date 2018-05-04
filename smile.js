var WORLD_SIZE = 50;
var world = [];
var faces = [];
var GHOST = "&#x1f47b;";
var SMILES = [ "&#x1f631", "&#x1f611;", "&#x1f642;", "&#x1f604;", "&#x1f613;", "&#x1f614;", "&#x1f622;", "&#x1f62d;", "&#x1f630;" ];
var INTERVAL = 777;

window.onload = function() {
  seed();
  update();
  rewrite();

  setInterval(function() {
    update();
    rewrite();
  }, INTERVAL);
}

function seed() {
  for (var i = 0; i < WORLD_SIZE; i++) {
    world[i] = [];
    faces[i] = [];
    for (var j = 0; j < WORLD_SIZE; j++) {
      if (i == 0 || i == WORLD_SIZE - 1 ||
          j == 0 || j == WORLD_SIZE - 1) {
        world[i][j] = 0;
      } else {
        world[i][j] = Math.round(Math.random());
      }
      faces[i][j] = GHOST;
    }
  }
}

function update() {
  var n;
  var next = world.slice();

  for (var i = 1; i < WORLD_SIZE - 1; i++) {
    next[i] = [];
    for (var j = 1; j < WORLD_SIZE - 1; j++) {
      n = 0;
      for (var s = -1; s < 2; s++) {
        for (var t = -1; t < 2; t++) {
          if (!(s == 0 && t == 0) && world[i+s][j+t] == 1) {
            n++;
          }
        }
      }

      // giudizio
      if (world[i][j] == 1 && (n == 2 || n == 3)) {
        next[i][j] = 1;
      } else if (world[i][j] == 0 && n == 3) {
        next[i][j] = 1;
      } else {
        next[i][j] = 0;
      }
      faces[i][j] = (world[i][j] == 1 ? SMILES[n] : GHOST);
    }
  }
  world = next.slice();
}

function rewrite() {
  ws = "<tt>";
  for (var i = 1; i < WORLD_SIZE - 1; i++) {
    for (var j = 1; j < WORLD_SIZE - 1; j++) {
      ws += faces[i][j];
    }
    ws += "\n"
  }
  ws +="</tt>"

  var p = document.getElementById('smileworld');
  p.innerHTML = ws;
}
