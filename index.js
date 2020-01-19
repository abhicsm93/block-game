var arr = [1, 2, 3, 4, 5, 6, 7, 8];
let gridContainer;
let newGame;
let undo;
let autoSolve;
let moveDetails;
var stack = [];
var counter = 0;

window.onload = () => {
  document.getElementById("move-counter").innerHTML = 0;
  gridContainer = document.getElementById("grid-container");
  newGame = document.getElementById("new-game");
  undo = document.getElementById("undo");
  moveDetails = document.getElementById("move-details");
  let arr1 = shuffle(arr);
  renderArray(arr1);
  newGame.addEventListener("click", () => {
    location.reload();
  });

  let p = document.createElement("p");
  p.className = "null";
  p.innerHTML = 0;
  gridContainer.appendChild(p);
  arr1.push(0);
  gridContainer.addEventListener("click", e => {
    let i = e.target.id;
    let selectedIndex = arr1.indexOf(parseInt(i));
    let zeroIndex = arr1.indexOf(0);
    if (
      Math.abs(selectedIndex - zeroIndex) === 1 ||
      Math.abs(selectedIndex - zeroIndex) === 3
    ) {
      stack.push(selectedIndex);
      stack.push(zeroIndex);
      counter++;
      let move = document.createElement("li");
      move.innerHTML = `moved ${arr1[selectedIndex]} to [${Math.floor(
        zeroIndex / 3
      )}][${zeroIndex % 3}]`;
      moveDetails.appendChild(move);
      swap(selectedIndex, zeroIndex, arr1);
    }
  });
  undo.addEventListener("click", () => {
    let zeroIndex = stack.pop();
    let selectedIndex = stack.pop();
    counter--;
    moveDetails.removeChild(moveDetails.lastChild);
    swap(selectedIndex, zeroIndex, arr1);
  });
};

swap = (selectedIndex, zeroIndex, arr1) => {
  document.getElementById("move-counter").innerHTML = counter;
  let temp;
  temp = arr1[selectedIndex];
  arr1[selectedIndex] = arr1[zeroIndex];
  arr1[zeroIndex] = temp;
  gridContainer.innerHTML = null;
  renderArray(arr1);
  if (arr1.indexOf(0) === 8) check(arr1);
};

check = arr1 => {
  let check = true;
  for (i = 0; i < arr1.length - 2; i++) {
    if (arr1[i] > arr1[i + 1]) {
      check = false;
      break;
    }
  }
  if (check) alert("completed");
};

renderArray = arr1 => {
  arr1.map(item => {
    var p = document.createElement("p");
    if (item === 0) {
      p.className = "null";
    } else {
      p.className = "tiles";
    }

    p.id = item;
    p.innerHTML = item;
    gridContainer.appendChild(p);
  });
};

shuffle = arr => {
  let ctr = arr.length;
  let temp;
  let index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arr[ctr];
    arr[ctr] = arr[index];
    arr[index] = temp;
  }
  return arr;
};
