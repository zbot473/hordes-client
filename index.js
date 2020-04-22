const {
    app,
    BrowserWindow,
    screen,
    Menu,
    shell,
    session,
    ipcMain
} = require("electron");

const keytar = require("keytar");

var fetch;
if (process.env.USETOR == "true") {
    const wrappedFetch = require("socks5-node-fetch");
    fetch = wrappedFetch({
        socksHost: "127.0.0.1",
        socksPort: "9050"
    });
} else {
    fetch = require("node-fetch");
}

const { autoUpdater } = require("electron-updater");
const fs = require("fs");
const template = require("./menu");
const DiscordRPC = require("discord-rpc");

var window;
const clientId = "693476070229409874";

var rpcReady = false;
var activity = {
    details: "Idle",
    state: `In Menu`,
    startTimestamp: Date.now(),
    largeImageKey: "hordes_icon",
    largeImageText: "Hordes.io"
};

var activeWorld, lastChar;
app.commandLine.appendSwitch("disable-frame-rate-limit");
function createWindow() {
    autoUpdater.checkForUpdatesAndNotify();

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    window = new BrowserWindow({
        width,
        height,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
        minHeight: 600,
        minWidth: 800,
        backgroundColor: "#000000",
        autoHideMenuBar: true
    });

    if (process.env.USETOR == "true") {
        window.webContents.session.setProxy({
            proxyRules: "socks5://127.0.0.1:9050"
        });
    }
    const menu = Menu.buildFromTemplate(template(app, window));
    Menu.setApplicationMenu(menu);

    window.loadFile("views/index.html");
    window.webContents.on("did-finish-load", function () {
        fs.readFile(__dirname + "/css/scrollbar.css", function (e, d) {
            window.webContents.insertCSS(d.toString());
        });
    });

    ipcMain.on("loginRequest", () => {
        window.loadURL("https://hordes.io/login", {
            userAgent:
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
        });
    });

    window.webContents.on("new-window", function (e, url) {
        e.preventDefault();
        shell.openExternal(url);
    });

    window.on("closed", () => {
        window = null;
    });

    window.webContents.session.webRequest.onBeforeRequest(
        { urls: ["*://hordes.io/*"] },
        (details, cb) => {
            if (details.url == "https://hordes.io/") {
                activity = {
                    details: "Idle",
                    state: `In Menu`,
                    startTimestamp: Date.now(),
                    largeImageKey: "hordes_icon",
                    largeImageText: "Hordes.io",
                    instance: false
                };
                setActivity();
                window.loadFile("views/index.html");
            } else if (details.url == "https://hordes.io/play") {
                window.webContents.executeJavaScript(
                    `window.localStorage.setItem("activeWorld",JSON.stringify("${activeWorld}"));
                        window.localStorage.setItem("lastConnectedChar",JSON.stringify("${lastChar}"))
                        `
                );
                fs.readFile(__dirname + "/js/uimod.js", (e, d) => {
                    window.webContents.executeJavaScript(d.toString());
                    fs.readFile(__dirname + "/css/uimod.css", (e, d) => {
                        window.webContents.insertCSS(d.toString());
                    });
                });
                var interval = setInterval(() => {
                    if (!window) {
                        clearInterval(interval);
                        return;
                    }
                    window.webContents
                        .executeJavaScript(
                            'try {document.getElementsByClassName("partyframes")[0].childElementCount} catch {}'
                        )
                        .then(async e => {
                           
                        })
                        .catch(() => {
                            delete activity.partySize;
                            delete activity.partyMax;
                        });
                    setActivity();
                }, 15e3);
                cb({ cancel: false });
            } 
            else {
                cb({ cancel: false });
            }
        }
    );

    window.webContents.session.webRequest.onHeadersReceived(
        {
            urls: ["*://hordes.io/*"]
        },
        (details, cb) => {
            var headers = details.responseHeaders["set-cookie"];
            if (headers) {
                var opts = headers[0].split("; ");
                if (opts[0].startsWith("sid=")) {
                    keytar.setPassword(
                        "Hordes.io",
                        "mainAccount",
                        opts[0].substring("4")
                    );
                    window.loadFile("views/index.html");
                }
            }
            cb({ cancel: false });
        }
    );
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    // if (process.platform !== "darwin") {
    app.quit();
    // }
});
app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});

