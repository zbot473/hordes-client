const { ipcRenderer } = require("electron");

ipcRenderer.send("requestPlayerData");

ipcRenderer.on("error", (e, m) => {
    switch (m) {
        case "loggedOut":
            var btn = document.getElementById("play")
            btn.innerHTML = "Login"
            btn.addEventListener("click", () => {
                ipcRenderer.send("loginRequest")
            })
            break
    }
})
ipcRenderer.on("players", (e, m) => {
    var charLis = [];
    data = JSON.parse(m);
    data.forEach(e => {
        let list = document.getElementById("playerList");
        let fac = e.faction == 0 ? "vanguard" : "bloodlust";
        let cls = ["warrior", "mage", "archer", "shaman"][e.class];
        var li = document.createElement("li");
        li.innerHTML = `<div class="imageHolder">
            <img src="images/class/${cls}.svg" alt="${cls}" class="classImage svg">
    </div>
    <div class="mainText">
        <div>${e.name}</div>
        <div>Lv. ${e.level}</div>
    </div>
    <div class="factionImage"> <img src="images/faction/${fac}.svg" alt="${fac}" class="svg">
    </div>`;
        charLis.push(li);
        li.setAttribute("data-id", e.id.toString());
        li.addEventListener("click", () => {
            charLis.forEach(e => {
                e.classList.remove("active");
            });
            li.classList.add("active");
            var btn = document.getElementById("play")
            btn.addEventListener("click", () => {
                ipcRenderer.send("joinRequest",e)
            })
        });
        list.appendChild(li);
    });
});

ipcRenderer.on("joinConformation", (e, m) => {
    window.location.href = "https://hordes.io/play"
})


