function playSound(drum) {
    new Audio(`./sounds/${drum}.mp3`).play();
}

const buttons = document.querySelectorAll("button");
const body = document.querySelector("body");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playSound(button.id);
        button.classList.add("pressed");
        setTimeout(() => {
            button.classList.remove("pressed");
        }, 100);
    });
});

body.addEventListener("keydown", (e) => {
    e.preventDefault();
    switch (e.key) {
        case "w":
            document.querySelector(".w").click();
            break;
        case "a":
            document.querySelector(".a").click();
            break;
        case "s":
            document.querySelector(".s").click();
            break;
        case "d":
            document.querySelector(".d").click();
            break;
        case "j":
            document.querySelector(".j").click();
            break;
        case "k":
            document.querySelector(".k").click();
            break;
        case "l":
            document.querySelector(".l").click();
            break;
    }
});

-console.log(buttons);
