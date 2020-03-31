const template = function(app, window) {
    let template = [
        {
            label: "Edit",
            submenu: [
                {
                    role: "undo"
                },
                {
                    role: "redo"
                },
                {
                    type: "separator"
                },
                {
                    role: "cut"
                },
                {
                    role: "copy"
                },
                {
                    role: "paste"
                },
                {
                    role: "pasteandmatchstyle"
                },
                {
                    role: "delete"
                },
                {
                    role: "selectall"
                }
            ]
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Reload",
                    accelerator: "CmdOrCtrl+R",
                    click(item, focusedWindow) {
                        if (focusedWindow) focusedWindow.reload();
                    }
                },
                {
                    type: "separator"
                },
                {
                    role: "resetzoom"
                },
                {
                    role: "zoomin"
                },
                {
                    role: "zoomout"
                },

                {
                    type: "separator"
                },
                {
                    role: "toggledevtools"
                },
                {
                    role: "togglefullscreen"
                }
            ]
        },
        {
            role: "window",
            submenu: [
                {
                    role: "minimize"
                },
                {
                    role: "close"
                }
            ]
        }
    ];

    if (process.platform === "darwin") {
        const name = app.name;
        template.unshift({
            label: name,
            submenu: [
                {
                    role: "about"
                },
                {
                    type: "separator"
                },
                {
                    label: "Preferences",
                    accelerator: "CmdOrCtrl+,",
                    click() {
                        window.loadURL("https://hordes.io/account", {
                            
                            userAgent:
                                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
                        });
                    }
                },
                {
                    type: "separator"
                },
                {
                    role: "hide"
                },
                {
                    role: "hideothers"
                },
                {
                    role: "unhide"
                },
                {
                    type: "separator"
                },
                {
                    role: "quit"
                }
            ]
        });
        // Window menu.
        template[3].submenu = [
            {
                label: "Main Menu",
                accelerator: "CmdOrCtrl+1",
                click() {
                    window.loadFile("index.html")
                }
            },
            {
                label: "Play",
                accelerator: "CmdOrCtrl+2",
                click() {
                    window.loadURL("https://hordes.io/play", {
                        userAgent:
                            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
                    });
                }
            },
            {
                label: "Editor",
                accelerator: "CmdOrCtrl+3",
                click() {
                    window.loadURL("https://hordes.io/worldeditor", {
                        userAgent:
                            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
                    });
                }
            },
            {
                type: "separator"
            },
            {
                label: "Close",
                accelerator: "CmdOrCtrl+W",
                role: "close"
            },
            {
                label: "Minimize",
                accelerator: "CmdOrCtrl+M",
                role: "minimize"
            },
            {
                type: "separator"
            },
            {
                label: "Bring All to Front",
                role: "front"
            }
        ];
    }
    return template;
};

module.exports = template;
