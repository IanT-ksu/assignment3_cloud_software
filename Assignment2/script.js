const inputform = document.getElementById("submitForm");
const loginform = document.getElementById("loginForm");
const counterOutput = document.getElementById("stats");

const targetRose = document.getElementById("flower_rose");
const targetHydrangea = document.getElementById("flower_hydrangea");
const targetOrchid = document.getElementById("flower_orchid");
const targetSunflower = document.getElementById("flower_sunflower");
const targetPetunia = document.getElementById("flower_petunia");
const targetDaisy = document.getElementById("flower_daisy");
const targetPansy = document.getElementById("flower_pansy");
const targetZinnia = document.getElementById("flower_zinnia");


inputform.addEventListener('submit', function (e) {
    e.preventDefault();

    counterOutput.innerHTML = 
    `Rose:  ${data.count.Rose || 0}<br>
        Hydrangea: ${data.count.Hydrangea || 0}<br>
        Orchid:  ${data.count.Orchid || 0}<br>
        Sunflower:  ${data.count.Sunflower || 0}<br>
        Petunia:  ${data.count.Petunia || 0}<br>
        Daisy: ${data.count.Daisy || 0} <br>
        Pansy: ${data.count.Pansy || 0} <br>
        Zinnia:  ${data.count.Zinnia || 0}`;
});

const planted_flowers = document.querySelectorAll("#planted");
const response_message = document.getElementById("result");

inputform.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch("response.php", {
            method: "POST",
            body: formData
        });

        console.log(response);

        const data = await response.json();

        console.log(data);

        response_message.textContent = data.response;

        planted_flowers.forEach(image => {
            image.src = "/imgs/" + data.flower + ".jpg";
            image.alt = "Planted " + data.flower + " picture";
        });
    }
    catch (error) {
        console.error("An error occurred: " + error);
    }
});

inputform.addEventListener('reset', function (e) {
    planted_flowers.forEach(image => {
            image.src = "/imgs/icon.png";
            image.alt = "Planted flower picture";
        });
    response_message.textContent = "";
});