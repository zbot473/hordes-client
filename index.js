const { app, BrowserWindow,screen } = require("electron");
const fs = require("fs");
const DiscordRPC = require("discord-rpc");
var window;
const clientId = "693476070229409874";

var rpcReady = false;
var activity = {
    details: "Idle",
    state: `In Menu`,
    startTimestamp: Date.now(),
    largeImageKey: "hordes_icon",
    largeImageText: "Hordes.io",
    instance: false
};

function createWindow() {
      const { width, height } = screen.getPrimaryDisplay().workAreaSize

    window = new BrowserWindow({
        width,
        height,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    window.loadURL("https://hordes.io/login", {
        userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
    });

    window.webContents.on("did-finish-load", function() {
        fs.readFile(__dirname + "/style.css", function(e, d) {
            window.webContents.insertCSS(d.toString());
        });
    });

    window.webContents.on("will-navigate", function(e, u) {
        if (u == "https://hordes.io/play") {
            activity.state = "Playing";
            activity.details = "Guardstone";
            activity.startTimestamp = Date.now();
        }
        else if (u=="https://hordes.io/"){
            activity.state = "Idle";
            activity.details = "In Menu";
            activity.startTimestamp = Date.now();
        }
        if (rpcReady) {
            setActivity();
        }
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: "ipc" });

async function setActivity() {
    rpc.setActivity(activity);
}

rpc.on("ready", () => {
    rpcReady = true;
    setActivity();
});

rpc.login({ clientId }).catch(console.error);
