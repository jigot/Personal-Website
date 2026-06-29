const wrapper = document.getElementById("tiles");

let columns = Math.floor(document.body.clientWidth / 50),
    rows = Math.floor(document.body.clientHeight / 50);

/* const colors = [
  "#fbe6f0", // barely pink
  "#e7fcfa", // barely mint
  "#e9e6fb", // barely lavender
  "#fef0e3", // barely peach
  "#e2ffdf"  // barely green
]; */
let toggled=false;

const handleOnClick = index => {
    toggled=!toggled;

    document.body.classList.toggle("toggled");

    anime({
        targets: ".tile",
        opacity: toggled? 0:1,
        delay: anime.stagger(50, {
            grid: [columns, rows],
            from: index,
            easing: "easeOutQuad",
        })
    })
}

const getRandomIndex = () => {
    return Math.floor(Math.random() * (columns * rows));
};

const triggerRandomRipple = () => {
    handleOnClick(getRandomIndex());

    const nextDelay = 1500 + Math.random() * 2000;
    setTimeout(triggerRandomRipple, nextDelay);
};

triggerRandomRipple();

const createTile = index => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.onclick = e => handleOnClick(index);
    return tile;
}

const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile,index) => {
        wrapper.appendChild(createTile(index));
    })
}

const createGrid = () => {
    wrapper.innerHTML = "";
    columns = Math.floor(document.body.clientWidth / 50);
    rows = Math.floor(document.body.clientHeight / 50);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);

    createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();