const calendarContainer = document.querySelector(".container");
const audio = document.querySelector("audio");

const currentDate = new Date();
const currentDay = currentDate.getDate();
var sumOfDays = 0;

const openDoorFirst = (day, event) => {
    event.target.style.opacity = "1";
    event.target.addEventListener("click", openDoorSecond.bind(null, day), { once: true });
}

const openDoorSecond = (day, event) => {
    if (day <= currentDay) {
            event.target.parentNode.style.backgroundImage = `url(./images/tuer${day}.png)`;
            event.target.addEventListener("click", openDoorThird.bind(null, day), { once: true });
        }
}

const openDoorThird = (day, event) => {
    event.target.style.opacity = "0";
    if (day != 24) {
        event.target.addEventListener("click", openDoorFourth.bind(null, day), { once: true });
    }
    sumOfDays = sumOfDays + day;
    if (sumOfDays == 300) { // Summe von 1 bis 24
        calendarContainer.style.backgroundImage = `url(./images/calendar24.png)`;
        document.querySelectorAll(".image").forEach((e) => e.parentNode.removeChild(e));
        audio.play();
    }
}

const openDoorFourth = (day) => {
    window.open("./tueren/tuer" + day + ".html");
}

const createCalendar = () => {
    for(let i = 0; i < 24; i++) {
        const calendarDoor = document.createElement("div");
        const calendarDoorText = document.createElement("div");

        calendarDoor.classList.add("image");
        calendarDoor.style.gridArea = "door" + (i + 1);
        calendarContainer.appendChild(calendarDoor);

        calendarDoorText.classList.add("text");
        calendarDoorText.innerHTML = i + 1;
        calendarDoor.appendChild(calendarDoorText);

        day = i + 1;

        calendarDoorText.addEventListener("click", openDoorFirst.bind(null, day), { once: true });
    }
}