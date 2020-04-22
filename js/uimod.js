(function () {
    function e(t, n, o) {
        function r(a, i) {
            if (!n[a]) {
                if (!t[a]) {
                    var l = "function" == typeof require && require;
                    if (!i && l) return l(a, !0);
                    if (s) return s(a, !0);
                    var c = new Error("Cannot find module '" + a + "'");
                    throw ((c.code = "MODULE_NOT_FOUND"), c);
                }
                var d = (n[a] = { exports: {} });
                t[a][0].call(
                    d.exports,
                    function (e) {
                        var n = t[a][1][e];
                        return r(n || e);
                    },
                    d,
                    d.exports,
                    e,
                    t,
                    n,
                    o
                );
            }
            return n[a].exports;
        }
        for (
            var s = "function" == typeof require && require, a = 0;
            a < o.length;
            a++
        )
            r(o[a]);
        return r;
    }
    return e;
})()(
    {
        1: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : { default: e };
                }
                function r() {
                    const e = document.querySelector(".layout");
                    if (e.classList.contains("uimod-initd")) return;
                    e.classList.add("uimod-initd"), (0, a.loadState)();
                    const t = (0, a.getState)(),
                        n = {
                            onDomChange: [],
                            onChatChange: [],
                            onLeftClick: [],
                            onRightClick: []
                        },
                        o = e => n.onDomChange.push(e),
                        r = e => n.onChatChange.push(e),
                        i = e => n.onLeftClick.push(e),
                        l = e => n.onRightClick.push(e),
                        c = t.disabledMods;
                    s.default.forEach(e => {
                        if (!c.includes(e.name))
                            try {
                                e.run({
                                    registerOnDomChange: o,
                                    registerOnChatChange: r,
                                    registerOnLeftClick: i,
                                    registerOnRightClick: l
                                });
                            } catch (t) {
                                console.error(
                                    `UI Mod Error: Problem running mod ${
                                        e.name
                                    }, error: ${t.toString()}`
                                );
                            }
                    });
                    const d = new MutationObserver(e => {
                        n.onDomChange.forEach(t => t(e));
                    });
                    Array.from(
                        document.querySelectorAll(
                            ".layout > .container, .actionbarcontainer, .partyframes, .targetframes"
                        )
                    ).forEach(e => {
                        d.observe(e, { attributes: !1, childList: !0 });
                    });
                    const u = new MutationObserver(e => {
                        n.onChatChange.forEach(t => t(e));
                    });
                    u.observe(document.querySelector("#chat"), {
                        attributes: !1,
                        childList: !0
                    }),
                        document.body.classList.contains("js-uimod-initd") ||
                            (document.body.classList.add("js-uimod-initd"),
                            n.onLeftClick.forEach(e =>
                                document.body.addEventListener("click", e)
                            ),
                            n.onRightClick.forEach(e =>
                                document.body.addEventListener("contextmenu", e)
                            ));
                }
                var s = o(e("./mods")),
                    a = e("./utils/state");
                const i = new MutationObserver(() => {
                    const e = !!document.querySelector(".layout");
                    e && r();
                });
                i.observe(document.body, { attributes: !0, childList: !0 });
            },
            { "./mods": 22, "./utils/state": 45 }
        ],
        2: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = document.querySelector(
                        ".divide:not(.js-settings-initd)"
                    );
                    if (!e) return;
                    e.classList.add("js-settings-initd");
                    const t = e.querySelector(".choice").parentNode;
                    t.appendChild(
                        (0, r.makeElement)({
                            element: "div",
                            class: "choice js-blocked-players",
                            content: "Blocked players"
                        })
                    ),
                        t.appendChild(
                            (0, r.makeElement)({
                                element: "div",
                                class: "choice js-mod-toggler-open",
                                content: "Toggle Mods"
                            })
                        ),
                        t.appendChild(
                            (0, r.makeElement)({
                                element: "div",
                                class: "choice js-reset-ui-pos",
                                content: "Reset UI Positions"
                            })
                        ),
                        document
                            .querySelector(".js-blocked-players")
                            .addEventListener("click", s.createBlockList),
                        document
                            .querySelector(".js-reset-ui-pos")
                            .addEventListener("click", s.resetUiPositions),
                        document
                            .querySelector(".js-mod-toggler-open")
                            .addEventListener("click", s.createModToggler),
                        (0, s.isWindowOpen)(s.WindowNames.blockList) &&
                            (0, s.createBlockList)(),
                        (0, s.isWindowOpen)(s.WindowNames.modToggler) &&
                            (0, s.createModToggler)();
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var r = e("../../utils/misc"),
                    s = e("../../utils/ui"),
                    a = {
                        name: "[REQUIRED] Custom settings",
                        description:
                            "Do not disable this! Allows you to view and remove blocked players from the Settings window. Adds Reset UI Position and Mod Toggler to settings.",
                        run: ({ registerOnDomChange: e }) => {
                            o(), e(o);
                        },
                        required: !0
                    };
                n.default = a;
            },
            { "../../utils/misc": 43, "../../utils/ui": 46 }
        ],
        3: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = (0, r.getTempState)();
                    window.addEventListener("keydown", t => {
                        if ("Control" === t.key) e.keyModifiers.control = !0;
                        else if ("Alt" === t.key) e.keyModifiers.alt = !0;
                        else if ("Shift" === t.key) {
                            if (e.gettingTooltipContentShiftPress) return;
                            e.keyModifiers.shift = !0;
                        }
                    }),
                        window.addEventListener("keyup", t => {
                            "Control" === t.key
                                ? (e.keyModifiers.control = !1)
                                : "Alt" === t.key
                                ? (e.keyModifiers.alt = !1)
                                : "Shift" === t.key &&
                                  (e.keyModifiers.shift = !1);
                        }),
                        window.addEventListener("focus", () => {
                            (e.keyModifiers.control = !1),
                                (e.keyModifiers.alt = !1),
                                (e.keyModifiers.shift = !1);
                        });
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var r = e("../../utils/state"),
                    s = {
                        name: "[REQUIRED] Key press tracker",
                        description:
                            "Identifies when you are pressing Ctrl/etc key modifiers, which is used by some other mods",
                        run: o,
                        required: !0
                    };
                n.default = s;
            },
            { "../../utils/state": 45 }
        ],
        4: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (o = function () {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = o();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        r =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = r
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                function s() {
                    a.addChatMessage(
                        `Hordes UI Mod v${i.VERSION} is now running.`
                    );
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var a = r(e("../../utils/chat")),
                    i = e("../../utils/version"),
                    l = {
                        name: "[REQUIRED] UI Mod Startup",
                        description:
                            "Do not remove this! This displays a welcome message and includes misc styles.",
                        run: s,
                        required: !0
                    };
                n.default = l;
            },
            { "../../utils/chat": 41, "../../utils/version": 47 }
        ],
        5: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : { default: e };
                }
                function r(e) {
                    const t = new RegExp("skills/([a-zA-Z0-9]+)."),
                        n = e.match(t);
                    return Array.isArray(n) ? n[1] : null;
                }
                function s(e, t) {
                    const n = t.querySelector("img");
                    if (!n) return;
                    const o = r(n.getAttribute("src"));
                    if (!o) return;
                    const s = document.querySelector(".js-skill-tooltip"),
                        a = l.default[o];
                    if (!a) return;
                    (s.querySelector(".js-tooltip-name").textContent = a.name),
                        (s.querySelector(".js-tooltip-desc").textContent =
                            a.description);
                    const i = s.querySelector(".js-tooltip-stats");
                    (i.innerHTML = ""),
                        a.stats
                            ? ((i.style.display = "block"),
                              (s.querySelector(
                                  ".js-buff-tooltip-effects"
                              ).style.display = "block"),
                              a.stats.forEach(e => {
                                  i.appendChild(
                                      (0, c.makeElement)({
                                          element: "div",
                                          class: "textgreen",
                                          content: e
                                      })
                                  );
                              }))
                            : ((i.style.display = "none"),
                              (s.querySelector(
                                  ".js-buff-tooltip-effects"
                              ).style.display = "none")),
                        s.setAttribute(
                            "style",
                            `left: ${e.pageX}px; top: ${
                                e.pageY - 50
                            }px; display: block;`
                        );
                }
                function a() {
                    const e = document.querySelector(".js-skill-tooltip");
                    e && (e.style.display = "none");
                }
                function i(e, t) {
                    const n = document.elementFromPoint(e.clientX, e.clientY);
                    n.classList.contains("cd") || n.classList.contains("icon")
                        ? t && s(e, t)
                        : a();
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.handleBuffTooltipDisplay = i),
                    (n.removeBuffTooltip = a);
                var l = o(e("./skills")),
                    c = e("../../utils/misc");
            },
            { "../../utils/misc": 43, "./skills": 7 }
        ],
        6: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if (document.querySelector(".js-skill-tooltip")) return;
                    const e =
                            '\n          <div class="container js-tooltip-content">\n              <div class="slottitle textblue js-tooltip-name"></div>\n              <div class="description js-tooltip-desc"></div>\n              <div class="uimod-skill-tooltip-text js-buff-tooltip-effects">Effects:</div>\n              <div class="js-tooltip-stats"></div>\n          </div>\n      ',
                        t = (0, a.makeElement)({
                            element: "div",
                            class:
                                "border blue slotdescription uimod-skill-tooltip js-skill-tooltip",
                            content: e
                        });
                    document.querySelector(".layout").appendChild(t),
                        document.body.addEventListener(
                            "mousemove",
                            s.handleBuffTooltipDisplay
                        );
                }
                function r() {
                    const e = Array.from(
                        document.querySelectorAll(
                            ".buffarray:not(.js-buffarray-initd)"
                        )
                    );
                    e.forEach(e => {
                        e.classList.add("js-buffarray-initd");
                        const t = new MutationObserver(() => {
                            const t = Array.from(
                                e.querySelectorAll(
                                    ".slot:not(.js-buff-tooltip-initd)"
                                )
                            );
                            t.forEach(e => {
                                e.classList.add("js-buff-tooltip-initd"),
                                    e.parentNode.addEventListener(
                                        "mousemove",
                                        t =>
                                            (0, s.handleBuffTooltipDisplay)(
                                                t,
                                                e
                                            )
                                    ),
                                    e.addEventListener(
                                        "mouseleave",
                                        s.removeBuffTooltip
                                    );
                            });
                        });
                        t.observe(e, { childList: !0 });
                    });
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var s = e("./helpers"),
                    a = e("../../utils/misc"),
                    i = {
                        name: "Buff Tooltips",
                        description:
                            "In a tooltip, shows a basic description of the buff that you are hovering over.",
                        run: ({ registerOnDomChange: e }) => {
                            o(), r(), e(r);
                        }
                    };
                n.default = i;
            },
            { "../../utils/misc": 43, "./helpers": 5 }
        ],
        7: [
            function (e, t, n) {
                "use strict";
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var o = {
                    21: {
                        name: "Armor Reinforcement",
                        description: "Passively increase your Defense.",
                        stats: ["+ Defense", "+ Increased Aggro Generation"]
                    },
                    2: {
                        name: "Bulwark",
                        description:
                            "Increase your block chance, while raising your damage for each successful block.",
                        stats: ["+ Block"],
                        notes: ["Stackable buff on block"]
                    },
                    18: {
                        name: "Centrifugal Laceration",
                        description:
                            "Your Crescent Swipe lacerates enemies, causing them to bleed for additional Damage.",
                        notes: ["x% as additional damage over 10 seconds"]
                    },
                    33: {
                        name: "Charge",
                        description:
                            "Charge towards your target while also stunning it. Stun duration increases with charge distance."
                    },
                    20: {
                        name: "Crusader's Courage",
                        description:
                            "You and your party members gain additional Defense.",
                        stats: ["+ Defense"]
                    },
                    17: {
                        name: "Colossal Reconstruction",
                        description:
                            "While active you are healed each time you block an attack."
                    },
                    19: {
                        name: "Unholy Warcry",
                        description:
                            "You and your party members deal additional Damage.",
                        stats: ["+ Min Dmg", "+ Max Dmg"]
                    },
                    18: {
                        name: "Bleed",
                        description:
                            "Crescent Swipe lacerates enemies, causing them to bleed for additional Damage.",
                        stats: ["x% as additional damage over 10 seconds"]
                    },
                    buffBlock: {
                        name: "Block",
                        description: "Blocks the damage from an enemy's attack."
                    },
                    4: {
                        name: "Frost Bolt",
                        description:
                            "Freezes targets for up to 4 stacks, at which they will be stunned and take 50% increased damage."
                    },
                    14: {
                        name: "Chilling Radiance",
                        description:
                            "Emit a chilling shockwave of ice around you, damaging and freezing enemies. Increases the critical hit chance of some of your spells.",
                        stats: [
                            "Empower Crit% of Ice bolt",
                            "Empower Crit% of Icicle Orb",
                            "+100 % Movement Spd. Reduction"
                        ]
                    },
                    23: {
                        name: "Ice Shield",
                        description:
                            "Protects you against the next incoming attacks.",
                        stats: ["# attacks blocked"]
                    },
                    16: {
                        name: "Hypothermic Frenzy",
                        description:
                            "You gain Haste and all your damage output is increased.",
                        stats: ["+ Haste", "+ Increased Dmg"]
                    },
                    24: {
                        name: "Enchantment",
                        description: "Increase your targets Damage.",
                        stats: ["+ Min Dmg", "+ Max Dmg"]
                    },
                    22: {
                        name: "Arctic Aura",
                        description:
                            "You and your party members gain additional Crit%.",
                        stats: ["+ Critical"]
                    },
                    frozenBuff: {
                        name: "Frozen",
                        description:
                            "Freezes targets for up to 4 stacks, at which they will be stunned and take 50% increased damage."
                    },
                    10: {
                        name: "Serpent Arrows",
                        description:
                            "Your Precise Shots will jump to additional targets while active.",
                        stats: ["# Jumps", "##% damage per Jump"]
                    },
                    11: {
                        name: "Invigorate",
                        description:
                            "Instantly recovers MP and increases your damage temporarily.",
                        stats: ["+ Increased damage"]
                    },
                    29: {
                        name: "Poison Arrows",
                        description:
                            "Your Precise Shot applies a poisonous Debuff on hit, damaging and slowing your enemies.",
                        stats: [
                            "###% per stack as additional damage over 10 seconds"
                        ]
                    },
                    27: {
                        name: "Pathfinding",
                        description:
                            "You and your party members gain additional Movement Speed.",
                        stats: ["+ Move Spd"]
                    },
                    26: {
                        name: "Cranial Punctures",
                        description: "Passively increase your Crit%.",
                        stats: ["+ Critical"]
                    },
                    25: {
                        name: "Temporal Dilation",
                        description:
                            "You and your party members gain additional Haste.",
                        stats: ["+ Haste"]
                    },
                    31: {
                        name: "Swift Shot",
                        description:
                            "Increases the damage of your next Swift Shots and allows them to be cast instantly."
                    },
                    38: {
                        name: "Dash",
                        description:
                            "You dash into your current direction, instantly resetting the cooldown of Precise Shot. Your next Precise Shot is an instant cast."
                    },
                    12: {
                        name: "Decay",
                        description:
                            "Curse your enemy with a spell of decay, dealing damage over time.",
                        stats: ["DMG", "+ Movement Spd. Reduction"]
                    },
                    7: {
                        name: "Revitalize",
                        description:
                            "Heal a friendly target over a short duration, stacking up to 3 times while also increasing the power of your Mend.",
                        stats: ["Heal"]
                    },
                    13: {
                        name: "Mimir's Well",
                        description:
                            "You and your party members quickly regenerate mana over a short period of time.",
                        stats: ["MP recovered"]
                    },
                    36: {
                        name: "Spirit Animal",
                        description:
                            "Turn into your spirit animal for additional movementspeed.",
                        stats: ["+ Move Spd"]
                    },
                    28: {
                        name: "Canine Howl",
                        description:
                            "You and your entire party enrages with haste, causing you to attack faster.",
                        stats: ["+ Haste"]
                    },
                    37: {
                        name: "Agonize",
                        description:
                            "Turns your target into a zombie, interrupting all actions, slowing it down, and reducing received healing for the duration.",
                        stats: ["Movement Spd. Reduction", "Healing Reduction"]
                    },
                    30: {
                        name: "Healing Totem",
                        description:
                            "Place a totem on the ground healing your entire party.",
                        stats: ["Heal"]
                    },
                    39: {
                        name: "Mount Riding",
                        description: "Allows you to ride ground mounts",
                        stats: ["+60 Move Spd"]
                    },
                    potionMp: { name: "MP Potion", stats: ["MP Recovered"] },
                    potionhp: { name: "HP Potion", stats: ["HP Recovered"] },
                    dazedBuff: {
                        name: "Dazed",
                        description:
                            "When you are hit from behind, you can be dazed. This slows your movement speed and dismounts you.",
                        stats: ["Movement Spd. Reduction"]
                    }
                };
                n.default = o;
            },
            {}
        ],
        8: [
            function (e, t, n) {
                "use strict";
                function o(e, t) {
                    const n = (0, r.getState)(),
                        o = document.querySelector(".js-chat-context-menu");
                    o
                        .querySelector('[name="friend"]')
                        .classList.toggle("js-hidden", !!n.friendsList[e]),
                        o
                            .querySelector('[name="unfriend"]')
                            .classList.toggle("js-hidden", !n.friendsList[e]),
                        (o.querySelector(".js-name").textContent = e),
                        o.setAttribute(
                            "style",
                            `display: block; left: ${t.x}px; top: ${t.y}px;`
                        );
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.showChatContextMenu = o);
                var r = e("../../utils/state");
            },
            { "../../utils/state": 45 }
        ],
        9: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (o = function () {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = o();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        r =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = r
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                function s() {
                    const e = (0, l.getTempState)();
                    if (document.querySelector(".js-chat-context-menu")) return;
                    let t =
                        '\n          <div class="js-name">...</div>\n          <div class="choice" name="party">Party invite</div>\n          <div class="choice" name="whisper">Whisper</div>\n          <div class="choice" name="friend">Friend</div>\n          <div class="choice" name="unfriend">Unfriend</div>\n          <div class="choice" name="copy">Copy name</div>\n          <div class="choice" name="block">Block</div>\n      ';
                    document.body.appendChild(
                        (0, c.makeElement)({
                            element: "div",
                            class:
                                "panel context border grey js-chat-context-menu",
                            content: t
                        })
                    );
                    const n = document.querySelector(".js-chat-context-menu");
                    n
                        .querySelector('[name="party"]')
                        .addEventListener("click", () => {
                            u.partyPlayer(e.chatName);
                        }),
                        n
                            .querySelector('[name="whisper"]')
                            .addEventListener("click", () => {
                                u.whisperPlayer(e.chatName);
                            }),
                        n
                            .querySelector('[name="friend"]')
                            .addEventListener("click", () => {
                                p.friendPlayer(e.chatName);
                            }),
                        n
                            .querySelector('[name="unfriend"]')
                            .addEventListener("click", () => {
                                p.unfriendPlayer(e.chatName);
                            }),
                        n
                            .querySelector('[name="copy"]')
                            .addEventListener("click", () => {
                                navigator.clipboard.writeText(e.chatName);
                            }),
                        n
                            .querySelector('[name="block"]')
                            .addEventListener("click", () => {
                                p.blockPlayer(e.chatName);
                            });
                }
                function a() {
                    const e = (0, l.getTempState)(),
                        t = (t, n) => {
                            t.classList.add("js-is-context-menu-initd"),
                                t.setAttribute("data-chat-name", n);
                            const o = t => {
                                (e.chatName = n),
                                    d.showChatContextMenu(n, {
                                        x: t.pageX,
                                        y: t.pageY
                                    });
                            };
                            t.addEventListener("click", o),
                                t.addEventListener("contextmenu", o);
                        };
                    Array.from(
                        document.querySelectorAll(
                            "#chat .name:not(.js-is-context-menu-initd)"
                        )
                    ).forEach(e => {
                        t(e, e.textContent);
                    }),
                        Array.from(
                            document.querySelectorAll(
                                ".textwhisper .textf1:not(.js-is-context-menu-initd), .textwhisper .textf0:not(.js-is-context-menu-initd)"
                            )
                        ).forEach(e => {
                            let n = e.textContent.split(" ");
                            n.shift(), (n = n.join(" ")), t(e, n);
                        });
                }
                function i(e) {
                    const t = e.target;
                    if (
                        t.classList.contains("js-is-context-menu-initd") ||
                        t.classList.contains("js-chat-context-menu")
                    )
                        return;
                    const n = document.querySelector(".js-chat-context-menu");
                    n.style.display = "none";
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var l = e("../../utils/state"),
                    c = e("../../utils/misc"),
                    d = r(e("./helpers")),
                    u = r(e("../../utils/chat")),
                    p = r(e("../../utils/player")),
                    m = {
                        name: "Chat Context Menu",
                        description:
                            "Displays a menu when you click on a player, allowing you to whisper/party/friend/block them",
                        run: ({
                            registerOnLeftClick: e,
                            registerOnChatChange: t
                        }) => {
                            s(), a(), e(i), t(a);
                        }
                    };
                n.default = m;
            },
            {
                "../../utils/chat": 41,
                "../../utils/misc": 43,
                "../../utils/player": 44,
                "../../utils/state": 45,
                "./helpers": 8
            }
        ],
        10: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (o = function () {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = o();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        r =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = r
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                function s() {
                    const e = (0, i.getState)();
                    let t = !1;
                    (e.chatTabs = e.chatTabs.map(e =>
                        e
                            ? (e.filters &&
                                  e.filters.hasOwnProperty("GM") &&
                                  (delete e.filters.GM, (t = !0)),
                              e)
                            : e
                    )),
                        e.chat && (delete e.chat, (t = !0)),
                        t && (0, i.saveState)();
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var a = r(e("../../utils/chat")),
                    i = e("../../utils/state"),
                    l = {
                        name: "Chat filters",
                        description:
                            "Filters all chat, e.g. ensuring blocked users' messages are not visible in chat.",
                        run: ({ registerOnChatChange: e }) => {
                            s(), e(a.filterAllChat);
                        }
                    };
                n.default = l;
            },
            { "../../utils/chat": 41, "../../utils/state": 45 }
        ],
        11: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = JSON.parse(
                        localStorage.getItem("filteredChannels")
                    );
                    return {
                        global: e.includes("global"),
                        faction: e.includes("faction"),
                        party: e.includes("party"),
                        clan: e.includes("clan"),
                        pvp: e.includes("pvp"),
                        inv: e.includes("inv")
                    };
                }
                function r(e, t) {
                    const n = (0, i.getState)(),
                        o = (0, i.getTempState)(),
                        r = document.querySelector(".js-chat-tab-config"),
                        s = n.chatTabs.find(t => t.id === e);
                    (r.style.left = `${t.x}px`),
                        (r.style.top = `${t.y}px`),
                        (r.querySelector(".js-chat-tab-name").value = s.name),
                        (o.editedChatTabId = e);
                    const a = Object.keys(n.chatTabs).length,
                        l = r.querySelector(".js-remove-chat-tab");
                    (l.style.display = a < 2 ? "none" : "block"),
                        (r.style.display = "block");
                }
                function s(e, t) {
                    const n = (0, i.getState)();
                    let s = c,
                        d = (0, l.uuid)();
                    e
                        ? ((s = e.name), (d = e.id))
                        : (n.chatTabs.push({ name: s, id: d, filters: o() }),
                          (0, i.saveState)());
                    const u = document.querySelector(".js-chat-tabs"),
                        p = (0, l.makeElement)({ element: "div", content: s });
                    return (
                        p.setAttribute("data-tab-id", d),
                        u.appendChild(p),
                        p.addEventListener("contextmenu", e => {
                            const t = { x: e.pageX, y: e.pageY };
                            r(d, t);
                        }),
                        p.addEventListener("click", () => {
                            a(d);
                        }),
                        t || a(d),
                        d
                    );
                }
                function a(e) {
                    const t = (0, i.getState)();
                    Array.from(
                        document.querySelectorAll("[data-tab-id]")
                    ).forEach(e => {
                        e.classList.remove("js-selected-tab");
                    });
                    const n = document.querySelector(`[data-tab-id="${e}"]`);
                    n.classList.add("js-selected-tab");
                    const o = t.chatTabs.find(t => t.id === e).filters,
                        r = Array.from(
                            document.querySelectorAll(".channelselect small")
                        );
                    Object.keys(o).forEach(e => {
                        const t = r.find(t => t.textContent === e);
                        if (!t) return;
                        const n = t.classList.contains("textgrey");
                        n && !o[e] && t.click(), !n && o[e] && t.click();
                    }),
                        (t.selectedChatTabId = e),
                        (0, i.saveState)();
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.showChatTabConfigWindow = r),
                    (n.addChatTab = s),
                    (n.selectChatTab = a),
                    (n.getCurrentChatFilters = o);
                var i = e("../../utils/state"),
                    l = e("../../utils/misc");
                const c = "Untitled";
            },
            { "../../utils/misc": 43, "../../utils/state": 45 }
        ],
        12: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (o = function () {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = o();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        r =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = r
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                function s() {
                    const e = (0, l.getState)(),
                        t = (0, l.getTempState)(),
                        n = (0, c.makeElement)({
                            element: "div",
                            class: "uimod-chat-tab-config js-chat-tab-config",
                            content:
                                '\n              <h1>Chat Tab Config</h1>\n              <div class="uimod-chat-tab-config-grid">\n                  <div>Name</div><input type="text" class="js-chat-tab-name" value="untitled"></input>\n                  <div class="btn orange js-remove-chat-tab">Remove</div><div class="btn blue js-save-chat-tab">Ok</div>\n              </div>\n          '
                        });
                    document.body.append(n),
                        document
                            .querySelector(".js-remove-chat-tab")
                            .addEventListener("click", () => {
                                const n = e.chatTabs.find(
                                        e => e.id === t.editedChatTabId
                                    ),
                                    o = e.chatTabs.indexOf(n);
                                e.chatTabs.splice(o, 1);
                                const r = document.querySelector(
                                    `[data-tab-id="${t.editedChatTabId}"]`
                                );
                                if (
                                    (r.parentNode.removeChild(r),
                                    t.editedChatTabId === e.selectedChatTabId)
                                ) {
                                    const t = 0 === o ? 0 : o - 1;
                                    i.selectChatTab(e.chatTabs[t].id);
                                }
                                document.querySelector(
                                    ".js-chat-tab-config"
                                ).style.display = "none";
                            }),
                        document
                            .querySelector(".js-save-chat-tab")
                            .addEventListener("click", () => {
                                const t = document.querySelector(
                                        `[data-tab-id="${e.selectedChatTabId}"]`
                                    ),
                                    n = document.querySelector(
                                        ".js-chat-tab-name"
                                    ).value;
                                t.textContent = n;
                                const o = e.chatTabs.find(
                                    t => t.id === e.selectedChatTabId
                                );
                                (o.name = n),
                                    (0, l.saveState)(),
                                    (document.querySelector(
                                        ".js-chat-tab-config"
                                    ).style.display = "none");
                            });
                    const o = document.querySelector("#chat"),
                        r = (0, c.makeElement)({
                            element: "div",
                            class: "uimod-chat-tabs js-chat-tabs",
                            content: '<div class="js-chat-tab-add">+</div>'
                        });
                    if (
                        (o.parentNode.insertBefore(r, o),
                        e.chatTabs.forEach(e => {
                            const t = !0;
                            i.addChatTab(e, t);
                        }),
                        document
                            .querySelector(".js-chat-tab-add")
                            .addEventListener("click", e => {
                                const t = i.addChatTab(),
                                    n = { x: e.pageX, y: e.pageY };
                                i.showChatTabConfigWindow(t, n);
                            }),
                        !Object.keys(e.chatTabs).length)
                    ) {
                        const t = (0, c.uuid)(),
                            n = {
                                name: "Main",
                                id: t,
                                filters: i.getCurrentChatFilters()
                            };
                        e.chatTabs.push(n), (0, l.saveState)(), i.addChatTab(n);
                    }
                    document
                        .querySelector(".channelselect")
                        .addEventListener("click", t => {
                            const n = document.elementFromPoint(
                                t.clientX,
                                t.clientY
                            );
                            if (!n.classList.contains("btn")) return;
                            const o = e.chatTabs.find(
                                t => t.id === e.selectedChatTabId
                            );
                            (o.filters = i.getCurrentChatFilters()),
                                (0, l.saveState)();
                        }),
                        e.selectedChatTabId &&
                            i.selectChatTab(e.selectedChatTabId);
                }
                function a() {
                    const e = (0, l.getState)();
                    let t = !0;
                    (e.chatTabs = e.chatTabs.filter(
                        e => !!e || ((t = !0), !1)
                    )),
                        t && (0, l.saveState)();
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var i = r(e("./helpers")),
                    l = e("../../utils/state"),
                    c = e("../../utils/misc"),
                    d = {
                        name: "Chat tabs",
                        description: "Enables support for multiple chat tabs",
                        run: () => {
                            a(), s();
                        }
                    };
                n.default = d;
            },
            { "../../utils/misc": 43, "../../utils/state": 45, "./helpers": 11 }
        ],
        13: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    if (!e) return "Never";
                    const t = Date.now(),
                        n = (t - e) / 1e3,
                        o = n / 60,
                        r = o / 60,
                        s = r / 24,
                        a = s / 7,
                        i = a / 30,
                        l = i / 12,
                        c = (e, t) => (
                            (e = Math.round(e)),
                            1 === e ? `${e} ${t}` : `${e} ${t}s`
                        );
                    return n < 60
                        ? `${c(n, "second")} ago`
                        : o < 60
                        ? `${c(o, "minute")} ago`
                        : r < 24
                        ? `${c(r, "hour")} ago`
                        : s < 7
                        ? `${c(s, "day")} ago`
                        : s < 30
                        ? `${c(a, "week")} ago`
                        : i < 12
                        ? `${c(i, "month")} ago`
                        : `${c(l, "year")} ago`;
                }
                function r() {
                    const e = (0, i.getState)(),
                        t = document.querySelector(".js-clan-lastseen-table"),
                        n = document.querySelector(
                            ".js-clan-members-table-initd"
                        ),
                        r = Date.now(),
                        s = Array.from(n.querySelectorAll("tr .name")),
                        l = [];
                    s.map(t => {
                        const n = !t.parentNode.parentNode.classList.contains(
                                "offline"
                            ),
                            o = t.textContent.trim();
                        n
                            ? (e.clanLastActiveMembers[o] = r)
                            : e.clanLastActiveMembers.hasOwnProperty(o) ||
                              (e.clanLastActiveMembers[o] = null),
                            l.push(o);
                    });
                    const c = Object.keys(e.clanLastActiveMembers).filter(
                        e => !l.includes(e)
                    );
                    c.forEach(t => delete e.clanLastActiveMembers[t]),
                        (0, i.saveState)();
                    const d = Array.from(n.querySelectorAll("tr .name")),
                        u = Array.from(
                            t.querySelectorAll(".js-clan-lastseen-row")
                        ),
                        p = t.querySelector("tbody");
                    if (d.length !== u.length) {
                        const e = (0, a.makeElement)({
                            element: "tr",
                            class: "striped js-clan-lastseen-row",
                            content: "<td></td>"
                        });
                        if (d.length > u.length) {
                            const t = d.length - u.length;
                            for (var m = 0; m < t; m++)
                                p.appendChild(e.cloneNode(!0));
                        } else {
                            const e = u.length - d.length;
                            for (m = 0; m < e; m++)
                                p.querySelector("tr").remove();
                        }
                    }
                    const f = Array.from(p.querySelectorAll("td"));
                    d.forEach((t, n) => {
                        const s = t.textContent.trim(),
                            a = e.clanLastActiveMembers[s] === r,
                            i = a ? "Now" : o(e.clanLastActiveMembers[s]),
                            l = f[n],
                            c = l.textContent,
                            d = c !== i;
                        d && (l.textContent = i);
                        const u = l.parentNode.classList,
                            p = u.contains("js-offline-member");
                        a || p
                            ? a && p && u.remove("js-offline-member")
                            : u.add("js-offline-member");
                    });
                }
                function s() {
                    const e = (0, i.getState)(),
                        t = (0, i.getTempState)(),
                        n = document.querySelector(".window .clanView"),
                        o = n.querySelector(
                            "table:not(.js-clan-lastseen-initd)"
                        );
                    if (!o) return;
                    const s =
                            2 ===
                            Array.from(o.querySelectorAll("thead th")).length,
                        l = n.querySelector(".js-clan-lastseen-table");
                    if (s) {
                        if (
                            (l && l.setAttribute("style", ""),
                            !o.classList.contains(
                                "js-clan-members-table-initd"
                            ))
                        ) {
                            if (
                                (o.classList.add(
                                    "js-clan-members-table-initd",
                                    "uimod-clan-members-table"
                                ),
                                l)
                            )
                                return;
                            o.parentNode.appendChild(
                                (0, a.makeElement)({
                                    element: "table",
                                    class:
                                        "marg-top panel-black js-clan-lastseen-table uimod-clan-lastseen-table",
                                    content:
                                        '\n                      <thead>\n                          <tr class="textprimary">\n                              <th>Last seen</th>\n                          </tr>\n                      </thead>\n                      <tbody>\n                      <tr class="striped js-clan-lastseen-row">\n                          <td></td>\n                      </tr>\n                      </tbody>\n                  '
                                })
                            );
                            const t = n.querySelector(".textcenter h1")
                                .textContent;
                            t !== e.currentClanName &&
                                ((e.currentClanName = t.trim()),
                                (e.clanLastActiveMembers = {}),
                                (0, i.saveState)());
                        }
                        t.clanTableObserver ||
                            (r(),
                            (t.clanTableObserver = new MutationObserver(r)),
                            t.clanTableObserver.observe(o, {
                                attributes: !0,
                                childList: !0,
                                subtree: !0
                            }));
                    } else l && (l.style.display = "none");
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.handleClanWindowChange = s);
                var a = e("../../utils/misc"),
                    i = e("../../utils/state");
            },
            { "../../utils/misc": 43, "../../utils/state": 45 }
        ],
        14: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = (0, a.getTempState)(),
                        t = document.querySelector(".window .clanView");
                    t
                        ? e.clanWindowObserver ||
                          ((0, s.setWindowOpen)(s.WindowNames.clan),
                          (0, i.handleClanWindowChange)(),
                          (e.clanWindowObserver = new MutationObserver(
                              i.handleClanWindowChange
                          )),
                          e.clanWindowObserver.observe(t, {
                              attributes: !0,
                              childList: !0
                          }))
                        : (0, s.isWindowOpen)(s.WindowNames.clan) &&
                          (e.clanWindowObserver &&
                              (e.clanWindowObserver.disconnect(),
                              delete e.clanWindowObserver),
                          e.clanTableObserver &&
                              (e.clanTableObserver.disconnect(),
                              delete e.clanTableObserver),
                          (0, s.setWindowClosed)(s.WindowNames.clan));
                }
                function r(e) {
                    const t = (0, a.getState)();
                    let n = !1;
                    const o = e.map(e => Array.from(e.addedNodes)).flat();
                    o.forEach(e => {
                        const o = e.querySelector(".name");
                        if (!o) return;
                        const r = o.textContent.trim();
                        t.clanLastActiveMembers.hasOwnProperty(r) &&
                            ((n = !0),
                            (t.clanLastActiveMembers[r] = Date.now()));
                    }),
                        n && (0, a.saveState)();
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var s = e("../../utils/ui"),
                    a = e("../../utils/state"),
                    i = e("./helpers"),
                    l = {
                        name: "Clan activity tracker",
                        description:
                            "Updates clan member table with a Last seen column",
                        run: ({
                            registerOnDomChange: e,
                            registerOnChatChange: t
                        }) => {
                            o(), e(o), t(r);
                        }
                    };
                n.default = l;
            },
            { "../../utils/state": 45, "../../utils/ui": 46, "./helpers": 13 }
        ],
        15: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    const t = e.querySelector("input.formatted");
                    (t.value = 999999999999999),
                        t.dispatchEvent(new Event("input")),
                        setTimeout(function () {
                            const n = e.querySelector(".marg-top .btn");
                            n.classList.contains("disabled") ||
                                n.dispatchEvent(new Event("click")),
                                (t.value = ""),
                                t.dispatchEvent(new Event("input"));
                        }, 0);
                }
                function r() {
                    const e = (0, a.getWindow)(i.WindowNames.stash);
                    e
                        .querySelector(".slot .grey.gold:not(.js-deposit-all)")
                        .dispatchEvent(new Event("click")),
                        o(e);
                }
                function s() {
                    const e = (0, a.getWindow)(i.WindowNames.stash),
                        t = e.querySelectorAll(
                            ".slot .grey.gold:not(.js-withdraw-all"
                        ),
                        n = t[t.length - 1];
                    n.dispatchEvent(new Event("click")), o(e);
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.deposit = r),
                    (n.withdraw = s);
                var a = e("../../utils/game"),
                    i = e("../../utils/ui");
            },
            { "../../utils/game": 42, "../../utils/ui": 46 }
        ],
        16: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = (0, i.getWindow)(a.WindowNames.stash);
                    if (!e || e.querySelector(".js-deposit-all")) return;
                    const t = e.querySelector(".slot .grey.gold"),
                        n = t.cloneNode(!0),
                        o = (0, s.makeElement)({
                            element: "span",
                            content: " ALL"
                        });
                    n.append(o),
                        n.classList.add("js-deposit-all"),
                        n.classList.remove("active"),
                        t.parentElement.insertBefore(n, t),
                        e
                            .querySelector(".js-deposit-all")
                            .addEventListener("click", l.deposit);
                }
                function r() {
                    const e = (0, i.getWindow)(a.WindowNames.stash);
                    if (!e || e.querySelector(".js-withdraw-all")) return;
                    const t = e.querySelectorAll(".slot .grey.gold"),
                        n = t[t.length - 1],
                        o = n.cloneNode(!0),
                        r = (0, s.makeElement)({
                            element: "span",
                            content: " ALL"
                        });
                    o.append(r),
                        o.classList.add("js-withdraw-all"),
                        o.classList.remove("active"),
                        n.parentElement.insertBefore(o, n),
                        e
                            .querySelector(".js-withdraw-all")
                            .addEventListener("click", l.withdraw);
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var s = e("../../utils/misc"),
                    a = e("../../utils/ui"),
                    i = e("../../utils/game"),
                    l = e("./helper"),
                    c = {
                        name: "Desposit/Withdraw All Button",
                        description:
                            "Adds two buttons to your stash to quickly deposit/withdraw all of your money",
                        run: ({ registerOnDomChange: e }) => {
                            o(), e(o), r(), e(r);
                        }
                    };
                n.default = c;
            },
            {
                "../../utils/game": 42,
                "../../utils/misc": 43,
                "../../utils/ui": 46,
                "./helper": 15
            }
        ],
        17: [
            function (e, t, n) {
                "use strict";
                function o(e, t, n) {
                    let o = [0, 0],
                        r = [0, 0],
                        s = [0, 0],
                        a = !1,
                        i = 0;
                    const l = t || e;
                    l.addEventListener(
                        "mousedown",
                        t => {
                            (a = !0),
                                (i = Date.now()),
                                (o = [
                                    e.offsetLeft - t.clientX,
                                    e.offsetTop - t.clientY
                                ]),
                                (r = [t.clientX, t.clientY]),
                                (s = [
                                    parseInt(e.style.left) || 0,
                                    parseInt(e.style.top) || 0
                                ]);
                        },
                        !0
                    ),
                        document.addEventListener(
                            "mouseup",
                            () => {
                                (i = 0), (a = !1);
                            },
                            !0
                        ),
                        document.addEventListener(
                            "mousemove",
                            l => {
                                if ((l.preventDefault(), a)) {
                                    if (n && Date.now() - i < n) return;
                                    const a = t
                                            ? l.clientX + o[0]
                                            : s[0] + l.clientX - r[0],
                                        c = t
                                            ? l.clientY + o[1]
                                            : s[1] + l.clientY - r[1];
                                    (e.style.left = `${a}px`),
                                        (e.style.top = `${c}px`);
                                }
                            },
                            !0
                        );
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.dragElement = o);
            },
            {}
        ],
        18: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (o = function () {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = o();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        r =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = r
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                function s() {
                    Array.from(
                        document.querySelectorAll(".window:not(.js-can-move)")
                    ).forEach(e => {
                        e.classList.add("js-can-move"),
                            l.dragElement(e, e.querySelector(".titleframe"));
                    }),
                        Array.from(
                            document.querySelectorAll(
                                "\n          .partyframes:not(.js-can-move),\n          #ufplayer:not(.js-can-move),\n          #uftarget:not(.js-can-move),\n          #skillbar:not(.js-can-move)\n      "
                            )
                        ).forEach(e => {
                            e.classList.add("js-can-move"),
                                l.dragElement(e, null, 1e3);
                        });
                }
                function a() {
                    const e = (0, c.getState)();
                    Array.from(
                        document.querySelectorAll(
                            ".window:not(.js-ui-is-saving)"
                        )
                    ).forEach(t => {
                        t.classList.add("js-ui-is-saving");
                        const n = t.querySelector(".titleframe"),
                            o = n.querySelector('[name="title"]').textContent;
                        n.addEventListener("mouseup", () => {
                            (e.windowsPos[o] = t.getAttribute("style")),
                                (0, c.saveState)();
                        });
                    });
                    const t = (t, n) => {
                        t &&
                            (t.classList.add("js-ui-is-saving"),
                            t.addEventListener("mouseup", () => {
                                e.windowsPos[n] = t.getAttribute("style");
                            }));
                    };
                    t(
                        document.querySelector(
                            ".partyframes:not(.js-ui-is-saving)"
                        ),
                        "partyFrame"
                    ),
                        t(
                            document.querySelector(
                                "#ufplayer:not(.js-ui-is-saving)"
                            ),
                            "playerFrame"
                        ),
                        t(
                            document.querySelector(
                                "#uftarget:not(.js-ui-is-saving)"
                            ),
                            "targetFrame"
                        ),
                        t(
                            document.querySelector(
                                "#skillbar:not(.js-ui-is-saving)"
                            ),
                            "skillBar"
                        );
                }
                function i() {
                    const e = (0, c.getState)();
                    Array.from(
                        document.querySelectorAll(
                            ".window:not(.js-has-loaded-pos)"
                        )
                    ).forEach(t => {
                        t.classList.add("js-has-loaded-pos");
                        const n = t.querySelector('[name="title"]').textContent,
                            o = e.windowsPos[n];
                        o && t.setAttribute("style", o);
                    });
                    const t = (t, n) => {
                        if (!t) return;
                        t.classList.add("js-has-loaded-pos");
                        const o = e.windowsPos[n];
                        o && t.setAttribute("style", o);
                    };
                    t(
                        document.querySelector(
                            ".partyframes:not(.js-has-loaded-pos)"
                        ),
                        "partyFrame"
                    ),
                        t(
                            document.querySelector(
                                "#ufplayer:not(.js-has-loaded-pos)"
                            ),
                            "playerFrame"
                        ),
                        t(
                            document.querySelector(
                                "#uftarget:not(.js-has-loaded-pos)"
                            ),
                            "targetFrame"
                        ),
                        t(
                            document.querySelector(
                                "#skillbar:not(.js-has-loaded-pos)"
                            ),
                            "skillBar"
                        );
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var l = r(e("./helpers")),
                    c = e("../../utils/state"),
                    d = {
                        name: "Draggable Windows",
                        description: "Allows you to drag windows in the UI",
                        run: ({ registerOnDomChange: e }) => {
                            s(), a(), i(), e(a), e(s), e(i);
                        }
                    };
                n.default = d;
            },
            { "../../utils/state": 45, "./helpers": 17 }
        ],
        19: [
            function (e, t, n) {
                "use strict";
                function o() {
                    (0, r.createNavButton)(
                        "friendslist",
                        "F",
                        "Friends List",
                        r.toggleFriendsList
                    ),
                        (0, r.isWindowOpen)(r.WindowNames.friendsList) &&
                            (0, r.createFriendsList)();
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var r = e("../../utils/ui"),
                    s = {
                        name: "Friends list",
                        description:
                            "Allows access to your friends list from the top right F icon",
                        run: o
                    };
                n.default = s;
            },
            { "../../utils/ui": 46 }
        ],
        20: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    const t = parseFloat(e.style.width);
                    let n = "";
                    (n =
                        t < 10
                            ? r[10]
                            : t < 20
                            ? r[20]
                            : t < 30
                            ? r[30]
                            : t < 40
                            ? r[40]
                            : t < 50
                            ? r[50]
                            : t < 60
                            ? r[60]
                            : t < 70
                            ? r[70]
                            : t < 80
                            ? r[80]
                            : t < 90
                            ? r[90]
                            : r[100]),
                        (e.style.background = n);
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.handleHealthChange = o);
                const r = {
                    100: "linear-gradient(0deg, #34CB49 0%, #2da640 49%, #34CB49 50%)",
                    90: "linear-gradient(0deg, #4AB844 0%, #3D963B 49%, #4AB844 50%)",
                    80: "linear-gradient(0deg, #61A540 0%, #4D8637 49%, #61A540 50%)",
                    70: "linear-gradient(0deg, #77923C 0%, #5E7733 49%, #77923C 50%)",
                    60: "linear-gradient(0deg, #8E7F37 0%, #6E672F 49%, #8E7F37 50%)",
                    50: "linear-gradient(0deg, #A46D33 0%, #7E582A 49%, #A46D33 50%)",
                    40: "linear-gradient(0deg, #BB8A2F 0%, #8F4826 49%, #BB8A2F 50%)",
                    30: "linear-gradient(0deg, #D1772A 0%, #9F3922 49%, #D1772A 50%)",
                    20: "linear-gradient(0deg, #E86426 0%, #AF291E 49%, #E86426 50%)",
                    10: "linear-gradient(0deg, #E04222 0%, #C01A1A 49%, #E04222 50%)"
                };
            },
            {}
        ],
        21: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = Array.from(
                        document.querySelectorAll(
                            ".progressBar.bghealth:not(.js-healthchanger-initd)"
                        )
                    );
                    e.forEach(e => {
                        e.classList.add("js-healthchanger-initd"),
                            (0, r.handleHealthChange)(e);
                        const t = new MutationObserver(e =>
                            (0, r.handleHealthChange)(e[0].target)
                        );
                        t.observe(e, { attributes: !0 });
                    });
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var r = e("./helpers"),
                    s = {
                        name: "Health color changer",
                        description:
                            "Changes the green color of allied player health bars to become darker and redder as your health gets lower",
                        run: ({ registerOnDomChange: e }) => {
                            e(o), o();
                        }
                    };
                n.default = s;
            },
            { "./helpers": 20 }
        ],
        22: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : { default: e };
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var r = o(e("./_modStart")),
                    s = o(e("./_customSettings")),
                    a = o(e("./chatContextMenu")),
                    i = o(e("./chatFilters")),
                    l = o(e("./chatTabs")),
                    c = o(e("./draggableUI")),
                    d = o(e("./friendsList")),
                    u = o(e("./mapControls")),
                    p = o(e("./resizableChat")),
                    m = o(e("./resizableMap")),
                    f = o(e("./selectedWindowIsTop")),
                    y = o(e("./xpMeter")),
                    h = o(e("./merchantFilter")),
                    v = o(e("./itemStatsCopy")),
                    g = o(e("./_keyPressTracker")),
                    b = o(e("./clanActivityTracker")),
                    S = o(e("./skillCooldownNumbers")),
                    w = o(e("./depositAll")),
                    j = o(e("./lockedItemSlots")),
                    k = o(e("./screenshotMode")),
                    C = o(e("./buffTooltips")),
                    M = o(e("./healthColorChanger")),
                    O = [
                        r.default,
                        g.default,
                        m.default,
                        u.default,
                        d.default,
                        s.default,
                        p.default,
                        a.default,
                        i.default,
                        l.default,
                        c.default,
                        f.default,
                        y.default,
                        h.default,
                        v.default,
                        b.default,
                        S.default,
                        w.default,
                        j.default,
                        k.default,
                        C.default,
                        M.default
                    ];
                n.default = O;
            },
            {
                "./_customSettings": 2,
                "./_keyPressTracker": 3,
                "./_modStart": 4,
                "./buffTooltips": 6,
                "./chatContextMenu": 9,
                "./chatFilters": 10,
                "./chatTabs": 12,
                "./clanActivityTracker": 14,
                "./depositAll": 16,
                "./draggableUI": 18,
                "./friendsList": 19,
                "./healthColorChanger": 21,
                "./itemStatsCopy": 23,
                "./lockedItemSlots": 25,
                "./mapControls": 27,
                "./merchantFilter": 29,
                "./resizableChat": 31,
                "./resizableMap": 33,
                "./screenshotMode": 35,
                "./selectedWindowIsTop": 36,
                "./skillCooldownNumbers": 38,
                "./xpMeter": 40
            }
        ],
        23: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (o = function () {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = o();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        r =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = r
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                async function s(e) {
                    const t = (0, l.getTempState)();
                    if (!t.keyModifiers.alt) return;
                    const n = document.elementFromPoint(e.clientX, e.clientY),
                        o = n.parentNode;
                    if (!o.querySelector("img")) return;
                    const r = document.body.querySelector(
                        ".container > .panel > .choice"
                    );
                    if (!r) return;
                    const s = r.parentNode;
                    s && (s.style.display = "none");
                    const c = !0,
                        d = await (0, i.getTooltipContent)(o, c);
                    if (!d) return;
                    const u = d.querySelector(".slotdescription");
                    u && u.parentNode.removeChild(u);
                    const p = d.querySelector(".slottitle").textContent,
                        m = d.querySelector(".type span"),
                        f = m.textContent;
                    if (!f.includes("%")) {
                        let e = p;
                        return (
                            p.substr(0, 2).match(/T[0-9]/) &&
                                (e = p.substr(p.indexOf(" ") + 1)),
                            navigator.clipboard.writeText(e),
                            void a.addChatMessage(`Copied ${e} to clipboard.`)
                        );
                    }
                    const y = Array.from(
                            d.querySelectorAll(".container .pack")
                        ),
                        h = y.filter(e =>
                            e.textContent.includes("Requires ")
                        )[0],
                        v = h.textContent.split(" ").pop(),
                        g = Array.from(
                            d.querySelectorAll(
                                "\n                  .pack > .textpurp,\n                  .pack > .textblue,\n                  .pack > .textgreen:not(.slottitle),\n                  .pack > .textwhite:not(.type)\n              "
                            )
                        ),
                        b = g
                            .map(e => {
                                if ("+ " !== e.textContent.substr(0, 2)) return;
                                const t = e.querySelector("span");
                                if (t) {
                                    const n = t.textContent,
                                        o = e.textContent
                                            .replace(/\+\s/g, "+")
                                            .split(" ");
                                    o.pop(), o.shift();
                                    const r = o.join(" ");
                                    return `${r} ${n}`;
                                }
                                return e.textContent.trim();
                            })
                            .filter(e => !!e)
                            .join(", ");
                    navigator.clipboard.writeText(`${p} ${f} Lv.${v}: ${b}`),
                        a.addChatMessage(`Copied ${p}'s stats to clipboard.`);
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var a = r(e("../../utils/chat")),
                    i = e("../../utils/game"),
                    l = e("../../utils/state"),
                    c = {
                        name: "Items stats copy",
                        description:
                            "When alt+left clicking a piece of equipment in your inventory, its stats will be copied to your clipboard",
                        run: ({ registerOnRightClick: e }) => {
                            e(s);
                        }
                    };
                n.default = c;
            },
            {
                "../../utils/chat": 41,
                "../../utils/game": 42,
                "../../utils/state": 45
            }
        ],
        24: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    const t = (0, a.getState)(),
                        n = (0, a.getTempState)(),
                        o = e.getAttribute("data-locked-slot-num"),
                        r = document.querySelector(`#bag${o}`);
                    e.addEventListener("click", () => {
                        r.dispatchEvent(new Event("pointerup"));
                    }),
                        e.addEventListener("pointerenter", () => {
                            r.dispatchEvent(new Event("pointerenter"));
                        }),
                        e.addEventListener("pointerleave", () => {
                            r.dispatchEvent(new Event("pointerleave"));
                        }),
                        e.addEventListener("contextmenu", s => {
                            n.keyModifiers.shift ||
                                (r.querySelector("img") &&
                                    (r.dispatchEvent(
                                        new PointerEvent("pointerup", s)
                                    ),
                                    setTimeout(() => {
                                        const n = Array.from(
                                            document.querySelectorAll(
                                                ".container > .panel.context .choice"
                                            )
                                        );
                                        n.forEach(e => {
                                            "drop item" ===
                                                e.textContent.toLowerCase() &&
                                                (e.style.display = "none");
                                        }),
                                            n[0].parentNode.appendChild(
                                                (0, i.makeElement)({
                                                    element: "div",
                                                    class:
                                                        "choice js-unlock-item",
                                                    content: "Unlock slot"
                                                })
                                            );
                                        const r = document.querySelector(
                                            ".js-unlock-item"
                                        );
                                        r.addEventListener("click", () => {
                                            t.lockedItemSlots.splice(
                                                t.lockedItemSlots.indexOf(o),
                                                1
                                            ),
                                                (0, a.saveState)(),
                                                e.parentNode.removeChild(e);
                                            const n = r.parentNode;
                                            n.style.display = "none";
                                        });
                                    }, 0)));
                        });
                }
                function r(e) {
                    const t = document.querySelector(`#bag${e}`);
                    if (!t) return;
                    if (
                        document.querySelector(
                            `.js-locked-slot[data-locked-slot-num="${e}"]`
                        )
                    )
                        return;
                    const n = (0, i.makeElement)({
                        element: "div",
                        class: "js-locked-slot uimod-locked-slot"
                    });
                    n.setAttribute("data-locked-slot-num", e),
                        n.setAttribute(
                            "style",
                            `left: ${t.offsetLeft}px; top: ${t.offsetTop}px;`
                        ),
                        t.parentNode.insertBefore(n, t),
                        o(n);
                }
                function s() {
                    const e = (0, a.getState)(),
                        t = (0, c.getWindow)(l.WindowNames.inventory);
                    t &&
                        !t.classList.contains("js-locked-slots-initd") &&
                        (t.classList.add("js-locked-slots-initd"),
                        e.lockedItemSlots.forEach(r));
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.lockSlot = r),
                    (n.initLockedSlots = s);
                var a = e("../../utils/state"),
                    i = e("../../utils/misc"),
                    l = e("../../utils/ui"),
                    c = e("../../utils/game");
            },
            {
                "../../utils/game": 42,
                "../../utils/misc": 43,
                "../../utils/state": 45,
                "../../utils/ui": 46
            }
        ],
        25: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = (0, l.getState)(),
                        t = (0, i.getWindow)(a.WindowNames.inventory),
                        n = document.querySelector(
                            ".container > .panel.context:not(.js-lock-menu-initd)"
                        );
                    if (!t || !n) return;
                    const o = document.elementFromPoint(
                        n.offsetLeft,
                        n.offsetTop - 10
                    );
                    t.contains(o) &&
                        setTimeout(() => {
                            if (document.querySelector(".js-lock-item")) return;
                            const t = Array.from(
                                n.querySelectorAll(".choice")
                            ).some(
                                e =>
                                    "unlock slot" ===
                                    e.textContent.toLowerCase()
                            );
                            t ||
                                (n.appendChild(
                                    (0, c.makeElement)({
                                        element: "div",
                                        class: "choice js-lock-item",
                                        content: "Lock slot"
                                    })
                                ),
                                document
                                    .querySelector(".js-lock-item")
                                    .addEventListener("click", () => {
                                        const t = document.elementFromPoint(
                                                n.offsetLeft,
                                                n.offsetTop - 10
                                            ),
                                            o = parseInt(
                                                t.parentNode.id.substr(3)
                                            );
                                        e.lockedItemSlots.push(o),
                                            (0, l.saveState)(),
                                            (n.style.display = "none"),
                                            (0, d.lockSlot)(o);
                                    }));
                        }, 0);
                }
                function r() {
                    const e = (0, i.getWindow)(a.WindowNames.inventory, !0),
                        t = e.parentNode,
                        n = new MutationObserver(d.initLockedSlots);
                    n.observe(t, { attributes: !0, childList: !1 }),
                        (0, d.initLockedSlots)();
                }
                function s() {
                    const e = (0, l.getState)();
                    if (!Array.isArray(e.lockedItemSlots))
                        return (
                            (e.lockedItemSlots = []), void (0, l.saveState)()
                        );
                    const t = Array.from(new Set(e.lockedItemSlots)).filter(
                            e => "number" == typeof e
                        ),
                        n = t.sort().join() === e.lockedItemSlots.sort().join();
                    n || ((e.lockedItemSlots = t), (0, l.saveState)());
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var a = e("../../utils/ui"),
                    i = e("../../utils/game"),
                    l = e("../../utils/state"),
                    c = e("../../utils/misc"),
                    d = e("./helpers"),
                    u = {
                        name: "Locked item slots",
                        description:
                            "Allows you to lock inventory slots so you can not drop those items or shift+right click them",
                        run: ({ registerOnDomChange: e }) => {
                            s(), r(), o(), e(o);
                        }
                    };
                n.default = u;
            },
            {
                "../../utils/game": 42,
                "../../utils/misc": 43,
                "../../utils/state": 45,
                "../../utils/ui": 46,
                "./helpers": 24
            }
        ],
        26: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = (0, r.getState)(),
                        t = document.querySelector(".container canvas"),
                        n = document.querySelector(".js-map");
                    t.style.opacity = String(e.mapOpacity / 100);
                    const o = window
                        .getComputedStyle(n, null)
                        .getPropertyValue("background-color");
                    let s = e.mapOpacity / 100;
                    1 === s && (s = 0.99);
                    const a = o.replace(/[\d\.]+\)$/g, `${s})`);
                    n.style["background-color"] = a;
                    const i = document.querySelector(".js-map-opacity-add"),
                        l = document.querySelector(".js-map-opacity-minus");
                    100 === e.mapOpacity
                        ? (i.style.visibility = "hidden")
                        : (i.style.visibility = "visible"),
                        0 === e.mapOpacity
                            ? (l.style.visibility = "hidden")
                            : (l.style.visibility = "visible");
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.updateMapOpacity = o);
                var r = e("../../utils/state");
            },
            { "../../utils/state": 45 }
        ],
        27: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (o = function () {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = o();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        r =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = r
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                function s() {
                    const e = (0, a.getState)(),
                        t = document.querySelector(".container canvas");
                    t.parentNode.classList.contains("js-map") ||
                        t.parentNode.classList.add("js-map");
                    const n = document.querySelector(".js-map"),
                        o = (0, l.makeElement)({
                            element: "div",
                            class: "js-map-btns",
                            content:
                                '\n              <button class="js-map-opacity-add">+</button>\n              <button class="js-map-opacity-minus">-</button>\n              <button class="js-map-reset">r</button>\n          '
                        });
                    t.parentNode.insertBefore(o, t), i.updateMapOpacity();
                    const r = document.querySelector(".js-map-opacity-add"),
                        s = document.querySelector(".js-map-opacity-minus"),
                        c = document.querySelector(".js-map-reset");
                    100 === e.mapOpacity && (r.style.visibility = "hidden"),
                        0 === e.mapOpacity && (s.style.visibility = "hidden"),
                        r.addEventListener("click", () => {
                            (e.mapOpacity += 10),
                                (0, a.saveState)(),
                                i.updateMapOpacity();
                        }),
                        s.addEventListener("click", () => {
                            (e.mapOpacity -= 10),
                                (0, a.saveState)(),
                                i.updateMapOpacity();
                        }),
                        c.addEventListener("click", () => {
                            (e.mapOpacity = 70),
                                (e.mapWidth = "174px"),
                                (e.mapHeight = "174px"),
                                (0, a.saveState)(),
                                i.updateMapOpacity(),
                                (n.style.width = e.mapWidth),
                                (n.style.height = e.mapHeight);
                        }),
                        i.updateMapOpacity();
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var a = e("../../utils/state"),
                    i = r(e("./helpers")),
                    l = e("../../utils/misc"),
                    c = {
                        name: "Map controls",
                        description:
                            "Enables hovering over the minimap to show buttons that let you increase or decrease the opacity of the map, or reset the size+transparency of it",
                        run: s
                    };
                n.default = c;
            },
            { "../../utils/misc": 43, "../../utils/state": 45, "./helpers": 26 }
        ],
        28: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = document.querySelector(
                        ".js-merchant-filter-input"
                    );
                    if (!e) return;
                    const t = e.value;
                    t && r();
                    const n = t.split(",").map(e => e.trim()) || [""],
                        o = Array.from(
                            document.querySelectorAll(
                                ".js-merchant-initd .items .slot"
                            )
                        );
                    o.forEach(e => {
                        const t = (0, a.getTooltipContent)(e);
                        t.then(t => {
                            if (!t)
                                return void (e.parentNode.style.display =
                                    "grid");
                            let o = 0;
                            n.forEach(e => {
                                const n = t.textContent
                                    .toLowerCase()
                                    .includes(e.toLowerCase());
                                n && o++;
                            });
                            const r = o === n.length;
                            e.parentNode.style.display = r ? "grid" : "none";
                        });
                    });
                }
                function r() {
                    const e = (0, i.getTempState)();
                    e.merchantLoadingObserver ||
                        ((e.merchantLoadingObserver = new MutationObserver(
                            t => {
                                t[0] &&
                                t[0].addedNodes[0] &&
                                t[0].addedNodes[0].classList.contains("spinner")
                                    ? (e.merchantLoading = !0)
                                    : (e.merchantLoading && o(),
                                      (e.merchantLoading = !1));
                            }
                        )),
                        e.merchantLoadingObserver.observe(
                            document.querySelector(".js-merchant-initd .buy"),
                            { attributes: !1, childList: !0, subtree: !0 }
                        ));
                }
                function s() {
                    const e = (0, i.getTempState)();
                    e.merchantLoadingObserver &&
                        ((e.merchantLoading = !1),
                        e.merchantLoadingObserver.disconnect(),
                        delete e.merchantLoadingObserver);
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.handleMerchantFilterInputChange = o),
                    (n.deleteMerchantObserver = s);
                var a = e("../../utils/game"),
                    i = e("../../utils/state");
            },
            { "../../utils/game": 42, "../../utils/state": 45 }
        ],
        29: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = (0, s.getWindow)("Merchant");
                    if (!e || e.querySelector(".js-merchant-filter-input"))
                        return;
                    e.classList.add("js-merchant-initd"),
                        e.classList.add("uidom-merchant-with-filters"),
                        (0, i.setWindowOpen)(i.WindowNames.merchant);
                    const t = e.querySelectorAll('input[type="number"]')[1],
                        n = (0, a.makeElement)({
                            element: "input",
                            class:
                                "js-merchant-filter-input uidom-merchant-input",
                            type: "search",
                            placeholder: "Filters (comma separated)"
                        });
                    t.parentNode.insertBefore(n, t.nextSibling),
                        e
                            .querySelector(".js-merchant-filter-input")
                            .addEventListener(
                                "keyup",
                                (0, a.debounce)(
                                    l.handleMerchantFilterInputChange,
                                    250
                                )
                            );
                }
                function r() {
                    if ((0, i.isWindowOpen)(i.WindowNames.merchant)) {
                        const e = document.querySelector(".js-merchant-initd");
                        if (e) return;
                    }
                    (0, i.setWindowClosed)(i.WindowNames.merchant),
                        (0, l.deleteMerchantObserver)();
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var s = e("../../utils/game"),
                    a = e("../../utils/misc"),
                    i = e("../../utils/ui"),
                    l = e("./helpers"),
                    c = {
                        name: "Merchant filter",
                        description:
                            "Allows you to specify filters, or search text, for items displayed in the merchant",
                        run: ({ registerOnDomChange: e }) => {
                            o(),
                                e(o),
                                e(() => {
                                    r();
                                });
                        }
                    };
                n.default = c;
            },
            {
                "../../utils/game": 42,
                "../../utils/misc": 43,
                "../../utils/ui": 46,
                "./helpers": 28
            }
        ],
        30: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = (0, r.getState)(),
                        t = document.querySelector(".js-chat-resize");
                    (t.style.width = e.chatWidth),
                        (t.style.height = e.chatHeight);
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.resizeChat = o);
                var r = e("../../utils/state");
            },
            { "../../utils/state": 45 }
        ],
        31: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = (0, r.getState)(),
                        t = document.querySelector("#chat").parentNode;
                    t.classList.add("js-chat-resize"),
                        e.chatWidth && e.chatHeight && (0, s.resizeChat)();
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var r = e("../../utils/state"),
                    s = e("./helpers"),
                    a = {
                        name: "Resizable chat",
                        description:
                            "Allows you to resize chat by clicking and dragging from the bottom right of chat",
                        run: o
                    };
                n.default = a;
            },
            { "../../utils/state": 45, "./helpers": 30 }
        ],
        32: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if (!document.querySelector(".layout")) return;
                    const e = (0, s.getState)(),
                        t = (0, s.getTempState)(),
                        n = document.querySelector(".container canvas")
                            .parentNode,
                        o = n.querySelector("canvas"),
                        r = window
                            .getComputedStyle(n, null)
                            .getPropertyValue("width"),
                        a = window
                            .getComputedStyle(n, null)
                            .getPropertyValue("height"),
                        i = Math.round(Number(r.slice(0, -2))),
                        l = Math.round(Number(a.slice(0, -2)));
                    if (i && l) {
                        if (
                            (o.width !== i && (o.width = i),
                            o.height !== l && (o.height = l),
                            t.clickingMap)
                        )
                            (e.mapWidth = r),
                                (e.mapHeight = a),
                                (0, s.saveState)();
                        else {
                            const o = i > t.lastMapWidth && l > t.lastMapHeight;
                            o ||
                                ((n.style.width = e.mapWidth),
                                (n.style.height = e.mapHeight));
                        }
                        (t.lastMapWidth = i), (t.lastMapHeight = l);
                    }
                }
                function r() {
                    if (!document.querySelector(".layout")) return;
                    const e = document.querySelector(".container canvas")
                            .parentNode,
                        t = e.querySelector("canvas"),
                        n = window
                            .getComputedStyle(e, null)
                            .getPropertyValue("width"),
                        o = window
                            .getComputedStyle(e, null)
                            .getPropertyValue("height"),
                        r = Math.round(Number(n.slice(0, -2))),
                        s = Math.round(Number(o.slice(0, -2))),
                        a = Math.round(t.width),
                        i = Math.round(t.height);
                    r &&
                        s &&
                        (a !== r && (e.style.width = `${a}px`),
                        i !== s && (e.style.height = `${i}px`));
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.mapResizeHandler = o),
                    (n.triggerMapResize = r);
                var s = e("../../utils/state");
            },
            { "../../utils/state": 45 }
        ],
        33: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (o = function () {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = o();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        r =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = r
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                function s() {
                    const e = (0, a.getState)(),
                        t = (0, a.getTempState)(),
                        n = document.querySelector(".container canvas")
                            .parentNode,
                        o = n.querySelector("canvas");
                    n.classList.add("js-map-resize"),
                        n.addEventListener("mousedown", () => {
                            t.clickingMap = !0;
                        }),
                        document.body.addEventListener("mouseup", () => {
                            t.clickingMap = !1;
                        }),
                        e.mapWidth &&
                            e.mapHeight &&
                            ((n.style.width = e.mapWidth),
                            (n.style.height = e.mapHeight),
                            i.mapResizeHandler());
                    const r = (0, l.debounce)(i.mapResizeHandler, 1),
                        s = new ResizeObserver(r);
                    i.mapResizeHandler(), s.observe(n);
                    const c = (0, l.debounce)(i.triggerMapResize, 50),
                        d = new ResizeObserver(c);
                    d.observe(o);
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var a = e("../../utils/state"),
                    i = r(e("./helpers")),
                    l = e("../../utils/misc"),
                    c = {
                        name: "Resizable map",
                        description:
                            "Allows you to resize the map by clicking and dragging from the bottom left",
                        run: s
                    };
                n.default = c;
            },
            { "../../utils/misc": 43, "../../utils/state": 45, "./helpers": 32 }
        ],
        34: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    const t = document.querySelector("#expbar"),
                        n = document.querySelector(".actionbarcontainer"),
                        o = document.querySelector(".layout > .container");
                    "120" == e.keyCode &&
                        ("none" != t.style.display
                            ? ((o.style.display = "none"),
                              (t.style.display = "none"),
                              (n.style.display = "none"),
                              (0, r.createScreenshotWarning)())
                            : ((o.style.display = "block"),
                              (t.style.display = "block"),
                              (n.style.display = "block"),
                              (0, r.removeScreenshotWarning)()));
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.toggleScreenshotMode = o);
                var r = e("../../utils/ui");
            },
            { "../../utils/ui": 46 }
        ],
        35: [
            function (e, t, n) {
                "use strict";
                function o() {
                    window.addEventListener("keyup", r.toggleScreenshotMode);
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var r = e("./helper"),
                    s = {
                        name: "Screenshot Mode",
                        description:
                            "F9 key toggles game UI visibly for cleaner screenshots",
                        run: o
                    };
                n.default = s;
            },
            { "./helper": 34 }
        ],
        36: [
            function (e, t, n) {
                "use strict";
                function o() {
                    Array.from(
                        document.querySelectorAll(
                            ".window:not(.js-is-top-initd)"
                        )
                    ).forEach(e => {
                        e.classList.add("js-is-top-initd"),
                            e.addEventListener("mousedown", () => {
                                const t = document.querySelector(".js-is-top");
                                t && t.classList.remove("js-is-top"),
                                    e.parentNode.classList.add("js-is-top");
                            });
                    });
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var r = {
                    name: "Make Selected Window Top",
                    description:
                        "The UI window you click will always be displayed over other UI windows",
                    run: ({ registerOnDomChange: e }) => {
                        o(), e(o);
                    }
                };
                n.default = r;
            },
            {}
        ],
        37: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    const t =
                            e.latestCooldownTimestamp -
                            e.initialCooldownTimestamp,
                        n =
                            e.initialCooldownPcntLeft -
                            e.latestCooldownPcntLeft,
                        o = t / n / 1e3;
                    return Math.floor(o * e.latestCooldownPcntLeft);
                }
                function r(e) {
                    const t = (0, a.getTempState)();
                    e.forEach(e => {
                        const n = e.target,
                            r =
                                n.parentElement &&
                                !n.classList.contains("offCd") &&
                                n.classList.contains("js-cooldown-num-initd");
                        if (!r || "number" != typeof n.step) return;
                        const s = n.parentNode.id,
                            a = n.step;
                        let i = t.cooldownNums[s];
                        if (
                            (i.initialCooldownPcntLeft &&
                                a >= i.initialCooldownPcntLeft &&
                                ((i.initialCooldownTimestamp = null),
                                (i.initialCooldownPcntLeft = null),
                                (i.latestCooldownTimestamp = null),
                                (i.latestCooldownPcntLeft = null),
                                (i.calculationCount = 0)),
                            i.initialCooldownTimestamp ||
                                ((i.initialCooldownTimestamp = Date.now()),
                                (i.initialCooldownPcntLeft = a)),
                            (i.latestCooldownTimestamp = Date.now()),
                            (i.latestCooldownPcntLeft = a),
                            i.calculationCount++,
                            i.calculationCount > 2)
                        ) {
                            const e = n.querySelector(".js-cooldown-num");
                            e.innerText = o(i);
                        }
                    });
                }
                function s() {
                    const e = (0, a.getTempState)(),
                        t = document.querySelectorAll(
                            "#skillbar .overlay:not(.js-cooldown-num-initd):not(.offCd)"
                        );
                    0 !== t.length &&
                        Array.from(t).forEach(t => {
                            t.classList.add("js-cooldown-num-initd"),
                                t.appendChild(
                                    (0, i.makeElement)({
                                        element: "div",
                                        class: "js-cooldown-num"
                                    })
                                );
                            const n = new MutationObserver(r),
                                o = t.parentNode.id;
                            (e.cooldownNums[o] = {
                                initialCooldownTimestamp: null,
                                initialCooldownPcntLeft: null,
                                latestCooldownTimestamp: null,
                                latestCooldownPcntLeft: null,
                                calculationCount: 0
                            }),
                                e.cooldownObservers[o] &&
                                    (e.cooldownObservers[o].disconnect(),
                                    delete e.cooldownObservers[o]),
                                (e.cooldownObservers[o] = n),
                                n.observe(t, { childList: !0 });
                        });
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.addSkillCooldownNumbers = s);
                var a = e("../../utils/state"),
                    i = e("../../utils/misc");
            },
            { "../../utils/misc": 43, "../../utils/state": 45 }
        ],
        38: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = (0, r.getTempState)(),
                        t = document.querySelector(
                            "#skillbar:not(.js-cooldowns-skillbar-initd"
                        );
                    t &&
                        (t.classList.add("js-cooldowns-skillbar-initd"),
                        e.skillBarObserver &&
                            (e.skillBarObserver.disconnect(),
                            delete e.skillBarObserver),
                        (e.skillBarObserver = new MutationObserver(
                            s.addSkillCooldownNumbers
                        )),
                        e.skillBarObserver.observe(t, {
                            subtree: !0,
                            childList: !0
                        }),
                        (0, s.addSkillCooldownNumbers)());
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var r = e("../../utils/state"),
                    s = e("./helpers"),
                    a = {
                        name: "Skill cooldown numbers",
                        description:
                            "Overlays time left on cooldown over skill icons",
                        run: () => {
                            o();
                        }
                    };
                n.default = a;
            },
            { "../../utils/state": 45, "./helpers": 37 }
        ],
        39: [
            function (e, t, n) {
                "use strict";
                function o() {
                    return Number(
                        document
                            .querySelector("#ufplayer .bgmana > .left")
                            .textContent.split("Lv. ")[1]
                    );
                }
                function r() {
                    return Number(
                        document
                            .querySelector("#expbar .progressBar > .left")
                            .textContent.split("/")[0]
                            .replace(/,/g, "")
                            .trim()
                    );
                }
                function s() {
                    return Number(
                        document
                            .querySelector("#expbar .progressBar > .left")
                            .textContent.split("/")[1]
                            .replace(/,/g, "")
                            .replace("EXP", "")
                            .trim()
                    );
                }
                function a() {
                    const e = (0, l.getState)();
                    (e.xpMeterState.xpGains = []),
                        (e.xpMeterState.averageXp = 0),
                        (e.xpMeterState.gainedXp = 0),
                        (0, l.saveState)(),
                        (document.querySelector(".js-xp-time").textContent =
                            "-:-:-");
                }
                function i(e) {
                    const t = e => (e < 10 ? `0${e}` : e),
                        n = t(Math.floor((e / 36e5) % 60)),
                        o = t(Math.floor((e / 6e4) % 60)),
                        r = t(Math.floor((e / 1e3) % 60));
                    return `${n}:${o}:${r}`;
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.getCurrentCharacterLvl = o),
                    (n.getCurrentXp = r),
                    (n.getNextLevelXp = s),
                    (n.resetXpMeterState = a),
                    (n.msToString = i);
                var l = e("../../utils/state");
            },
            { "../../utils/state": 45 }
        ],
        40: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (o = function () {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = o();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        r =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = r
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                function s() {
                    const e = (0, a.getState)(),
                        t = (0, a.getTempState)();
                    (0, l.createXpMeter)(),
                        (0, l.isWindowOpen)(l.WindowNames.xpMeter) &&
                            (0, l.toggleXpMeterVisibility)(),
                        (0, l.createNavButton)(
                            "xpmeter",
                            "XP",
                            "XP Meter",
                            l.toggleXpMeterVisibility
                        ),
                        document
                            .querySelector(".js-xpmeter-close-icon")
                            .addEventListener(
                                "click",
                                l.toggleXpMeterVisibility
                            ),
                        document
                            .querySelector(".js-xpmeter-reset-button")
                            .addEventListener("click", i.resetXpMeterState);
                    const n = i.getCurrentXp(),
                        o = i.getCurrentCharacterLvl();
                    n !== e.xpMeterState.currentXp &&
                        (e.xpMeterState.currentXp = n),
                        o !== e.xpMeterState.currentLvl &&
                            (e.xpMeterState.currentLvl = o),
                        (0, a.saveState)(),
                        t.xpMeterInterval && clearInterval(t.xpMeterInterval),
                        (t.xpMeterInterval = setInterval(() => {
                            if (!document.querySelector("#expbar")) return;
                            Array.isArray(e.xpMeterState.xpGains) ||
                                i.resetXpMeterState();
                            const t = i.getCurrentXp(),
                                n = i.getNextLevelXp(),
                                o = i.getCurrentCharacterLvl(),
                                r = t - e.xpMeterState.currentXp,
                                s = t - e.xpMeterState.currentXp,
                                l =
                                    e.xpMeterState.xpGains.length > 0
                                        ? e.xpMeterState.xpGains.reduce(
                                              (e, t) => e + t,
                                              0
                                          ) / e.xpMeterState.xpGains.length
                                        : 0;
                            e.xpMeterState.xpGains.push(s),
                                0 !== r && (e.xpMeterState.gainedXp += r),
                                t !== e.xpMeterState.currentXp &&
                                    (e.xpMeterState.currentXp = t),
                                l !== e.xpMeterState.averageXp &&
                                    (e.xpMeterState.averageXp = l),
                                (0, a.saveState)(),
                                document.querySelector(".js-xpmeter") &&
                                    ((document.querySelector(
                                        ".js-xpm"
                                    ).textContent = parseInt(
                                        (60 * e.xpMeterState.averageXp).toFixed(
                                            0
                                        )
                                    ).toLocaleString()),
                                    (document.querySelector(
                                        ".js-xph"
                                    ).textContent = parseInt(
                                        (
                                            60 *
                                            e.xpMeterState.averageXp *
                                            60
                                        ).toFixed(0)
                                    ).toLocaleString()),
                                    (document.querySelector(
                                        ".js-xpg"
                                    ).textContent = e.xpMeterState.gainedXp.toLocaleString()),
                                    (document.querySelector(
                                        ".js-xpl"
                                    ).textContent = (n - t).toLocaleString()),
                                    (document.querySelector(
                                        ".js-xp-s-time"
                                    ).textContent = i.msToString(
                                        1e3 * e.xpMeterState.xpGains.length
                                    )),
                                    e.xpMeterState.averageXp > 0 &&
                                        (document.querySelector(
                                            ".js-xp-time"
                                        ).textContent = i.msToString(
                                            ((n - t) /
                                                e.xpMeterState.averageXp) *
                                                1e3
                                        ))),
                                e.xpMeterState.currentLvl < o &&
                                    (i.resetXpMeterState(),
                                    (e.xpMeterState.currentLvl = o),
                                    (0, a.saveState)());
                        }, 1e3));
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.default = void 0);
                var a = e("../../utils/state"),
                    i = r(e("./helpers")),
                    l = e("../../utils/ui"),
                    c = {
                        name: "XP Meter",
                        description:
                            "Tracks your XP/minute and displays how much XP you're getting and lets you know how long until you level up",
                        run: s
                    };
                n.default = c;
            },
            { "../../utils/state": 45, "../../utils/ui": 46, "./helpers": 39 }
        ],
        41: [
            function (e, t, n) {
                "use strict";
                function o() {
                    const e = (0, c.getState)();
                    Object.keys(e.blockList).forEach(e => {
                        const t = Array.from(
                            document.querySelectorAll(
                                `[data-chat-name="${e}"]:not(.js-line-blocked)`
                            )
                        );
                        t.forEach(e => {
                            e.classList.add("js-line-blocked");
                            const t = e.parentNode.parentNode.parentNode;
                            t.classList.add("js-line-blocked");
                        });
                    });
                }
                function r(e) {
                    const t = new KeyboardEvent("keydown", {
                        bubbles: !0,
                        cancelable: !0,
                        keyCode: 13
                    });
                    document.body.dispatchEvent(t);
                    const n = document.querySelector("#chatinput input");
                    n.value = e;
                    const o = new KeyboardEvent("input", {
                        bubbles: !0,
                        cancelable: !0
                    });
                    n.dispatchEvent(o);
                }
                function s() {
                    const e = document.querySelector("#chatinput input"),
                        t = new KeyboardEvent("keydown", {
                            bubbles: !0,
                            cancelable: !0,
                            keyCode: 13
                        });
                    e.dispatchEvent(t);
                }
                function a(e) {
                    r(`/${e} `);
                }
                function i(e) {
                    r(`/partyinvite ${e}`), s();
                }
                function l(e) {
                    const t = `\n      <div class="linewrap svelte-1vrlsr3">\n          <span class="time svelte-1vrlsr3">00.00</span>\n          <span class="textuimod content svelte-1vrlsr3">\n          <span class="capitalize channel svelte-1vrlsr3">UIMod</span>\n          </span>\n          <span class="svelte-1vrlsr3">${e}</span>\n      </div>\n      `,
                        n = (0, d.makeElement)({
                            element: "article",
                            class: "line svelte-1vrlsr3",
                            content: t
                        }),
                        o = document.querySelector("#chat");
                    o.appendChild(n), (o.scrollTop = o.scrollHeight);
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.filterAllChat = o),
                    (n.whisperPlayer = a),
                    (n.partyPlayer = i),
                    (n.addChatMessage = l);
                var c = e("./state"),
                    d = e("./misc");
            },
            { "./misc": 43, "./state": 45 }
        ],
        42: [
            function (e, t, n) {
                "use strict";
                async function o(e, t) {
                    const n = (0, s.getTempState)();
                    t &&
                        !n.keyModifiers.shift &&
                        ((n.gettingTooltipContentShiftPress = !0),
                        document.body.dispatchEvent(
                            new KeyboardEvent("keydown", {
                                bubbles: !0,
                                cancelable: !0,
                                key: "Shift"
                            })
                        )),
                        e.dispatchEvent(new Event("pointerenter"));
                    const o = new Promise(o =>
                            setTimeout(() => {
                                const r = () => {
                                    const t = document.querySelector(
                                        ".slotdescription"
                                    );
                                    t && t.cloneNode
                                        ? o(t.cloneNode(!0))
                                        : o(!1),
                                        n.gettingTooltipContentShiftPress &&
                                            (document.body.dispatchEvent(
                                                new KeyboardEvent("keyup", {
                                                    bubbles: !0,
                                                    cancelable: !0,
                                                    key: "Shift"
                                                })
                                            ),
                                            (n.gettingTooltipContentShiftPress = !1)),
                                        e.dispatchEvent(
                                            new Event("pointerleave")
                                        );
                                };
                                t && !document.querySelector(".slotdescription")
                                    ? setTimeout(r, 1)
                                    : r();
                            }, 0)
                        ),
                        r = await o;
                    return r;
                }
                function r(e, t) {
                    const n = Array.from(
                            document.querySelectorAll('.window [name="title"]')
                        ).find(
                            t => t.textContent.toLowerCase() === e.toLowerCase()
                        ),
                        o = n ? n.parentNode.parentNode.parentNode : n;
                    return o && (o.offsetParent || t)
                        ? n
                            ? n.parentNode.parentNode.parentNode
                            : n
                        : void 0;
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.getTooltipContent = o),
                    (n.getWindow = r);
                var s = e("./state");
            },
            { "./state": 45 }
        ],
        43: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    const t = document.createElement(e.element);
                    return (
                        e.class && (t.className = e.class),
                        e.content && (t.innerHTML = e.content),
                        e.src && (t.src = e.src),
                        e.type && (t.type = e.type),
                        e.placeholder && (t.placeholder = e.placeholder),
                        t
                    );
                }
                function r(e, t, n) {
                    var o;
                    return function () {
                        var r = this,
                            s = arguments,
                            a = function () {
                                (o = null), n || e.apply(r, s);
                            },
                            i = n && !o;
                        clearTimeout(o),
                            (o = setTimeout(a, t)),
                            i && e.apply(r, s);
                    };
                }
                function s() {
                    var e,
                        t,
                        n = "";
                    for (e = 0; e < 32; e++)
                        (t = (16 * Math.random()) | 0),
                            (8 != e && 12 != e && 16 != e && 20 != e) ||
                                (n += "-"),
                            (n += (12 == e
                                ? 4
                                : 16 == e
                                ? (3 & t) | 8
                                : t
                            ).toString(16));
                    return n;
                }
                function a(e) {
                    if (null === e || "object" != typeof e) return e;
                    if (e instanceof Date) return new Date(e.getTime());
                    if (Array.isArray(e)) {
                        var t = [];
                        return (
                            e.forEach(function (e) {
                                t.push(a(e));
                            }),
                            t
                        );
                    }
                    let n = new e.constructor();
                    for (var o in e) e.hasOwnProperty(o) && (n[o] = a(e[o]));
                    return n;
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.makeElement = o),
                    (n.debounce = r),
                    (n.uuid = s),
                    (n.deepClone = a);
            },
            {}
        ],
        44: [
            function (e, t, n) {
                "use strict";
                function o() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (o = function () {
                            return e;
                        }),
                        e
                    );
                }
                function r(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = o();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        r =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = r
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                function s(e) {
                    const t = (0, c.getState)();
                    t.friendsList[e] ||
                        ((t.friendsList[e] = !0),
                        d.addChatMessage(
                            `${e} has been added to your friends list.`
                        ),
                        (0, c.saveState)(),
                        u.isWindowOpen(u.WindowNames.friendsList) &&
                            (u.removeFriendsList(), u.createFriendsList()));
                }
                function a(e) {
                    const t = (0, c.getState)();
                    t.friendsList[e] &&
                        (delete t.friendsList[e],
                        delete t.friendNotes[e],
                        d.addChatMessage(
                            `${e} is no longer on your friends list.`
                        ),
                        (0, c.saveState)(),
                        u.isWindowOpen(u.WindowNames.friendsList) &&
                            (u.removeFriendsList(), u.createFriendsList()));
                }
                function i(e) {
                    const t = (0, c.getState)();
                    t.blockList[e] ||
                        ((t.blockList[e] = !0),
                        d.filterAllChat(),
                        d.addChatMessage(`${e} has been blocked.`),
                        (0, c.saveState)(),
                        u.isWindowOpen(u.WindowNames.blockList) &&
                            (u.removeBlockList(), u.createBlockList()));
                }
                function l(e) {
                    const t = (0, c.getState)();
                    delete t.blockList[e],
                        d.addChatMessage(`${e} has been unblocked.`),
                        (0, c.saveState)();
                    const n = Array.from(
                        document.querySelectorAll(
                            `.js-line-blocked[data-chat-name="${e}"]`
                        )
                    );
                    n.forEach(e => {
                        e.classList.remove("js-line-blocked");
                        const t = e.parentNode.parentNode.parentNode;
                        t.classList.remove("js-line-blocked");
                    });
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.friendPlayer = s),
                    (n.unfriendPlayer = a),
                    (n.blockPlayer = i),
                    (n.unblockPlayer = l);
                var c = e("./state"),
                    d = r(e("./chat")),
                    u = r(e("./ui"));
            },
            { "./chat": 41, "./state": 45, "./ui": 46 }
        ],
        45: [
            function (e, t, n) {
                "use strict";
                function o() {
                    return c;
                }
                function r() {
                    return d;
                }
                function s() {
                    localStorage.setItem(l, JSON.stringify(c));
                }
                function a() {
                    const e = localStorage.getItem(l);
                    if (e) {
                        const t = JSON.parse(e);
                        if (t.breakingVersion !== i.BREAKING_VERSION)
                            return void localStorage.setItem(
                                l,
                                JSON.stringify(c)
                            );
                        for (let [e, n] of Object.entries(t)) c[e] = n;
                    }
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.getState = o),
                    (n.getTempState = r),
                    (n.saveState = s),
                    (n.loadState = a);
                var i = e("./version");
                const l = "hordesio-uimodsakaiyo-state";
                let c = {
                    breakingVersion: i.BREAKING_VERSION,
                    windowsPos: {},
                    blockList: {},
                    friendsList: {},
                    mapOpacity: 70,
                    friendNotes: {},
                    chatTabs: [],
                    xpMeterState: {
                        currentXp: 0,
                        xpGains: [],
                        averageXp: 0,
                        gainedXp: 0,
                        currentLvl: 0
                    },
                    openWindows: {
                        friendsList: !1,
                        blockList: !1,
                        xpMeter: !1,
                        merchant: !1,
                        modToggler: !1
                    },
                    clanLastActiveMembers: {},
                    lockedItemSlots: [],
                    disabledMods: []
                };
                const d = {
                    chatName: null,
                    lastMapWidth: 0,
                    lastMapHeight: 0,
                    xpMeterInterval: null,
                    keyModifiers: { shift: !1, control: !1, alt: !1 },
                    cooldownNums: {},
                    cooldownObservers: {}
                };
            },
            { "./version": 47 }
        ],
        46: [
            function (e, t, n) {
                "use strict";
                function o(e) {
                    return e && e.__esModule ? e : { default: e };
                }
                function r() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap();
                    return (
                        (r = function () {
                            return e;
                        }),
                        e
                    );
                }
                function s(e) {
                    if (e && e.__esModule) return e;
                    if (
                        null === e ||
                        ("object" != typeof e && "function" != typeof e)
                    )
                        return { default: e };
                    var t = r();
                    if (t && t.has(e)) return t.get(e);
                    var n = {},
                        o =
                            Object.defineProperty &&
                            Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            var a = o
                                ? Object.getOwnPropertyDescriptor(e, s)
                                : null;
                            a && (a.get || a.set)
                                ? Object.defineProperty(n, s, a)
                                : (n[s] = e[s]);
                        }
                    return (n.default = e), t && t.set(e, n), n;
                }
                function a() {
                    const e = (0, j.getState)();
                    let t = "";
                    O.default.forEach(n => {
                        if (n.required) return;
                        const o = !e.disabledMods.includes(n.name);
                        t += `\n              <div class="uimod-mod-name">${
                            n.name
                        }</div>\n              <div class="uimod-mod-desc">${
                            n.description
                        }</div>\n              <div class="uimod-mod-state">${
                            o ? "Turned on" : "Turned off"
                        }</div>\n              ${
                            o
                                ? `<div class="btn orange js-disable-mod" data-mod-name="${n.name}">Turn OFF mod</div>`
                                : `<div class="btn blue js-enable-mod" data-mod-name="${n.name}">Turn ON mod</div>`
                        }\n          `;
                    });
                    const n = `\n          <h3 class="textprimary">UI Mods</h3>\n          <div class="uimod-disclaimer">Disclaimer: You MUST refresh the game after you enable/disable a mod for it to take effect.</div>\n          <div class="settings uimod-mod-toggler js-mod-toggler-list">${t}</div>\n          <p></p>\n          <div class="btn purp js-close-mod-toggler">Close</div>\n      `,
                        o = (0, k.makeElement)({
                            element: "div",
                            class:
                                "menu panel-black uimod-mod-toggler-window uimod-custom-window js-mod-toggler",
                            content: n
                        });
                    document.body.appendChild(o),
                        b(L.modToggler),
                        Array.from(
                            document.querySelectorAll(".js-disable-mod")
                        ).forEach(t => {
                            t.addEventListener("click", t => {
                                const n = t.target.getAttribute(
                                    "data-mod-name"
                                );
                                e.disabledMods.includes(n) ||
                                    (e.disabledMods.push(n),
                                    (0, j.saveState)());
                                let o = document.querySelector(
                                    ".js-mod-toggler-list"
                                );
                                const r = o.scrollTop;
                                i(),
                                    a(),
                                    (o = document.querySelector(
                                        ".js-mod-toggler-list"
                                    )),
                                    (o.scrollTop = r);
                            });
                        }),
                        Array.from(
                            document.querySelectorAll(".js-enable-mod")
                        ).forEach(t => {
                            t.addEventListener("click", t => {
                                const n = t.target.getAttribute(
                                    "data-mod-name"
                                );
                                e.disabledMods.includes(n) &&
                                    (e.disabledMods.splice(
                                        e.disabledMods.indexOf(n),
                                        1
                                    ),
                                    (0, j.saveState)());
                                let o = document.querySelector(
                                    ".js-mod-toggler-list"
                                );
                                const r = o.scrollTop;
                                i(),
                                    a(),
                                    (o = document.querySelector(
                                        ".js-mod-toggler-list"
                                    )),
                                    (o.scrollTop = r);
                            });
                        }),
                        document
                            .querySelector(".js-close-mod-toggler")
                            .addEventListener("click", i);
                }
                function i() {
                    const e = document.querySelector(".js-mod-toggler");
                    e.parentNode.removeChild(e), S(L.modToggler);
                }
                function l() {
                    const e = (0, j.getState)();
                    let t = "";
                    Object.keys(e.blockList)
                        .sort()
                        .forEach(e => {
                            t += `\n              <div data-player-name="${e}">${e}</div>\n              <div class="btn orange js-unblock-player" data-player-name="${e}">Unblock player</div>\n          `;
                        });
                    const n = `\n          <h3 class="textprimary">Blocked players</h3>\n          <div class="settings uimod-settings">${t}</div>\n          <p></p>\n          <div class="btn purp js-close-custom-settings">Close</div>\n      `,
                        o = (0, k.makeElement)({
                            element: "div",
                            class:
                                "menu panel-black uimod-custom-window js-blocked-list",
                            content: n
                        });
                    document.body.appendChild(o),
                        b(L.blockList),
                        Array.from(
                            document.querySelectorAll(".js-unblock-player")
                        ).forEach(e => {
                            e.addEventListener("click", e => {
                                const t = e.target.getAttribute(
                                    "data-player-name"
                                );
                                M.unblockPlayer(t),
                                    Array.from(
                                        document.querySelectorAll(
                                            `.js-blocked-list [data-player-name="${t}"]`
                                        )
                                    ).forEach(e => {
                                        e.parentNode.removeChild(e);
                                    });
                            });
                        }),
                        document
                            .querySelector(".js-close-custom-settings")
                            .addEventListener("click", c);
                }
                function c() {
                    const e = document.querySelector(".js-blocked-list");
                    e.parentNode.removeChild(e), S(L.blockList);
                }
                function d() {
                    const e = (0, j.getState)();
                    if (document.querySelector(".js-friends-list")) return;
                    let t = "";
                    Object.keys(e.friendsList)
                        .sort()
                        .forEach(n => {
                            t += `\n              <div data-player-name="${n}">${n}</div>\n              <div class="btn blue js-whisper-player" data-player-name="${n}">Whisper</div>\n              <div class="btn blue js-party-player" data-player-name="${n}">Party invite</div>\n              <div class="btn orange js-unfriend-player" data-player-name="${n}">X</div>\n              <input type="text" class="js-friend-note" placeholder="You can add a note here" data-player-name="${n}" value="${
                                e.friendNotes[n] || ""
                            }"></input>\n          `;
                        });
                    const n = `\n          <div class="titleframe uimod-friends-list-helper">\n                  <div class="textprimary title uimod-friends-list-helper">\n                      <div name="title">Friends list</div>\n                  </div>\n                  <img src="/assets/ui/icons/cross.svg?v=3282286" class="js-close-custom-friends-list btn black svgicon">\n          </div>\n          <div class="uimod-friends-intro">To add someone as a friend, click their name in chat and then click Friend :)</div>\n          <div class="uimod-friends">${t}</div>\n      `,
                        o = (0, k.makeElement)({
                            element: "div",
                            class:
                                "menu window panel-black js-friends-list uimod-custom-window",
                            content: n
                        });
                    document.body.appendChild(o),
                        b(L.friendsList),
                        Array.from(
                            document.querySelectorAll(".js-whisper-player")
                        ).forEach(e => {
                            e.addEventListener("click", e => {
                                const t = e.target.getAttribute(
                                    "data-player-name"
                                );
                                C.whisperPlayer(t);
                            });
                        }),
                        Array.from(
                            document.querySelectorAll(".js-party-player")
                        ).forEach(e => {
                            e.addEventListener("click", e => {
                                const t = e.target.getAttribute(
                                    "data-player-name"
                                );
                                C.partyPlayer(t);
                            });
                        }),
                        Array.from(
                            document.querySelectorAll(".js-unfriend-player")
                        ).forEach(e => {
                            e.addEventListener("click", e => {
                                const t = e.target.getAttribute(
                                    "data-player-name"
                                );
                                M.unfriendPlayer(t),
                                    Array.from(
                                        document.querySelectorAll(
                                            `.js-friends-list [data-player-name="${t}"]`
                                        )
                                    ).forEach(e => {
                                        e.parentNode.removeChild(e);
                                    });
                            });
                        }),
                        Array.from(
                            document.querySelectorAll(".js-friend-note")
                        ).forEach(t => {
                            t.addEventListener("change", t => {
                                const n = t.target.getAttribute(
                                    "data-player-name"
                                );
                                e.friendNotes[n] = t.target.value;
                            });
                        }),
                        document
                            .querySelector(".js-close-custom-friends-list")
                            .addEventListener("click", u);
                }
                function u() {
                    const e = document.querySelector(".js-friends-list");
                    e.parentNode.removeChild(e), S(L.friendsList);
                }
                function p() {
                    w(L.friendsList) ? u() : d();
                }
                function m() {
                    const e = document.querySelector(".js-xpmeter");
                    e || f(),
                        (e.style.display =
                            "none" === e.style.display ? "block" : "none"),
                        "none" === e.style.display
                            ? S(L.xpMeter)
                            : b(L.xpMeter);
                }
                function f() {
                    const e = document.querySelector(
                            "body > div.layout > div.container:nth-child(1)"
                        ),
                        t =
                            '\n          <div class="l-corner-lr container uimod-xpmeter-1 js-xpmeter" style="display: none">\n              <div class="window panel-black uimod-xpmeter-2">\n              <div class="titleframe uimod-xpmeter-2">\n              <img src="/assets/ui/icons/trophy.svg?v=3282286" class="titleicon svgicon uimod-xpmeter-2">\n                  <div class="textprimary title uimod-xpmeter-2">\n                      <div name="title">Experience / XP</div>\n                  </div>\n                  <img src="/assets/ui/icons/cross.svg?v=3282286" class="js-xpmeter-close-icon btn black svgicon">\n          </div>\n                  <div class="slot uimod-xpmeter-2" style="">\n                      <div class="wrapper uimod-xpmeter-1">\n                          <div class="bar  uimod-xpmeter-3" style="z-index: 0;">\n                              <div class="progressBar bgc1 uimod-xpmeter-3" style="width: 100%; font-size: 1em;">\n                                  <span class="left uimod-xpmeter-3">XP per minute:</span>\n                                  <span class="right uimod-xpmeter-3 js-xpm">-</span>\n                              </div>\n                              <div class="progressBar bgc1 uimod-xpmeter-3" style="width: 100%; font-size: 1em;">\n                                  <span class="left uimod-xpmeter-3">XP per hour:</span>\n                                  <span class="right uimod-xpmeter-3 js-xph">-</span>\n                              </div>\n                              <div class="progressBar bgc1 uimod-xpmeter-3" style="width: 100%; font-size: 1em;">\n                                  <span class="left uimod-xpmeter-3">XP Gained:</span>\n                                  <span class="right uimod-xpmeter-3 js-xpg">-</span>\n                              </div>\n                              <div class="progressBar bgc1 uimod-xpmeter-3" style="width: 100%; font-size: 1em;">\n                                  <span class="left uimod-xpmeter-3">XP Left:</span>\n                                  <span class="right uimod-xpmeter-3 js-xpl">-</span>\n                              </div>\n                              <div class="progressBar bgc1 uimod-xpmeter-3" style="width: 100%; font-size: 1em;">\n                                  <span class="left uimod-xpmeter-3">Session Time: </span>\n                                  <span class="right uimod-xpmeter-3 js-xp-s-time">-</span>\n                              </div>\n                              <div class="progressBar bgc1 uimod-xpmeter-3" style="width: 100%; font-size: 1em;">\n                                  <span class="left uimod-xpmeter-3">Time to lvl: </span>\n                                  <span class="right uimod-xpmeter-3 js-xp-time">-</span>\n                              </div>\n                          </div>\n                      </div>\n                      <div class="grid buttons marg-top uimod-xpmeter-1 js-xpmeter-reset-button">\n                          <div class="btn grey">Reset</div>\n                      </div>\n                  </div>\n              </div>\n          </div>\n      ',
                        n = (0, k.makeElement)({
                            element: "div",
                            content: t.trim()
                        });
                    e.appendChild(n.firstChild);
                }
                function y() {
                    const e = (0, j.getState)();
                    (e.windowsPos = {}),
                        (0, j.saveState)(),
                        C.addChatMessage(
                            "Please refresh the page for the reset frame & window positions to take effect."
                        );
                }
                function h() {
                    document.querySelector("js-screenshot-warning") && v();
                    const e = (0, k.makeElement)({
                            element: "span",
                            class:
                                "js-screenshot-warning uimod-screenshot-warning-container"
                        }),
                        t = (0, k.makeElement)({
                            element: "span",
                            class: "uimod-screenshot-warning",
                            content: "Press F9 to exit screenshot mode"
                        });
                    e.appendChild(t),
                        document.body.appendChild(e),
                        setTimeout(() => {
                            e.classList.add("uimod-screenshot-warning-fadeout");
                        }, 3e3);
                }
                function v() {
                    const e = document.querySelector(".js-screenshot-warning");
                    e && e.parentNode.removeChild(e);
                }
                function g(e, t, n, o) {
                    const r = "js-" + e + "-icon",
                        s = "js-" + e + "-tooltip",
                        a = (0, k.makeElement)({
                            element: "div",
                            class: "btn border black " + r,
                            content: t
                        }),
                        i = document.querySelector("#sysgem");
                    i.parentNode.insertBefore(a, i.nextSibling),
                        a.addEventListener("mouseenter", () => {
                            const e = (0, k.makeElement)({
                                element: "div",
                                class: "btn border grey " + s,
                                content: n
                            });
                            i.parentNode.insertBefore(e, i);
                        }),
                        a.addEventListener("mouseleave", () => {
                            const e = document.querySelector("." + s);
                            e.parentNode.removeChild(e);
                        }),
                        document
                            .querySelector("." + r)
                            .addEventListener("click", o);
                }
                function b(e) {
                    const t = (0, j.getState)();
                    (t.openWindows[e] = !0), (0, j.saveState)();
                }
                function S(e) {
                    const t = (0, j.getState)();
                    (t.openWindows[e] = !1), (0, j.saveState)();
                }
                function w(e) {
                    const t = (0, j.getState)();
                    return t.openWindows[e];
                }
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.createModToggler = a),
                    (n.removeModToggler = i),
                    (n.createBlockList = l),
                    (n.removeBlockList = c),
                    (n.createFriendsList = d),
                    (n.removeFriendsList = u),
                    (n.toggleFriendsList = p),
                    (n.toggleXpMeterVisibility = m),
                    (n.createXpMeter = f),
                    (n.resetUiPositions = y),
                    (n.setWindowOpen = b),
                    (n.setWindowClosed = S),
                    (n.isWindowOpen = w),
                    (n.createScreenshotWarning = h),
                    (n.removeScreenshotWarning = v),
                    (n.createNavButton = g),
                    (n.WindowNames = void 0);
                var j = e("./state"),
                    k = e("./misc"),
                    C = s(e("./chat")),
                    M = s(e("./player")),
                    O = o(e("../mods"));
                const L = {
                    friendsList: "friendsList",
                    blockList: "blockList",
                    xpMeter: "xpMeter",
                    merchant: "merchant",
                    clan: "clan",
                    stash: "stash",
                    inventory: "inventory",
                    modToggler: "modToggler"
                };
                n.WindowNames = L;
            },
            {
                "../mods": 22,
                "./chat": 41,
                "./misc": 43,
                "./player": 44,
                "./state": 45
            }
        ],
        47: [
            function (e, t, n) {
                "use strict";
                Object.defineProperty(n, "__esModule", { value: !0 }),
                    (n.VERSION = n.BREAKING_VERSION = void 0);
                const o = 1;
                n.BREAKING_VERSION = o;
                const r = "1.4.1";
                n.VERSION = r;
            },
            {}
        ]
    },
    {},
    [1]
);
