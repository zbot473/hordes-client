const { ipcRenderer } = require("electron");
console.log("hi")
ipcRenderer.send("requestPlayerData");
document.getElementById(
    "bg"
).style.backgroundImage = `url("../images/backgrounds/background${Math.round(
    Math.random() * 5 + 1
)}.png")`;

ipcRenderer.on("error", (e, m) => {
    switch (m) {
        case "loggedOut":
            var btn = document.getElementById("play");
            document.getElementById("socialMenu").style.visibility = "hidden"
            document.getElementById("moreMenu").style.visibility = "hidden"
            btn.innerHTML = "Login";
            btn.addEventListener("click", () => {
                ipcRenderer.send("loginRequest");
            });
            break;
        case "connReset":
            dialogShow(
                "Connection Reset",
                "Check your connection. If you are behind a firewall, such as an office or school, this may be the cause."
            );
            break;
        case "noConnection":
            dialogShow(
                "Connection Failed",
                "You seem to be offline. Check your internet connection and any networking equipment."
            );
            break;
    }
});
ipcRenderer.on("players", (e, m) => {
    var charLis = [];

    m.forEach((e, i) => {
        let list = document.getElementById("playerList");
        let fac = e.faction == 0 ? "vanguard" : "bloodlust";
        let cls = ["warrior", "mage", "archer", "shaman"][e.class];
        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        li.innerHTML = `<div class="imageHolder">
            <img src="../images/class/${cls}.svg" alt="${cls}" class="classImage svg">
    </div>
    <div class="mainText">
        <div>${e.name}</div>
        <div>Lv. ${e.level}</div>
    </div>
    <div class="factionImage"> <img src="../images/faction/${fac}.svg" alt="${fac}" class="svg">
    </div>`;
        charLis.push(li);
        li.setAttribute("data-id", e.id.toString());
        li.addEventListener("click", () => {
            charLis.forEach(e => {
                e.classList.remove("active");
            });
            li.classList.add("active");
            var btn = document.getElementById("play");

            btn.addEventListener("click", () => {
                var index = parseInt(
                    document
                        .querySelector("#playerList > li.active")
                        .getAttribute("data-index")
                );
                console.log(index);
                ipcRenderer.send("joinRequest", m[index]);
            });
        });
        list.appendChild(li);
    });
});

ipcRenderer.on("joinConformation", (e, m) => {
    window.location.href = "https://hordes.io/play";
});

var menuBtns = document.getElementsByClassName("menuButton");
for (const i in menuBtns) {
    if (menuBtns.hasOwnProperty(i)) {
        const e = menuBtns[i];
        e.menuActive = false;
        e.addEventListener("click", () => {
            if (e.menuActive) {
                e.classList.remove("active");
                e.parentElement.classList.remove("active");
                e.parentElement.children[1].classList.add("inactive");
                e.parentElement.style.marginTop = "";
            } else {
                e.classList.add("active");
                e.parentElement.classList.add("active");
                e.parentElement.children[1].classList.remove("inactive");
                e.parentElement.style.marginTop = "";
            }
            e.menuActive = !e.menuActive;
        });
        e.addEventListener("mouseenter", () => {
            if (!e.parentElement.classList.contains("active")) {
                e.parentElement.style.marginTop = "calc(100vh - 122px)";
            }
        });
        e.addEventListener("mouseleave", () => {
            if (!e.parentElement.classList.contains("active")) {
                e.parentElement.style.marginTop = "calc(100vh - 97px)";
            }
        });
        console.log(e.menuActive);
    }
}

/**
 *
 * @param {String} title
 * @param {String} message
 * @param {"error"|"info"|"choice"} type
 */
function dialogShow(title, message, type) {
    var scrim = document.createElement("div");
    scrim.className = "scrim";

    var dialog = document.createElement("div");
    dialog.className = "dialog";

    var titleTextWrapper = document.createElement("div");
    titleTextWrapper.className = "dialogTitleWrapper";

    var titleText = document.createElement("div");
    titleText.className = "dialogTitleText";
    titleText.innerText = title;
    titleTextWrapper.appendChild(titleText);

    var xButton = document.createElement("img");
    xButton.src = "../images/ui/close.svg";
    xButton.style.cursor = "pointer";
    xButton.addEventListener("click", () => {
        document.body.removeChild(scrim);
    });
    titleTextWrapper.appendChild(xButton);

    dialog.appendChild(titleTextWrapper);

    var mainText = document.createElement("div");
    mainText.className = "dialogMainText";
    mainText.innerText = message;

    dialog.appendChild(mainText);
    document.body.appendChild(scrim);
    scrim.appendChild(dialog);
    switch (type) {
        case "error":
            break;
    }
}