function sendPlayerData() {
    keytar.getPassword("Hordes.io", "mainAccount").then(e => {
        if (e) {
            const cookie = {
                url: "https://hordes.io",
                name: "sid",
                value: e
            };
            session.defaultSession.cookies.set(cookie).then(error => {
                console.error(error);
            });
            fetch("https://hordes.io/api/user/players", {
                credentials: "include",
                headers: {
                    accept: "*/*",
                    "accept-language": "en-US",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    cookie: "sid=" + e
                },
                referrerPolicy: "no-referrer-when-downgrade",
                mode: "cors"
            })
                .then(async e => {
                    var data = await e.json();
                    if (data.status == "denied") {
                        keytar.deletePassword("Hordes.io", "mainAccount");
                        window.webContents.send("error", "loggedOut");
                    } else {
                        window.webContents.send("players", data);
                    }
                })
                .catch(e => {
                    switch (e.errno) {
                        case "ECONNRESET":
                            window.webContents.send("error", "connReset");
                            break;
                        case "ENOTFOUND":
                            window.webContents.send("error", "noConnection");
                            break;
                        default:
                            window.webContents.send("error", e.reason);
                            break;
                    }
                });
        } else {
            window.webContents.send("error", "loggedOut");
        }
    });
}
ipcMain.on("requestPlayerData", () => {
    sendPlayerData();
});

function joinRequest(data) {
    activeWorld = data.world;
    lastChar = data.id;
    activity.details =
        activeWorld.charAt(0).toUpperCase() + activeWorld.slice(1);
    activity.state = "In Game";
    let fac = data.faction == 0 ? "vanguard" : "bloodlust";
    let cls = ["warrior", "mage", "archer", "shaman"][data.class];
    activity.largeImageKey = cls;
    activity.smallImageKey = fac;
    activity.largeImageText = "Playing as " + data.name;
    activity.smallImageText =
        data.faction == 0 ? "Faction: Vanguard" : "Faction: Bloodlust";
    activity.startTimestamp = Date.now();
    setActivity();
    keytar.getPassword("Hordes.io", "mainAccount").then(e => {
        if (e) {
            const cookie = {
                url: "https://hordes.io",
                name: "sid",
                value: e
            };
            session.defaultSession.cookies.set(cookie).then(error => {
                console.error(error);
            });

            fetch("https://hordes.io/api/user/join", {
                credentials: "include",
                headers: {
                    accept: "*/*",
                    "accept-language": "en-US",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    cookie: "sid=" + e
                },
                method: "POST",
                referrerPolicy: "no-referrer-when-downgrade",
                mode: "cors",
                body: `{"id":${data.id}}`
            }).then(async e => {
                console.log(e)
                window.webContents.send("joinConformation", await e.text());
            });
        }
    });
}

ipcMain.on("joinRequest", (e, m) => {
    joinRequest(m);
});

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: "ipc" });

async function setActivity() {
    rpc.setActivity(activity).catch(() => {});
}

rpc.on("ready", () => {
    rpcReady = true;
    rpc.subscribe("ACTIVITY_JOIN", async e => {
        let url = new URL(e.secret);
        activity.partyId = url.searchParams.get("party");
        activity.joinSecret = url.href;
        let response = await fetch(e.secret);
        let cookies = response.headers.raw()["set-cookie"];
        cookies.forEach(e => {
            var split = e.split("=");
            const cookie = {
                url: "https://hordes.io/",
                name: split[0],
                value: split[1]
            };
            session.defaultSession.cookies.set(cookie).then(
                () => {
                    window.loadURL("https://hordes.io/play");
                },
                error => {
                    console.error(error);
                }
            );
        });
    }).catch(e => {
        console.error("err");
    });
    setActivity();
});

rpc.login({ clientId }).catch(() => {
    console.error("Error: Could not connect to RPC");
});
