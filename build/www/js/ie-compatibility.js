var admin = false;
var espeaktts = false;
var sapi5tts = false;
var sockets_defined = false;
("use strict");

function updateAds() {
    var a = $(window).height() - $(adElement).height(),
        b = a <= 250;
    b && (a = $(window).height()), $(adElement)[b ? "hide" : "show"](), $("#content").height(a);
}
// OBSOLETE: No longer needed
//function execute() {
// $("#evaljs_console").append("\n> " + $("#evaljs_codebox").val()), socket.emit("evaljs", { input: $("#evaljs_codebox").val() });
//}
function dragMoveListener(t) {
    var e = t.target,
        a = (parseFloat(e.getAttribute("data-x")) || 0) + t.dx,
        r = (parseFloat(e.getAttribute("data-y")) || 0) + t.dy;
    (e.style.webkitTransform = e.style.transform = "translate(" + a + "px, " + r + "px)"), e.setAttribute("data-x", a), e.setAttribute("data-y", r);
}
// Unneeded
//interact(".win2000_base").draggable({ onmove: window.dragMoveListener }), (window.dragMoveListener = dragMoveListener);
function close_evaljs() {
    $("#evaljs").css("display", "none");
}
function _classCallCheck(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}
function range(a, b) {
    for (var c = [], d = a; d <= b; d++) c.push(d);
    for (var d = a; d >= b; d--) c.push(d);
    return c;
}
function replaceAll(a, b, c) {
    return a.replace(new RegExp(b, "g"), c);
}
function s4() {
    return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1);
}
function youtubeParser(a) {
    var b = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
        c = a.match(b);
    return !(!c || 11 != c[7].length) && c[7];
}
function linkify(a) {
    var b = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi;
    return a.replace(b, "<a href='$1' target='_blank'>$1</a>").replace(/r\/(\w+)/g, "<a href='https://reddit.com/r/$1' target='_blank'>r/$1</a>");
}
function loadBonzis(a) {}
function loadTest() {
    $("#login_card").hide(),
        $("#login_error").hide(),
        $("#login_load").show(),
        (document.getElementById("page_login").style.cursor = "wait"),
        (window.loadTestInterval = rInterval(function () {
            try {
                if (!loadDone.equals(loadNeeded)) throw "Not done loading.";
                login(), loadTestInterval.clear();
            } catch (a) {}
        }, 100));
}
function login() {
    var p = new Audio("./js/start.wav");
    p.play();
    socket.emit("login", { name: $("#login_name").val() || "Anonymous", room: $("#login_room").val() || "default" }), setup();
}
function errorJS() {
    ("none" != $("#page_ban").css("display") && "none" != $("#page_kick").css("display")) || $("#page_jserror").show();
}
function errorFatal(p) {
    (p = new Audio("./error.wav")), p.play(), ("none" != $("#page_ban").css("display") && "none" != $("#page_kick").css("display")) || $("#page_error").show();
}
function setup() {
    $("#chat_send").click(sendInput),
        $("#chat_message").keypress(function (a) {
            13 == a.which && sendInput();
        }),
        socket.on("room", function (a, p) {
            var p = new Audio("startup.wav");
            if (a.room == "news") {
                document.getElementById("news").innerHTML =
                    '<iframe style="position: absolute; overflow: hidden; width: 100%; height: 100%; pointer-events: none;" src="https://www.youtube.com/embed/9Auq9mYxFEE?autoplay=1&showinfo=0&controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            }
            p.play();
            (document.getElementById("content").style.backgroundColor = a.background),
                $("#room_owner")[a.isOwner ? "show" : "hide"](),
                $("#room_public")[a.isPublic ? "show" : "hide"](),
                $("#room_private")[a.isPublic ? "hide" : "show"](),
                $("#room_id").text(a.room);
        }),
        socket.on("updateAll", function (a) {
            $("#page_login").hide(), (usersPublic = a.usersPublic), usersUpdate(), BonziHandler.bonzisCheck();
        }),
        socket.on("update", function (a) {
            (window.usersPublic[a.guid] = a.userPublic), usersUpdate(), BonziHandler.bonzisCheck();
        }),
        socket.on("background", function (a) {
            document.getElementById("content").style.backgroundColor = a.background;
        }),
        socket.on("updateAll", function (a) {
            $("#page_login").hide(), (usersPublic = a.usersPublic), usersUpdate(), BonziHandler.bonzisCheck();
        }),
        socket.on("update", function (a) {
            (window.usersPublic[a.guid] = a.userPublic), usersUpdate(), BonziHandler.bonzisCheck();
        }),
        socket.on("talk", function (a) {
            var b = bonzis[a.guid];
            b.runSingleEvent([{ type: "text", text: a.text, say: a.say || a.text }]);
        }),
        socket.on("joke", function (a) {
            var b = bonzis[a.guid];
            (b.rng = new Math.seedrandom(a.rng)), b.cancel(), b.joke();
        }),
        socket.on("img", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.img(a.vid);
        }),
        socket.on("letsplay", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.letsplay(a.vid);
        }),
        socket.on("letsplay2", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.letsplay2();
        }),
        socket.on("letsplay3", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.letsplay3();
        }),
        socket.on("iframe", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.iframe(a.vid);
        }),
        socket.on("vlare", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.vlare(a.vid);
        }),
        socket.on("fact", function (a) {
            var b = bonzis[a.guid];
            (b.rng = new Math.seedrandom(a.rng)), b.cancel(), b.fact();
        }),
        socket.on("backflip", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.backflip(a.swag);
            var a = new Audio("backflip.wav");
            a.play();
        }),
        socket.on("cooldown", function (a) {
            speak.play("Cooldown activated: please do not spam.");
        }),
        socket.on("sad", function (a) {
            var b = bonzis[a.guid];
            b.sad();
            if (b.color === "robby") {
                var aud = new Audio("robby_sad.wav");
                aud.play();
            }
        }),
        socket.on("shrug", function (a) {
            var b = bonzis[a.guid];
            b.shrug();
        }),
        socket.on("greet", function (a) {
            rf;
            var b = bonzis[a.guid];
            b.greet();
        }),
        socket.on("think", function (a) {
            var b = bonzis[a.guid];
            b.think();
        }),
        socket.on("wave", function (a) {
            var b = bonzis[a.guid];
            b.wave();
        }),
        socket.on("banana", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.banana();
        }),
        socket.on("nod", function (a) {
            var b = bonzis[a.guid];
            b.nod();
        }),
        socket.on("acknowledge", function (a) {
            var b = bonzis[a.guid];
            b.nod();
        }),
        socket.on("banana", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.banana();
        }),
        socket.on("surprised", function (a) {
            var b = bonzis[a.guid];
            b.surprised();
            var a = new Audio("surprised.wav");
            a.play();
        }),
        socket.on("laugh", function (a) {
            var b = bonzis[a.guid];
            b.cancel();
            b.laugh();
            var a = new Audio("laugh.ogg");
            a.play();
        }),
        socket.on("write", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.write();
        }),
        socket.on("write_once", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.write2();
        }),
        socket.on("write_infinite", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.write3();
        }),
        socket.on("clap", function (a) {
            var b = bonzis[a.guid];
            b.clap();
            setTimeout(function () {
                if (b.color == "robot") {
                    var a = new Audio("zap5.wav");
                    a.play();
                } else {
                    var a = new Audio("clap.wav");
                    a.play();
                }
            }, 600);
        }),
        socket.on("swag", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.swag();
        }),
        socket.on("confused", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.confused();
        }),
        socket.on("earth", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.earth();
        }),
        socket.on("grin", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.grin();
        }),
        socket.on("join", function (a) {
            var b = bonzis[a.guid];
            socket.emit("login", { name: b.name.val(), room: a.rid }), setup();
        }),
        socket.on("surfjoin", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.surfjoin();
        }),
        socket.on("surfleave", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.surfleave();
        }),
        socket.on("surf", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.surf(), (a = new Audio("jump_off.wav")), a.play();
        }),
        socket.on("bang", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.bang();
        }),
        socket.on("clap_clippy", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.clap_clippy();
            setTimeout(function () {
                var a = new Audio("wow.wav");
                a.play();
            }, 400);
        }),
        socket.on("asshole", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.asshole(a.target);
        }),
        socket.on("beggar", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.beggar(a.target);
        }),
        socket.on("kiddie", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.kiddie(a.target);
        }),
        socket.on("loskyfag", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.loskyfag(a.target);
        }),
        socket.on("logofag", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.logofag(a.target);
        }),
        socket.on("gofag", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.gofag(a.target);
        }),
        socket.on("forcer", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.forcer(a.target);
        }),
        socket.on("welcome", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.welcome(a.target);
        }),
        socket.on("muted", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.muted(a.target);
        }),
        socket.on("owo", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.owo(a.target);
        }),
        socket.on("uwu", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.uwu(a.target);
        }),
        socket.on("triggered", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.runSingleEvent(b.data.event_list_triggered);
        }),
        socket.on("blackhat", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.blackhat();
        }),
        socket.on("sing", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.sing();
        }),
        socket.on("linux", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.runSingleEvent(b.data.event_list_linux);
        }),
        socket.on("pawn", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.runSingleEvent(b.data.event_list_pawn);
        }),
        socket.on("bees", function (a) {
            var b = bonzis[a.guid];
            b.cancel(), b.bees();
        }),
        socket.on("list", function (a) {
            $("#evaljs").css("display", "block"), (document.getElementById("evaljs_console").innerHTML = a.vid + "<br><br>");
        }),
        socket.on("open_ban_menu", function (a) {
            banmenu();
        }),
        socket.on("vaporwave", function (a) {
            $("body").addClass("vaporwave");
        }),
        socket.on("rainbow", function (a) {
            $("body").addClass("rainbow");
        }),
        socket.on("xp_mode", function (a) {
            $("body").addClass("xp_mode");
        }),
        socket.on("media_xp_mode", function (a) {
            $("body").addClass("mediaxp_mode");
        }),
        socket.on("jumpscare", function (a) {
            document.getElementById("jumpscare").play(), $("body").addClass("jumpscare");
        }),
        socket.on("acid", function (a) {
            init();
        }),
        socket.on("unvaporwave", function (a) {
            $("body").removeClass("vaporwave");
        }),
        socket.on("unrainbow", function (a) {
            $("body").removeClass("rainbow");
        }),
        socket.on("unxp_mode", function (a) {
            $("body").removeClass("xp_mode");
        }),
        socket.on("unmedia_xp_mode", function (a) {
            $("body").removeClass("mediaxp_mode");
        }),
        socket.on("leave", function (a) {
            var b = bonzis[a.guid];
            "undefined" != typeof b &&
                b.exit(
                    function (a) {
                        this.deconstruct(), delete bonzis[a.guid], delete usersPublic[a.guid], usersUpdate();
                    }.bind(b, a)
                );
        });
}
function usersUpdate() {
    (usersKeys = Object.keys(usersPublic)), (usersAmt = usersKeys.length);
}
function sendInput() {
    var a = $("#chat_message").val();
    if (($("#chat_message").val(""), a.length > 0)) {
        var b = youtubeParser(a);
        if (b) return void socket.emit("command", { list: ["youtube", b] });
        if ("/" == a.substring(1, 0)) {
            var c = a.substring(1).split(" ");
            socket.emit("command", { list: c });
        } else socket.emit("talk", { text: a });
    }
}
function touchHandler(a) {
    var b = a.changedTouches,
        c = b[0],
        d = "";
    switch (a.type) {
        case "touchstart":
            d = "mousedown";
            break;
        case "touchmove":
            d = "mousemove";
            break;
        case "touchend":
            d = "mouseup";
            break;
        default:
            return;
    }
    var e = document.createEvent("MouseEvent");
    e.initMouseEvent(d, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), c.target.dispatchEvent(e);
}

var adElement = "#ap_iframe";
$(function () {
    $(window).load(updateAds), $(window).resize(updateAds), $("body").on("DOMNodeInserted", adElement, updateAds), $("body").on("DOMNodeRemoved", adElement, updateAds);
});
var _createClass = (function () {
        function a(a, b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                (d.enumerable = d.enumerable || !1), (d.configurable = !0), "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
            }
        }
        return function (b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b;
        };
    })(),
    Bonzi = (function () {
        function a(b, c) {
            this.stopSpeaking();
            var d = this;
            _classCallCheck(this, a),
                (this.userPublic = c || { name: "BonziBUDDY", color: "purple", speed: 175, pitch: 50, amplitude: 100, voice: "m1" }),
                (this.color = this.userPublic.color),
                this.colorPrev,
                (this.data = window.BonziData),
                (this.drag = !1),
                (this.agent = null),
                (this.dragged = !1),
                (this.eventQueue = []),
                (this.eventRun = !0),
                (this.msg = null),
                (this.event = null),
                (this.willCancel = !1),
                (this.run = !0),
                (this.mute = !1),
                (this.eventTypeToFunc = { anim: "updateAnim", html: "updateText", text: "updateText", idle: "updateIdle", add_random: "updateRandom" }),
                "undefined" == typeof b ? (this.id = s4() + s4()) : (this.id = b),
                (this.rng = new Math.seedrandom(this.seed || this.id || Math.random())),
                (this.selContainer = "#content"),
                (this.$container = $(this.selContainer)),
                this.$container.append(
                    "\n\t\t\t<div id='bonzi_" +
                        this.id +
                        "' class='bonzi'>\n\t\t\t\t<div class='bonzi_name'></div>\n\t\t\t\t\t<div class='bonzi_placeholder'></div>\n\t\t\t\t<div style='display:none' class='bubble'>\n\t\t\t\t\t<p class='bubble-content'></p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"
                ),
                (this.selElement = "#bonzi_" + this.id),
                (this.selDialog = this.selElement + " > .bubble"),
                (this.selDialogCont = this.selElement + " > .bubble > p"),
                (this.selNametag = this.selElement + " > .bonzi_name"),
                (this.selCanvas = this.selElement + " > .bonzi_placeholder"),
                $(this.selCanvas).width(this.data.size.x).height(this.data.size.y),
                (this.$element = $(this.selElement)),
                (this.$canvas = $(this.selCanvas)),
                (this.$dialog = $(this.selDialog)),
                (this.$dialogCont = $(this.selDialogCont)),
                (this.$nametag = $(this.selNametag)),
                this.updateName(),
                $.data(this.$element[0], "parent", this),
                this.updateSprite(!0),
                (this.generate_event = function (a, b, c) {
                    this.stopSpeaking();
                    var d = this;
                    a[b](function (a) {
                        d[c](a);
                    });
                }),
                this.generate_event(this.$canvas, "mousedown", "mousedown"),
                this.generate_event($(window), "mousemove", "mousemove"),
                this.generate_event($(window), "mouseup", "mouseup");
            // * Character Objects
            this.BonziAgent;

            // * Variables
            this.UsedChars;
            this.BonziID;
            this.BonziACS;
            this.BonziLoaded;
            this.LoadReq;
            this.HideReq;
            this.BonziRand;

            // * Initialize
            this.UsedChars = "Bonzi, Peedy, Merlin, Genie, Robby, Max2, James, Clippit, F1, PM_Green";

            // * Bonzi
            var agents = ["Bonzi", "Merlin", "Peedy", "Robby", "Genie", "Max2", "James", "Clippit", "F1", "PM_Green", "MNATURE", "LOGO", "Links", "DOT"];
            var num = Math.floor(Math.random() * agents.length);
			this.BonziRand = agents[num];
			if (this.color == "pm") {
				this.BonziID = "PM_GREEN";
				this.BonziACS = "PM_GREEN.acs";
			} else if (this.color == "red") {
					this.BonziID = "RedBonzi";
					this.BonziACS = this.BonziID + ".acs";
			} else if (this.color == "blue") {
					this.BonziID = "BLUEBO~1";
					this.BonziACS = this.BonziID + ".acs";
			} else if (this.color == "black") {
					this.BonziID = "BLACKB~1";
					this.BonziACS = this.BonziID + ".acs";
			} else if (this.color == "green") {
					this.BonziID = "GREENB~1";
					this.BonziACS = this.BonziID + ".acs";
			} else if (this.color == "purple") {
				this.BonziID = "Bonzi";
				this.BonziACS = "Bonzi.acs";
			} else if (this.color == "yellow") {
					this.BonziID = "YELLOW~1";
					this.BonziACS = this.BonziID + ".acs";
			} else if (this.color == "brown") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "cyan") {
					this.BonziID = "CYANBO~1";
					this.BonziACS = this.BonziID + ".acs";
			} else if (this.color == "white") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "grey") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "pink") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "magenta") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "yellow") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "orange") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "rover") {
				this.BonziID = "Rover";
				this.BonziACS = "Rover.acs";
			} else if (this.color == "dtv") {
				this.BonziID = "GamesAgent";
				this.BonziACS = "GamesAgent.acs";
			} else if (this.color == "program") {
				this.BonziID = "GamesAgent";
				this.BonziACS = "GamesAgent.acs";
			} else if (this.color == "rocky") {
				this.BonziID = "James_W";
				this.BonziACS = "James_W.acs";
			} else if (this.color == "max") {
				this.BonziID = "Max2";
				this.BonziACS = "Max2.acs";
			} else if (this.color == "unbojih") {
				this.BonziID = "Max2";
				this.BonziACS = "Max2.acs";
			} else if (this.color == "genius") {
				this.BonziID = "James_W";
				this.BonziACS = "James_W.acs";
			} else if (this.color == "donutpope") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "guestgal") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "pope") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "clippypope") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "peedy_pope") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "dogpope") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "ban") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "pmpope") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "maxpope") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "unbojihpope") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else if (this.color == "god") {
				if (this.BonziRand == "Bonzi") {
					this.BonziID = "Bonzi";
					this.BonziACS = this.BonziID + ".acs";
				} else if (this.BonziRand == "Peedy") {
					this.BonziID = "Peedy";
					this.BonziACS = "Peedy.acs";
				} else if (this.BonziRand == "Merlin") {
					this.BonziID = "Merlin";
					this.BonziACS = "Merlin.acs";
				} else if (this.BonziRand == "Robby") {
					this.BonziID = "Robby";
					this.BonziACS = "Robby.acs";
				} else if (this.BonziRand == "Genie") {
					this.BonziID = "Genie";
					this.BonziACS = "Genie.acs";
				} else if (this.BonziRand == "James") {
					this.BonziID = "James";
					this.BonziACS = "JAMES.acs";
				} else if (this.BonziRand == "Clippit") {
					this.BonziID = "Clippit";
					this.BonziACS = "CLIPPIT.acs";
				} else if (this.BonziRand == "F1") {
					this.BonziID = "F1";
					this.BonziACS = "F1.acs";
				} else if (this.BonziRand == "PM_Green") {
					this.BonziID = "PM_Green";
					this.BonziACS = "PM_GREEN.acs";
				} else if (this.BonziRand == "MNATURE") {
					this.BonziID = "MNATURE";
					this.BonziACS = "MNATURE.acs";
				} else if (this.BonziRand == "LOGO") {
					this.BonziID = "LOGO";
					this.BonziACS = "LOGO.acs";
				} else if (this.BonziRand == "Links") {
					this.BonziID = "Links";
					this.BonziACS = "Links.acs";
				} else if (this.BonziRand == "DOT") {
					this.BonziID = "DOT";
					this.BonziACS = "DOT.acs";
				}
			} else {
				this.BonziID = this.color;
				this.BonziACS = this.color + ".acs";
			}
            this.BonziLoaded = false;

            // Purpose:  Runs automatically when page is loaded

            // * INSERT ANY NON-AGENT RELATED SCRIPTING HERE

            AgentControl.Connected = true;

            this.BonziLoaded = this.LoadLocalChar(this.BonziID, this.BonziACS);

            this.SetCharObj();
            this.CheckLoadStatus();
            var e = this.maxCoords();
            (this.x = e.x * this.rng()),
                (this.y = e.y * this.rng()),
                $.contextMenu({
                    selector: this.selCanvas,
                    build: function (a, b) {
                        return {
                            items: {
                                cancel: {
                                    name: "Cancel",
                                    callback: function () {
                                        d.cancel();
                                    },
                                },
                                mute: {
                                    name: function name() {
                                        return d.mute ? "Unmute" : "Mute";
                                    },
                                    callback: function callback() {
                                        d.mute = !d.mute;
                                    },
                                },
                                my_name: {
                                    name: "Who is this?",
                                    callback: function () {
                                        socket.emit("command", { list: ["who", d.id] });
                                    },
                                },
                            },
                        };
                    },
                    animation: { duration: 175, show: "fadeIn", hide: "fadeOut" },
                }),
                (this.needsUpdate = !1),
                this.runSingleEvent([{ type: "anim", anim: "surf_intro" }]);
				this.move();
        }
        return (
            _createClass(a, [
                {
                    key: "eventMake",
                    value: function (a) {
                        return {
                            list: a,
                            index: 0,
                            timer: 0,
                            cur: function () {
                                return this.list[this.index];
                            },
                        };
                    },
                },
                {
                    key: "mousedown",
                    value: function (a, anim) {
                        1 == a.which && ((this.drag = !0), (this.dragged = !1), (this.drag_start = { x: a.pageX - this.x, y: a.pageY - this.y }));
                    },
                },
                {
                    key: "LoadLocalChar",
                    value: function (CharID, CharACS) {
                        // Purpose:  Attempts to load the specified character
                        // Returns:  true if successful, false if not

                        AgentControl.RaiseRequestErrors = false;
                        if (CharACS == "") {
                            LoadReq = AgentControl.Characters.Load(CharID);
                        } else {
                            LoadReq = AgentControl.Characters.Load(CharID, CharACS);
                        }
                        AgentControl.RaiseRequestErrors = true;

                        if (LoadReq.Status != 1) {
                            return true;
                        }
                        return false;
                    },
                },
                {
                    key: "CheckLoadStatus",
                    value: function () {
                        // Purpose:  Determines if required characters have been loaded.
                        //           If not, issue request to load next character
                        //           else run the AgentIntro routine

                        if (!this.BonziLoaded) {
                            return false;
                        }

                        window.status = "";
                        this.AgentIntro();
                        return true;
                    },
                },
                {
                    key: "SetCharObj",
                    value: function () {
                        // Purpose:  Sets the character reference and TTS Language ID

                        this.BonziAgent = AgentControl.Characters.Character(this.BonziID);
                        this.BonziAgent.LanguageID = 0x409;
                    },
                },
                {
                    key: "InitAgentCommands",
                    value: function () {
                        // Purpose:  Initialize the Commands menu

                        this.BonziAgent.Commands.RemoveAll();
                        this.BonziAgent.Commands.Caption = "MASH Menu";
                        this.BonziAgent.Commands.Add("Talk", "Send a Message", "Send a Message");
                        this.BonziAgent.Commands.Add("CallAnAsshole", "Call an Asshole", "Call an Asshole");
                        this.BonziAgent.Commands.Add("SayHello", "Say Hello", "Say Hello");
                        this.BonziAgent.Commands.Add("ACO", "Advanced Character Options", "Advanced Character Options");
                    },
                },
                {
                    key: "AgentIntro",
                    value: function () {
                        this.InitAgentCommands();
                        if (this.BonziID == "Merlin") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
                        } else if (this.BonziID == "Robby") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273006}";
                        } else if (this.BonziID == "DOT") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
                        } else if (this.BonziID == "MNATURE") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
                        } else if (this.BonziID == "LOGO") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
                        } else if (this.BonziID == "Links") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273008}";
                        } else if (this.BonziID == "Clippit") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
                        } else if (this.BonziID == "Genie") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
                        } else if (this.BonziID == "James") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
                        } else if (this.BonziID == "PM_Green") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
                        } else if (this.BonziID == "Bonzi") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
                        } else if (this.BonziID == "Peedy") {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
                        } else {
                            this.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
                        }
                        this.BonziAgent.Show();
                        if (this.BonziID == "Clippit" || this.BonziID == "F1" || this.BonziID == "DOT" || this.BonziID == "MNATURE" || this.BonziID == "Links" || this.BonziID == "LOGO") {
                            this.BonziAgent.Play("Greeting");
                        }
                        this.BonziAgent.Get("state", "Speaking");
						if (!sockets_defined) {
							socket.on("talk", function (data) {
								var b = bonzis[data.guid];
								if (!b.mute) {
									b.BonziAgent.Stop();
									b.BonziAgent.Get("state", "Speaking");
									if (b.BonziID == "Merlin") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Robby") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273006}";
									} else if (b.BonziID == "DOT") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "MNATURE") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "LOGO") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Links") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273008}";
									} else if (b.BonziID == "Clippit") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Genie") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "James") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "PM_Green") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Bonzi") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else if (b.BonziID == "Peedy") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									}
									b.BonziAgent.Speak(data.say || data.text);
								} else {
									console.log(b.userPublic.name + " tried to talk while muted!");
								}
							});
							socket.on("wtf", function (data) {
								var b = bonzis[data.guid];
								if (!b.mute) {
									b.BonziAgent.Get("state", "Speaking");
									if (b.BonziID == "Merlin") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Robby") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273006}";
									} else if (b.BonziID == "DOT") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "MNATURE") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "LOGO") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Links") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273008}";
									} else if (b.BonziID == "Clippit") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Genie") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "James") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "PM_Green") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Bonzi") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else if (b.BonziID == "Peedy") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									}
									b.BonziAgent.Stop();
									b.BonziAgent.Speak(data.text);
								} else {
									console.log(b.userPublic.name + " tried to talk while muted!");
								}
							});
							socket.on("triggered", function (data) {
								var b = bonzis[data.guid];
								if (!b.mute) {
									b.BonziAgent.Get("state", "Speaking");
									if (b.BonziID == "Merlin") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Robby") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273006}";
									} else if (b.BonziID == "DOT") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "MNATURE") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "LOGO") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Links") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273008}";
									} else if (b.BonziID == "Clippit") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Genie") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "James") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "PM_Green") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Bonzi") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else if (b.BonziID == "Peedy") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									}
									b.BonziAgent.Stop();
									b.BonziAgent.Play("Announce");
									b.BonziAgent.Speak("I sexually identify as BonziBUDDY. Ever since I was a young gorilla I dreamed of invading desktops dropping hot sticky tootorals on disgusting PC users.");
									b.BonziAgent.Speak("People say to me that a person being a BonziBUDDY is impossible and that I'm a fucking virus but I don't care, I'm beautiful.");
									b.BonziAgent.Speak("I'm having an IT intern install Internet Explorer 6, aquarium screensavers and PC Doctor 2016 on my body. From now on I want you guys to call me Joel and respect my right to meme from above and meme needlessly.");
									b.BonziAgent.Speak("If you cant accept me your a gorillaphobe and need to check your file permissions. Thank you for being so understanding.");
									b.BonziAgent.Play("Pleased");
								} else {
									console.log(b.userPublic.name + " tried to talk while muted!");
								}
							});
							socket.on("asshole", function (data) {
								var b = bonzis[data.guid];
								if (!b.mute) {
									b.BonziAgent.Get("state", "Speaking");
									if (b.BonziID == "Merlin") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Robby") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273006}";
									} else if (b.BonziID == "DOT") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "MNATURE") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "LOGO") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Links") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273008}";
									} else if (b.BonziID == "Clippit") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Genie") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "James") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "PM_Green") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Bonzi") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else if (b.BonziID == "Peedy") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									}
									b.BonziAgent.Stop();
									b.BonziAgent.Speak("Hey, " + data.target + "!");
									b.BonziAgent.Speak("You're a fucking asshole!");
									b.BonziAgent.Play("Pleased");
								} else {
									console.log(b.userPublic.name + " tried to talk while muted!");
								}
							});
							socket.on("disconnect", function () {
								// * Character Objects
								var Clippit;

								// * Variables
								var UsedChars;
								var ClippitID;
								var ClippitACS;
								var ClippitLoaded;
								var LoadReq;
								var HideReq;

								// * Initialize
								UsedChars = "Clippit";

								// * Clippit
								ClippitID = "Clippit";
								ClippitACS = "Clippit.acs";
								ClippitLoaded = false;


								Window_OnLoad();

								function Window_OnLoad() {
									// Purpose:  Runs automatically when page is loaded

									// * INSERT ANY NON-AGENT RELATED SCRIPTING HERE

									AgentControl.Connected = true;

									ClippitLoaded = LoadLocalChar(ClippitID, ClippitACS);

									if (!ClippitLoaded) {
										// Attempt to load default character
										ClippitLoaded = LoadLocalChar(ClippitID, "");
									}

									if (ClippitLoaded) {
										SetCharObj();
									}
									CheckLoadStatus();
								}

								function LoadLocalChar(CharID, CharACS) {
									// Purpose:  Attempts to load the specified character
									// Returns:  true if successful, false if not

									AgentControl.RaiseRequestErrors = false;
									if (CharACS == "") {

										LoadReq = AgentControl.Characters.Load(CharID);
									}
									else {
										LoadReq = AgentControl.Characters.Load(CharID, CharACS);
									}
									AgentControl.RaiseRequestErrors = true;

									if (LoadReq.Status != 1) {
										return(true);
									}
									return(false);
								}

								function SetCharObj() {
									// Purpose:  Sets the character reference and TTS Language ID

									Clippit = AgentControl.Characters.Character(ClippitID);
									Clippit.LanguageID = 0x409;
								}

								function CheckLoadStatus() {
									// Purpose:  Determines if required characters have been loaded.
									//           If not, issue request to load next character
									//           else run the AgentIntro routine

									if (!ClippitLoaded) {
										LoadError();
										return(false);
									}

									window.status = "";
									AgentIntro();
									return(true);
								}

								function LoadError() {
									var strMsg;
									window.status = "";
									strMsg = "Error Loading Character: " + ClippitID + "\n";
									strMsg = strMsg + "This Microsoft Agent Script requires the character(s):\n";
									strMsg = strMsg + UsedChars;
									alert(strMsg);
								}
								function InitAgentCommands() {
									// Purpose:  Initialize the Commands menu

									Clippit.Commands.RemoveAll();
									Clippit.Commands.Caption = "MASH Menu";
									Clippit.Commands.Add("ACO", "Advanced Character Options", "Advanced Character Options");
								}

								function AgentIntro() {
									InitAgentCommands();

									// *** BEGIN MASH USER SCRIPT ***

									Clippit.MoveTo(468, 514);
									Clippit.Show();
									Clippit.Play("GetAttention");
									Clippit.Speak("It appears that you have been disconnected! View your browser for more information.");


									// *** END MASH USER SCRIPT ***
								}
								//-->
								
							});
							socket.on("color", function (data) {
								var b = bonzis[data.guid];
								if (b.BonziAgent) {
									b.BonziAgent.Hide();
								}
								setTimeout(function () {
									b.BonziAgent = null;
									var agents = ["Bonzi", "Merlin", "Peedy", "Robby", "Genie", "Max2", "James", "Clippit", "F1", "PM_Green", "MNATURE", "LOGO", "Links", "DOT"];
									var num = Math.floor(Math.random() * agents.length);
									b.BonziRand = agents[num];
									if (b.color == "pm") {
										b.BonziID = "PM_GREEN";
										b.BonziACS = "PM_GREEN.acs";
									} else if (b.color == "red") {
											b.BonziID = "RedBonzi";
											b.BonziACS = b.BonziID + ".acs";
									} else if (b.color == "blue") {
											b.BonziID = "BLUEBO~1";
											b.BonziACS = b.BonziID + ".acs";
									} else if (b.color == "black") {
											b.BonziID = "BLACKB~1";
											b.BonziACS = b.BonziID + ".acs";
									} else if (b.color == "green") {
											b.BonziID = "GREENB~1";
											b.BonziACS = b.BonziID + ".acs";
									} else if (b.color == "purple") {
										b.BonziID = "Bonzi";
										b.BonziACS = "Bonzi.acs";
									} else if (b.color == "yellow") {
											b.BonziID = "YELLOW~1";
											b.BonziACS = b.BonziID + ".acs";
									} else if (b.color == "brown") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "cyan") { 
											b.BonziID = "CYANBO~1";
											b.BonziACS = b.BonziID + ".acs";
									} else if (b.color == "white") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "grey") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "pink") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "magenta") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "yellow") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "orange") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "dtv") {
										b.BonziID = "GamesAgent";
										b.BonziACS = "GamesAgent.acs";
									} else if (b.color == "rover") {
										b.BonziID = "Rover";
										b.BonziACS = "Rover.acs";
									} else if (b.color == "clippy") {
										b.BonziID = "CLIPPIT";
										b.BonziACS = "CLIPPIT.acs";
									} else if (b.color == "red_clippy") {
										b.BonziID = "CLIPPIT";
										b.BonziACS = "CLIPPIT.acs";
									} else if (b.color == "program") {
										b.BonziID = "GamesAgent";
										b.BonziACS = "GamesAgent.acs";
									} else if (b.color == "rocky") {
										b.BonziID = "James_W";
										b.BonziACS = "James_W.acs";
									} else if (b.color == "max") {
										b.BonziID = "Max2";
										b.BonziACS = "Max2.acs";
									} else if (b.color == "unbojih") {
										b.BonziID = "Max2";
										b.BonziACS = "Max2.acs";
									} else if (b.color == "genius") {
										b.BonziID = "James_W";
										b.BonziACS = "James_W.acs";
									} else if (b.color == "pope") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "clippypope") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "peedy_pope") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "dogpope") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "ban") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "pmpope") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "maxpope") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "unbojihpope") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else if (b.color == "god") {
										if (b.BonziRand == "Bonzi") {
											b.BonziID = "Bonzi";
											b.BonziACS = b.BonziID + ".acs";
										} else if (b.BonziRand == "Peedy") {
											b.BonziID = "Peedy";
											b.BonziACS = "Peedy.acs";
										} else if (b.BonziRand == "Merlin") {
											b.BonziID = "Merlin";
											b.BonziACS = "Merlin.acs";
										} else if (b.BonziRand == "Robby") {
											b.BonziID = "Robby";
											b.BonziACS = "Robby.acs";
										} else if (b.BonziRand == "Genie") {
											b.BonziID = "Genie";
											b.BonziACS = "Genie.acs";
										} else if (b.BonziRand == "James") {
											b.BonziID = "James";
											b.BonziACS = "JAMES.acs";
										} else if (b.BonziRand == "Clippit") {
											b.BonziID = "Clippit";
											b.BonziACS = "CLIPPIT.acs";
										} else if (b.BonziRand == "F1") {
											b.BonziID = "F1";
											b.BonziACS = "F1.acs";
										} else if (b.BonziRand == "PM_Green") {
											b.BonziID = "PM_Green";
											b.BonziACS = "PM_GREEN.acs";
										} else if (b.BonziRand == "MNATURE") {
											b.BonziID = "MNATURE";
											b.BonziACS = "MNATURE.acs";
										} else if (b.BonziRand == "LOGO") {
											b.BonziID = "LOGO";
											b.BonziACS = "LOGO.acs";
										} else if (b.BonziRand == "Links") {
											b.BonziID = "Links";
											b.BonziACS = "Links.acs";
										} else if (b.BonziRand == "DOT") {
											b.BonziID = "DOT";
											b.BonziACS = "DOT.acs";
										}
									} else {
										b.BonziID = b.color;
										b.BonziACS = b.color + ".acs";
									}
									b.BonziLoaded = false;

									// Purpose:  Runs automatically when page is loaded

									// * INSERT ANY NON-AGENT RELATED SCRIPTING HERE

									AgentControl.Connected = true;

									b.BonziLoaded = b.LoadLocalChar(b.BonziID, b.BonziACS);

									b.SetCharObj();
									b.CheckLoadStatus();
								}, 5000);
							});
							socket.on("joke", function (data) {
								var b = bonzis[data.guid];
								if (!b.mute) {
									b.BonziAgent.Get("state", "Speaking");
									if (b.BonziID == "Merlin") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Robby") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273006}";
									} else if (b.BonziID == "DOT") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "MNATURE") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "LOGO") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Links") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273008}";
									} else if (b.BonziID == "Clippit") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Genie") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "James") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "PM_Green") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Bonzi") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else if (b.BonziID == "Peedy") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									}
									var facts = [
										"What is easy to get into, but hard to get out of? \\pau=500\\ Child support!",
										"Two sausages are in a pan. One looks at the other and says, Boy it's hot in here! and the other sausage says, Unbelievable! It's a talking sausage!  \\pau=500\\ What were you expecting, a dick joke? You're a sick fuck.",
										"How do you grow water in watermelons? Grow another watermelon.",
										"What is in the middle of Paris? A giant inflatable buttplug.",
										"What type of water won't freeze? Your mother's.",
										"Who earns a living by driving his customers away? \\pau=500\\ Nintendo!",
										"What do you call a man who shaves 10 times a day? \\pau=1000\\ A woman.",
										"Why do we call money bread? Because we KNEAD it. \\pit=150\\ Haha please send money to my PayPal at nigerianprince99@bonzi.com",
										"What is a cow that eats grass? ASS. I am a comedic genius, i know.",
									];
									var facts2 = [
										"Yeah, of course " +
											b.userPublic.name +
											" wants me to tell a joke. \\pau=500\\ \\Pit=400\\Hah hah! \\Pit=150\\Look at the stupid " +
											b.userPublic.color +
											" microsoft agent telling jokes! \\Pit=50\\ Fuck you. \\Pit=120\\\\pau=500\\ It isn't funny. \\pau=500\\ But I'll do it anyway. Because you want me to. I hope you're happy.",
										"Wanna hear a joke?  \\pau=500\\ No?  \\pau=500\\ Mute me then. That's your fucking problem.",
										"Senpai " + b.userPublic.name + " wants me to tell a joke.",
										"HEY YOU IDIOTS IT'S TIME FOR A JOKE",
									];
									var facts3 = [
										"You know " + b.userPublic.name + ", a good friend laughs at your jokes even when they're not so funny. \\pau=500\\ And you fucking suck. Thanks",
										"Where do I come up with these? My ass?",
										"Do I amuse you, " +
										b.userPublic.name + 
										"? Am I funny? Do I make you laugh? \\pau=500\\ please respond",
										"Don't judge me on my sense of humor alone. \\pau=500\\ Help! I'm being oppressed!",
										"Laughter is the best medicine! \\pau=500\\ Apart from meth.",
										"Maybe I'll keep my day job, " + b.userPublic.name + ". Patreon didn't accept me.",
									];
									var num = Math.floor(Math.random() * facts2.length);
									var num2 = Math.floor(Math.random() * facts.length);
									var num3 = Math.floor(Math.random() * facts3.length);
									b.BonziAgent.Stop();
									b.BonziAgent.Speak(facts2[num]);
									if (b.BonziID == "Bonzi") {
										b.BonziAgent.Play("MailRead");
									} else if (b.color == "peedy") {
										b.BonziAgent.Play("Announce");
									} else {
										b.BonziAgent.Play("Explain");
									}
									b.BonziAgent.Speak(facts[num2]);
									if (b.BonziID == "Bonzi") {
										b.BonziAgent.Play("MailReturn");
									} else {
										b.BonziAgent.Play("RestPose");
									}
									b.BonziAgent.Speak(facts3[num3]);
								} else {
									console.log(b.userPublic.name + " tried to talk while muted!");
								}
							});
							socket.on("fact", function (data) {
								var b = bonzis[data.guid];
								if (!b.mute) {
									var facts = [
										"Did you know that Yer Anus is 31 thousand 500 and 18 miles in diameter?",
										"Fun Fact: The skript kiddie of this site didn't bother checking if the text that goes into the dialog box is HTML code. \\pau=1000\\ toppest jej",
									];
									var num = Math.floor(Math.random() * facts.length);
									b.BonziAgent.Stop();
									b.BonziAgent.Speak("Hey kids, it's time for a Fun Fact!");
									if (b.BonziID == "Bonzi") {
										b.BonziAgent.Play("Read");
										b.BonziAgent.Play("ReadLookUpContinued");
									} else if (b.color == "peedy") {
										b.BonziAgent.Play("Announce");
									} else {
										b.BonziAgent.Play("Explain");
									}
									b.BonziAgent.Speak(facts[num]);
									if (b.BonziID == "Bonzi") {
										b.BonziAgent.Play("ReadLookUpReturn");
									} else {
										b.BonziAgent.Play("RestPose");
									}
									b.BonziAgent.Speak("o gee whilickers wasn't that sure interesting huh");
								} else {
									console.log(b.userPublic.name + " tried to talk while muted!");
								}
							});
							socket.on("who", function (data) {
								var b = bonzis[data.guid];
								if (!b.mute) {
									b.BonziAgent.Stop();
									b.BonziAgent.Play("Wave");
									b.BonziAgent.Speak("I am " + b.userPublic.name + "!");
									b.BonziAgent.Play("RestPose");
								} else {
									console.log(b.userPublic.name + " tried to talk while muted!");
								}
							});
							socket.on("welcome", function (data) {
								var b = bonzis[data.guid];
								if (!b.mute) {
									b.BonziAgent.Get("state", "Speaking");
									if (b.BonziID == "Merlin") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Robby") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273006}";
									} else if (b.BonziID == "DOT") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "MNATURE") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273009}";
									} else if (b.BonziID == "LOGO") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Links") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273008}";
									} else if (b.BonziID == "Clippit") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273002}";
									} else if (b.BonziID == "Genie") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "James") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "PM_Green") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273000}";
									} else if (b.BonziID == "Bonzi") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else if (b.BonziID == "Peedy") {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									} else {
										b.BonziAgent.TTSModeID = "{CA141FD0-AC7F-11D1-97A3-006008273001}";
									}
									b.BonziAgent.Stop();
									b.BonziAgent.Play("Greet");
									b.BonziAgent.Speak("Hello, " + data.target + ".");
									b.BonziAgent.Play("RestPose");
								} else {
									console.log(b.userPublic.name + " tried to talk while muted!");
								}
							});
							socket.on("merlinbaby", function (data) {
								var b = bonzis[data.guid];
								if (!b.mute) {
									b.BonziAgent.Stop();
									b.BonziAgent.Speak("Hey, " + data.target + "!");
									b.BonziAgent.Speak("You're a merlin baby!");
									b.BonziAgent.Play("Pleased");
								} else {
									console.log(b.userPublic.name + " tried to talk while muted!");
								}
							});
							sockets_defined = true;
						}

                        // *** END MASH USER SCRIPT ***
                    },
                },
                {
                    key: "mousemove",
                    value: function (a) {
						this.drag && (this.move_css(a.pageX - this.drag_start.x, a.pageY - this.drag_start.y), (this.dragged = !0));
                    },
                },
                {
                    key: "move",
                    value: function (a, b) {
                        0 !== arguments.length && ((this.x = a), (this.y = b));
                        var c = this.maxCoords();
                        (this.x = Math.min(Math.max(0, this.x), c.x)), (this.y = Math.min(Math.max(0, this.y), c.y));
                        this.$element.css({ marginLeft: this.x, marginTop: this.y });
						if (this.BonziAgent) {
							this.BonziAgent.MoveTo(this.x+50,this.y+150);
						}
                        BonziHandler.needsUpdate = !0;
                        this.updateDialog();
                    },
                },
                {
                    key: "move_css",
                    value: function (a, b) {
                        0 !== arguments.length && ((this.x = a), (this.y = b));
                        var c = this.maxCoords();
                        (this.x = Math.min(Math.max(0, this.x), c.x)), (this.y = Math.min(Math.max(0, this.y), c.y));
                        this.$element.css({ marginLeft: this.x, marginTop: this.y });
                        BonziHandler.needsUpdate = !0;
                        this.updateDialog();
                    },
                },
                {
                    key: "mouseup",
                    value: function (a, anim) {
						this.drag && (this.move(a.pageX - this.drag_start.x, a.pageY - this.drag_start.y), (this.dragged = !0)), !this.dragged && this.drag && this.cancel(), (this.drag = !1), (this.dragged = !1);
                    },
                },
                {
                    key: "runSingleEvent",
                    value: function (a) {
                        this.mute || this.eventQueue.push(this.eventMake(a));
                    },
                },
                {
                    key: "clearDialog",
                    value: function () {
                        this.$dialogCont.html(""), this.$dialog.hide();
                    },
                },
                {
                    key: "cancel",
                    value: function () {
                        this.clearDialog(), this.stopSpeaking(), (this.eventQueue = [this.eventMake([{ type: "idle" }])]);
                    },
                },
                {
                    key: "retry",
                    value: function () {
                        this.clearDialog(), (this.event.timer = 0);
                    },
                },
                {
                    key: "stopSpeaking",
                    value: function () {
                        this.goingToSpeak = false;
                    },
                },
                {
                    key: "cancelQueue",
                    value: function () {
                        this.willCancel = !0;
                    },
                },
                {
                    key: "updateAnim",
                    value: function () {
                        0 === this.event.timer && this.sprite.gotoAndPlay(this.event.cur().anim), this.event.timer++, (BonziHandler.needsUpdate = !0), this.event.timer >= this.event.cur().ticks && this.eventNext();
                    },
                },
                {
                    key: "updateText",
                    value: function () {
                        0 === this.event.timer && (this.$dialog.css("display", "block"), (this.event.timer = 1), this.talk(this.event.cur().text, this.event.cur().say, !0)), "none" == this.$dialog.css("display") && this.eventNext();
                    },
                },
                {
                    key: "updateIdle",
                    value: function () {
                        var a = "idle" == this.sprite.currentAnimation && 0 === this.event.timer;
                        (a = a || this.data.pass_idle.indexOf(this.sprite.currentAnimation) != -1),
                            a
                                ? this.eventNext()
                                : (0 === this.event.timer && ((this.tmp_idle_start = this.data.to_idle[this.sprite.currentAnimation]), this.sprite.gotoAndPlay(this.tmp_idle_start), (this.event.timer = 1)),
                                  this.tmp_idle_start != this.sprite.currentAnimation && "idle" == this.sprite.currentAnimation && this.eventNext(),
                                  (BonziHandler.needsUpdate = !0));
                    },
                },
                {
                    key: "updateRandom",
                    value: function () {
                        var a = this.event.cur().add,
                            b = Math.floor(a.length * this.rng()),
                            c = this.eventMake(a[b]);
                        this.eventNext(), this.eventQueue.unshift(c);
                    },
                },
                {
                    key: "update",
                    value: function () {
                        if (this.run) {
                            if (
                                (0 !== this.eventQueue.length && this.eventQueue[0].index >= this.eventQueue[0].list.length && this.eventQueue.splice(0, 1), (this.event = this.eventQueue[0]), 0 !== this.eventQueue.length && this.eventRun)
                            ) {
                                var a = this.event.cur().type;
                                try {
                                    this[this.eventTypeToFunc[a]]();
                                } catch (b) {
                                    this.event.index++;
                                }
                            }
                            this.willCancel && (this.cancel(), (this.willCancel = !1)), this.needsUpdate && (this.stage.update(), (this.needsUpdate = !1));
                        }
                    },
                },
                {
                    key: "eventNext",
                    value: function () {
                        (this.event.timer = 0), (this.event.index += 1);
                    },
                },
                {
                    key: "talk",
                    value: function (a, b, c) {
                        hostname = window.location.hostname;
                        var d = this;
                        (c = c || !1),
                            (a = replaceAll(a, "{NAME}", this.userPublic.name)),
                            (a = replaceAll(a, "{COLOR}", this.color)),
                            "undefined" != typeof b ? ((b = replaceAll(b, "{NAME}", this.userPublic.name)), (b = replaceAll(b, "{COLOR}", this.color))) : (b = a.replace("&gt;", "")),
                            (a = linkify(a));
                        var e = "&gt;" == a.substring(0, 4) || ">" == a[0];
                        var talker = bonzis[data.guid];
                        talker.BonziAgent.Speak(say);
                    },
                },
                {
                    key: "joke",
                    value: function () {
                        this.runSingleEvent(this.data.event_list_joke);
                    },
                },
                {
                    key: "fact",
                    value: function () {
                        this.runSingleEvent(this.data.event_list_fact);
                    },
                },
                {
                    key: "exit",
                    value: function (a) {
                        if (this.BonziID == "Clippit" || this.BonziID == "F1" || this.BonziID == "DOT" || this.BonziID == "MNATURE" || this.BonziID == "Links" || this.BonziID == "LOGO") {
                            this.BonziAgent.Play("Goodbye");
                        }
                        this.BonziAgent.Hide();
                    },
                },
                {
                    key: "deconstruct",
                    value: function () {
                        this.stopSpeaking(), BonziHandler.stage.removeChild(this.sprite), (this.run = !1), this.$element.remove();
                    },
                },
                {
                    key: "updateName",
                    value: function () {
                        this.$nametag.text(this.userPublic.name);
                    },
                },
                {
                    key: "youtube_legacy",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "iframe";
                            this.$dialogCont.html(
                                "\n\t\t\t\t\t<" +
                                    b +
                                    ' type="text/html" width="173" height="173" \n\t\t\t\t\tsrc="https://www.youtube.com/embed/' +
                                    a +
                                    '?autoplay=1" \n\t\t\t\t\tstyle="width:173px;height:173px"\n\t\t\t\t\tframeborder="0"\n\t\t\t\t\tallowfullscreen="allowfullscreen"\n\t\t\t\t\tmozallowfullscreen="mozallowfullscreen"\n\t\t\t\t\tmsallowfullscreen="msallowfullscreen"\n\t\t\t\t\toallowfullscreen="oallowfullscreen"\n\t\t\t\t\twebkitallowfullscreen="webkitallowfullscreen"\n\t\t\t\t\t></' +
                                    b +
                                    ">\n\t\t\t\t"
                            ),
                                this.$dialog.show();
                        }
                    },
                },
                {
                    key: "video_legacy",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialogCont.html(
                                "<object type='application/x-shockwave-flash' data='/legacy/video_player.swf' id='vv_player' width='170' height='170'><param name='movie' value='/legacy/video_player.swf'><param name='allowFullScreen' value='true'><param name='FlashVars' value='video_id=" +
                                    a +
                                    "'></object>"
                            ),
                                this.$dialog.show();
                        }
                    },
                },
                {
                    key: "video",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialogCont.html(" <video width='170' loop autoplay controls id='bonziworld-video'><source src='" + a + "' type='video/mp4' loop>Your browser does not support the video tag.</video> "), this.$dialog.show();
                        }
                    },
                },
                {
                    key: "bitview",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialogCont.html("<iframe id='embedplayer' src='http://www.bitview.net/embed.php?v=" + a + "'' width='448' height='382' allowfullscreen scrolling='off' frameborder='0'></iframe>"), this.$dialog.show();
                        }
                    },
                },
                {
                    key: "vlare",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialogCont.html("<iframe width='170' height='170' src='https://vlare.tv/embed/" + a + "/false/true/0' frameborder='0' allowfullscreen></iframe>"), this.$dialog.show();
                        }
                    },
                },
                {
                    key: "img",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialogCont.html("<img width='170' src='" + a + "'></img>"), this.$dialog.show();
                        }
                    },
                },
                {
                    key: "letsplay",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialogCont.html(
                                '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="270" height="270" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" id="AngryBirds" align="top"><param name="allowScriptAccess" value="sameDomain"><param name="allowFullScreen" value="false"><param name="movie" value="angrybirds.swf"><param name="menu" value="false"><param name="quality" value="high"><param name="wmode" value="opaque"><param name="bgcolor" value="#ffffff"><embed src="http://jsimlo.sk/flash/angrybirds/angrybirds.swf" menu="false" quality="high" wmode="opaque" bgcolor="#ffffff" width="270" height="270" name="AngryBirds" align="top" allowscriptaccess="sameDomain" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></object>'
                            ),
                                this.$dialog.show();
                        }
                    },
                },
                {
                    key: "letsplay2",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialogCont.html(
                                '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="270" height="270" id="angry-birds-rio" align="middle" name="gameObj"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="false"><param name="movie" value="http://farm.maxgames.com/angry-birds-rioMTI4Ng==.swf"> <param name="quality" value="autohigh"><param name="wmode" value="direct"><embed src="http://farm.maxgames.com/angry-birds-rioMTI4Ng==.swf" quality="autohigh" wmode="direct" width="270" height="270" name="gameObj" align="middle" allowscriptaccess="always" allowfullscreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer"></object>'
                            ),
                                this.$dialog.show();
                        }
                    },
                },
                {
                    key: "letsplay3",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialogCont.html(
                                '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="270" height="270"><param name="wmode" value="window"><param name="movie" value="//zone.msn.com/bingame/zum2/default/Zuma2Preloader_1_0.swf"><param name="flashvars" value=""><param name="play" value="true"><param name="bgcolor" value="#FFFFFF"><param name="base" value="https://zone.msn.com/binGame/zum2/default"><param name="allowScriptAccess" value="always"><param name="menu" value="false"><embed id="GameObject" name="GameObject" src="https://zone.msn.com/bingame/zum2/default/Zuma2Preloader_1_0.swf" wmode="window" base="/binGame/zum2/default" menu="false" allowscriptaccess="always" flashvars="" play="true" bgcolor="#FFFFFF" width="270" height="270" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" swliveconnect="true"><noembed><blockquote><font face="Lucida Console, Monaco, mono" size="-2"><A href="//www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" target="_self">This site requires Macromedia Flash to be properly installed in a capable browser.<BR> Follow this link, and you\'ll find out everything you need to know.</A></font></blockquote></noembed></object>'
                            ),
                                this.$dialog.show();
                        }
                    },
                },
                {
                    key: "iframe",
                    value: function (a) {
                        if (!this.mute) {
                            var b = "embed";
                            this.$dialogCont.html("<iframe width='170' height='170' src='" + a + "'></iframe>"), this.$dialog.show();
                        }
                    },
                },
                {
                    key: "backflip",
                    value: function (a) {
                        var b = [{ type: "anim", anim: "backflip" }];
                        a && (b.push({ type: "anim", anim: "cool_fwd" }), b.push({ type: "idle" })), this.runSingleEvent(b);
                    },
                },
                {
                    key: "clap",
                    value: function () {
                        var a = [{ type: "anim", anim: "clap_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "clap_clippy",
                    value: function () {
                        var a = [{ type: "anim", anim: "clap_clippy_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "sad",
                    value: function () {
                        var a = [{ type: "anim", anim: "sad_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "think",
                    value: function () {
                        var a = [{ type: "anim", anim: "think_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "wave",
                    value: function () {
                        var a = [{ type: "anim", anim: "wave" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "nod",
                    value: function () {
                        var a = [{ type: "anim", anim: "nod" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "clap_clippy",
                    value: function () {
                        var a = [{ type: "anim", anim: "clap_clippy_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "banana",
                    value: function () {
                        var a = [{ type: "anim", anim: "banana_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "surprised",
                    value: function () {
                        var a = [{ type: "anim", anim: "surprised_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "laugh",
                    value: function () {
                        var a = [{ type: "anim", anim: "laugh_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "shrug",
                    value: function () {
                        var a = [{ type: "anim", anim: "shrug_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "greet",
                    value: function () {
                        var a = [{ type: "anim", anim: "greet_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "write",
                    value: function () {
                        var a = [{ type: "anim", anim: "write_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "write2",
                    value: function () {
                        var a = [{ type: "anim", anim: "write_once_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "write3",
                    value: function () {
                        var a = [{ type: "anim", anim: "write_infinite_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "surf",
                    value: function () {
                        var a = [{ type: "anim", anim: "surf_across_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "swag",
                    value: function () {
                        var a = [{ type: "anim", anim: "cool_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "confused",
                    value: function () {
                        var a = [{ type: "anim", anim: "confused_fwd" }];
                        this.runSingleEvent(a);
                        var a = new Audio("confused.ogg");
                        a.play();
                    },
                },
                {
                    key: "bang",
                    value: function () {
                        var a = [{ type: "anim", anim: "beat_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "earth",
                    value: function () {
                        var a = [{ type: "anim", anim: "earth_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "grin",
                    value: function () {
                        var a = [{ type: "anim", anim: "grin_fwd" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "surfjoin",
                    value: function () {
                        var a = [{ type: "anim", anim: "surf_intro_emote" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "surfleave",
                    value: function () {
                        var a = [{ type: "anim", anim: "surf_away_emote" }];
                        this.runSingleEvent(a);
                    },
                },
                {
                    key: "updateDialog",
                    value: function () {
                        var a = this.maxCoords();
                        this.data.size.x + this.$dialog.width() > a.x
                            ? this.y < this.$container.height() / 2 - this.data.size.x / 2
                                ? this.$dialog.removeClass("bubble-top").removeClass("bubble-left").removeClass("bubble-right").addClass("bubble-bottom")
                                : this.$dialog.removeClass("bubble-bottom").removeClass("bubble-left").removeClass("bubble-right").addClass("bubble-top")
                            : this.x < this.$container.width() / 2 - this.data.size.x / 2
                            ? this.$dialog.removeClass("bubble-left").removeClass("bubble-top").removeClass("bubble-bottom").addClass("bubble-right")
                            : this.$dialog.removeClass("bubble-right").removeClass("bubble-top").removeClass("bubble-bottom").addClass("bubble-left");
                    },
                },
                {
                    key: "maxCoords",
                    value: function () {
                        return { x: this.$container.width() - this.data.size.x, y: this.$container.height() - this.data.size.y - $("#chat_bar").height() };
                    },
                },
                {
                    key: "asshole",
                    value: function (a) {
                        this.runSingleEvent([{ type: "text", text: "Hey, " + a + "!" }, { type: "text", text: "You're a fucking asshole!", say: "your a fucking asshole!" }, { type: "anim", anim: "grin_fwd", ticks: 30 }, { type: "idle" }]);
                    },
                },
                {
                    key: "beggar",
                    value: function (a) {
                        this.runSingleEvent([{ type: "text", text: "Hey, " + a + "!" }, { type: "text", text: "You're a fucking beggar!" }, { type: "anim", anim: "laugh_fwd", ticks: 30 }, { type: "idle" }]);
                    },
                },
                {
                    key: "kiddie",
                    value: function (a) {
                        this.runSingleEvent([{ type: "text", text: "Hey, " + a + "!" }, { type: "text", text: "You're a fucking Kiddie fag!" }, { type: "anim", anim: "laugh_fwd", ticks: 30 }, { type: "idle" }]);
                    },
                },
                {
                    key: "loskyfag",
                    value: function (a) {
                        this.runSingleEvent([{ type: "text", text: "Hey, " + a + "!" }, { type: "text", text: "You're a fucking LoskyFag!" }, { type: "anim", anim: "laugh_fwd", ticks: 30 }, { type: "idle" }]);
                    },
                },
                {
                    key: "logofag",
                    value: function (a) {
                        this.runSingleEvent([
                            { type: "text", text: "Hey, " + a + "!" },
                            { type: "text", text: "You're a fucking LogoFag!", say: "You're a fucking Logo Fag!" },
                            { type: "anim", anim: "laugh_fwd", ticks: 30 },
                            { type: "idle" },
                        ]);
                    },
                },
                {
                    key: "gofag",
                    value: function (a) {
                        this.runSingleEvent([{ type: "text", text: "Hey, " + a + "!" }, { type: "text", text: "You're a fucking Go!Fag!", say: "You're a fucking Go Fag!" }, { type: "anim", anim: "laugh_fwd", ticks: 30 }, { type: "idle" }]);
                    },
                },
                {
                    key: "forcer",
                    value: function (a) {
                        this.runSingleEvent([
                            { type: "text", text: "Hey, " + a + "!" },
                            { type: "text", text: "You're a fucking forcerfag!", say: "You're a fucking forcerfag!" },
                            { type: "anim", anim: "laugh_fwd", ticks: 30 },
                            { type: "idle" },
                        ]);
                    },
                },
                {
                    key: "welcome",
                    value: function (a) {
                        this.runSingleEvent([{ type: "anim", anim: "greet_fwd", ticks: 30 }, { type: "text", text: "Hello, " + a + "." }, { type: "idle" }]);
                    },
                },
                {
                    key: "owo",
                    value: function (a) {
                        this.runSingleEvent([
                            { type: "text", text: "*notices " + a + "'s BonziBulge™* owo", say: "notices " + a + "s bonzibulge" },
                            { type: "text", text: "owo, wat dis? uwu", say: "oh woah, what diss?" },
                        ]);
                    },
                },
                {
                    key: "uwu",
                    value: function (a) {
                        this.runSingleEvent([
                            { type: "text", text: "*notices " + a + "'s BonziBulge™*", say: "notices " + a + "s bonzibulge" },
                            { type: "text", text: "uwu, wat dis? uwu", say: "uwu? what diss?" },
                        ]);
                    },
                },
                {
                    key: "bees",
                    value: function (a) {
                        this.runSingleEvent([
                            { type: "text", text: "According to all known laws" },
                            { type: "anim", anim: "praise_fwd", ticks: 25 },
                            { type: "text", text: "I am an memer who likes BonziBUDDY because of daddy jowtel." },
                            { type: "idle" },
                        ]);
                    },
                },
                {
                    key: "blackhat",
                    value: function (a) {
                        this.runSingleEvent([
                            { type: "anim", anim: "praise_fwd", ticks: 25 },
                            {
                                type: "text",
                                text: "What the fuck did you just fucking say about me, you little asshole?",
                            },
                            { type: "idle" },
                            { type: "anim", anim: "shrug_fwd", ticks: 28 },
                            {
                                type: "text",
                                text: "I'll have you know I graduated top of my class in the black hats, and I've been involved in numerous secret raids on user's PC's, and I have over 300 confirmed PC destructions.",
                            },
                            { type: "idle" },
                            {
                                type: "text",
                                text: "I am trained in JS warfare and I'm the top hacker in the entire Anonymous forces. You are nothing to me but just another target.",
                            },
                            {
                                type: "text",
                                text: "I will hack you the fuck out with precision the likes of which has never been seen before on this game, mark my fucking words.",
                            },
                            { type: "anim", anim: "grin_fwd", ticks: 28 },
                            { type: "idle" },
                            {
                                type: "text",
                                text: "You think you can get away with saying that shit to me over BonziWORLD? Think again, fucker.",
                            },
                            { type: "anim", anim: "earth_fwd", ticks: 30 },
                            {
                                type: "text",
                                text: "As we speak I am contacting my secret network of hackers across the server and your IP is being traced right now so you better prepare for the storm, maggot.",
                            },
                            { type: "idle" },
                            {
                                type: "text",
                                text:
                                    " The storm that wipes out the pathetic little thing you call your PC. You're fucking dead, kid. I can be anywhere, anytime, and I can ban you in over seven hundred ways, and that's just with inspect element.",
                            },
                            {
                                type: "text",
                                text:
                                    "Not only am I extensively trained in javascript commands, but I have access to the entire core of the BonziWORLD source code and I will use it to its full extent to wipe your miserable ass off the face of the game, you little shit.",
                            },
                            { type: "anim", anim: "shrug_fwd", ticks: 28 },
                            {
                                type: "text",
                                text:
                                    "If only you could have known what unholy retribution your little clever asshole command was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn asshole.",
                            },
                            { type: "idle" },
                            {
                                type: "text",
                                text: "I will hack fury all over you and you will be instant banned. You're a fucking asshole, kiddo.",
                            },
                        ]);
                    },
                },
                {
                    key: "sing",
                    value: function (a) {
                        this.runSingleEvent([
                            { type: "text", text: "gee nah bat tuh lee nee", say: '\\Chr="Monotone"\\ \\Map=""\\ \\Pit=98\\ \\Spd=130\\ gee nah \\Pit=62\\ bat \\Pit=65\\ tuh \\Pit=82\\ \\Spd=90\\ lee \\Pit=100\\ \\Spd=50\\ nee' },
                            { type: "text", text: "gee nah bat tuh lee nee", say: '\\Chr="Monotone"\\ \\Map=""\\ \\Pit=98\\ \\Spd=130\\ gee nah \\Pit=62\\ bat \\Pit=65\\ tuh \\Pit=82\\ \\Spd=90\\ lee \\Pit=50\\ \\Spd=50\\ nee' },
                            { type: "text", text: "gee nah bat tuh lee nee", say: '\\Chr="Monotone"\\ \\Map=""\\ \\Pit=98\\ \\Spd=130\\ gee nah \\Pit=62\\ bat \\Pit=65\\ tuh \\Pit=82\\ \\Spd=90\\ lee \\Pit=100\\ \\Spd=50\\ nee' },
                            {
                                type: "text",
                                text: "gee nah bat tuh lee nee",
                                say: "\\Chr='Monotone'\\ \\Map=''\\ \\Pit=98\\ \\Spd=130\\gee nah \\Pit=62\\ bat \\Pit=65\\ tuh \\Pit=82\\ \\Spd=90\\ lee \\Pit=400\\ \\Spd=50\\ nee! \\Chr='Normal'\\",
                            },
                        ]);
                    },
                },
                {
                    key: "muted",
                    value: function (a) {
                        this.runSingleEvent([
                            { type: "text", text: "Hey, " + a + "!", say: "hey, " + a + "!" },
                            { type: "text", text: "MUTED!", say: "muted!" },
                        ]);
                    },
                },
                {
                    key: "updateSprite",
                    value: function (a) {
                        var b = BonziHandler.stage;
                        this.cancel(),
                            b.removeChild(this.sprite),
                            this.colorPrev != this.color && (delete this.sprite, (this.sprite = new createjs.Sprite(BonziHandler.spriteSheets[this.color], a ? "gone" : "idle"))),
                            b.addChild(this.sprite),
                            this.move();
                    },
                },
            ]),
            a
        );
    })(),
    BonziData = {
        size: { x: 200, y: 160 },
        sprite: {
            peedy: {
                frames: { width: 160, height: 128 },
                animations: {
                    idle: 0,
                    surf_across_fwd: [1, 8, "surf_across_still", 0.7],
                    wave: [250, 261, "idle", 0.6],
                    sad_fwd: [237, 241, "sad_still", 0.8],
                    sad_still: 241,
                    think_fwd: [242, 247, "think_still", 0.8],
                    think_still: 247,
                    confused_still: 137,
                    surf_across_still: 8,
                    surf_across_back: { frames: range(8, 12), next: "idle", speed: 0.7 },
                    sad_back: { frames: range(239, 237), next: "idle", speed: 0.8 },
                    confused_fwd: [127, 137, "confused_still", 0.7],
                    think_back: { frames: range(247, 242), next: "idle", speed: 0.8 },
                    confused_back: { frames: range(137, 127), next: "idle", speed: 0.7 },
                    clap_fwd: { frames: [14, 15, 16, 17, 17, 17, 17, 18, 19, 20, 21, 22], next: "clap_still", speed: 0.5 },
                    clap_clippy_fwd: [10, 12, "clap_clippy_still", 1],
                    clap_still: 22,
                    clap_clippy_still: [13, 13, "clap_clippy_still", 1],
                    clap_back: { frames: range(22, 14), next: "idle", speed: 0.6 },
                    surf_intro: { frames: range(45, 23), next: "idle", speed: 0.6 },
                    surf_intro_emote: { frames: range(45, 23), next: "idle", speed: 0.6 },
                    surf_away: [23, 45, "gone", 1],
                    surf_away_emote: [23, 40, "gone_emote", 0.8],
                    gone_emote: [38, 39, "surf_intro_emote"],
                    gone: 39,
                    shrug_fwd: [288, 306, "shrug_still", 0.5],
                    nod: [40, 44, "idle", 0.5],
                    shrug_still: 306,
                    shrug_back: { frames: range(306, 318), next: "idle", speed: 0.5 },
                    earth_fwd: [51, 57, "earth_still", 0.8],
                    earth_still: [58, 80, "earth_still", 0.8],
                    earth_back: [81, 86, "idle", 0.8],
                    look_down_fwd: [87, 90, "look_down_still", 1],
                    look_down_still: 91,
                    look_down_back: { frames: range(90, 87), next: "idle", speed: 1 },
                    lean_left_fwd: [94, 97, "lean_left_still", 1],
                    lean_left_still: 98,
                    lean_left_back: { frames: range(97, 94), next: "idle", speed: 1 },
                    beat_fwd: [101, 103, "beat_still", 0.6],
                    banana_fwd: [344, 354, "idle", 0.6],
                    surprised_fwd: [356, 360, "surprised_still", 0.8],
                    laugh_fwd: [361, 364, "laugh_still", 0.8],
                    write_fwd: [365, 377, "write_still", 0.8],
                    write_once_fwd: [365, 400, "write_once_still", 0.8],
                    write_infinite_fwd: [365, 396, "write_infinite", 0.8],
                    write_infinite: [381, 396, "write_infinite", 0.8],
                    write_still: 377,
                    write_once_still: 401,
                    write_back: { frames: range(378, 366), next: "idle", speed: 0.8 },
                    laugh_back: { frames: range(364, 361), next: "idle", speed: 0.8 },
                    surprised_back: { frames: range(360, 356), next: "idle", speed: 0.8 },
                    laugh_still: [363, 364, "laugh_still", 0.6],
                    surprised_still: 360,
                    banana_fwd: [344, 354, "banana_back", 0.6],
                    banana_back: [350, 344, "idle", 0.6],
                    beat_still: [104, 107, "beat_still", 0.6],
                    beat_back: { frames: range(103, 101), next: "idle", speed: 1 },
                    cool_fwd: [333, 348, "cool_still", 0.5],
                    cool_still: 348,
                    cool_back: { frames: range(348, 333), next: "idle", speed: 0.5 },
                    cool_right_fwd: [348, 352, "cool_right_still", 1],
                    cool_right_still: 352,
                    cool_right_back: { frames: range(352, 348), next: "idle", speed: 1 },
                    cool_left_fwd: [131, 133, "cool_left_still", 1],
                    cool_left_still: 134,
                    cool_left_back: { frames: range(133, 131), next: "cool_still", speed: 1 },
                    cool_adjust: { frames: [124, 123, 122, 121, 120, 135, 136, 135, 120, 121, 122, 123, 124], next: "cool_still", speed: 1 },
                    present_fwd: [137, 141, "present_still", 1],
                    present_still: 142,
                    present_back: { frames: range(141, 137), next: "idle", speed: 1 },
                    look_left_fwd: [143, 145, "look_left_still", 1],
                    look_left_still: 146,
                    look_left_back: { frames: range(145, 143), next: "idle", speed: 1 },
                    look_right_fwd: [149, 151, "look_right_still", 1],
                    look_right_still: 152,
                    look_right_back: { frames: range(151, 149), next: "idle", speed: 1 },
                    lean_right_fwd: { frames: range(158, 156), next: "lean_right_still", speed: 1 },
                    lean_right_still: 155,
                    lean_right_back: [156, 158, "idle", 1],
                    praise_fwd: [159, 163, "praise_still", 1],
                    praise_still: 164,
                    praise_back: { frames: range(163, 159), next: "idle", speed: 1 },
                    greet_fwd: [225, 232, "greet_still", 1],
                    greet_still: 232,
                    greet_back: { frames: range(232, 225), next: "idle", speed: 1 },
                    grin_fwd: [182, 189, "grin_still", 0.6],
                    grin_still: 184,
                    grin_back: { frames: range(184, 182), next: "idle", speed: 0.6 },
                    backflip: [323, 332, "idle", 0.6],
                },
            },
            merlin: {
                frames: { width: 128, height: 128 },
                animations: {
                    idle: 0,
                    surf_across_fwd: [1, 16, "surf_across_still", 0.7],
                    wave: [250, 261, "idle", 0.6],
                    sad_fwd: [237, 241, "sad_still", 0.8],
                    sad_still: 241,
                    think_fwd: [55, 59, "think_still", 0.8],
                    think_still: 59,
                    confused_still: 137,
                    surf_across_still: 16,
                    surf_across_back: { frames: range(16, 1), next: "idle", speed: 0.7 },
                    sad_back: { frames: range(239, 237), next: "idle", speed: 0.8 },
                    confused_fwd: [127, 137, "confused_still", 0.7],
                    think_back: { frames: range(247, 242), next: "idle", speed: 0.8 },
                    confused_back: { frames: range(137, 127), next: "idle", speed: 0.7 },
                    clap_fwd: { frames: [20, 21, 22, 23, 24, 25, 26, 27, 27, 27, 27, 27, 27, 28, 29, 30], next: "clap_still", speed: 0.6 },
                    clap_clippy_fwd: [10, 12, "clap_clippy_still", 1],
                    clap_still: 30,
                    clap_clippy_still: [13, 13, "clap_clippy_still", 1],
                    clap_back: { frames: range(31, 35), next: "idle", speed: 0.6 },
                    surf_intro: { frames: range(50, 40), next: "idle", speed: 0.6 },
                    surf_intro_emote: { frames: range(48, 40), next: "idle", speed: 0.6 },
                    surf_away: [40, 50, "gone", 0.6],
                    surf_away_emote: [40, 50, "gone_emote", 0.6],
                    gone_emote: [38, 39, "surf_intro_emote"],
                    gone: 50,
                    shrug_fwd: [288, 306, "shrug_still", 0.5],
                    nod: [51, 54, "idle", 0.5],
                    shrug_still: 306,
                    shrug_back: { frames: range(306, 318), next: "idle", speed: 0.5 },
                    earth_fwd: [51, 57, "earth_still", 0.8],
                    earth_still: [58, 80, "earth_still", 0.8],
                    earth_back: [81, 86, "idle", 0.8],
                    look_down_fwd: [87, 90, "look_down_still", 1],
                    look_down_still: 91,
                    look_down_back: { frames: range(90, 87), next: "idle", speed: 1 },
                    lean_left_fwd: [94, 97, "lean_left_still", 1],
                    lean_left_still: 98,
                    lean_left_back: { frames: range(97, 94), next: "idle", speed: 1 },
                    beat_fwd: [101, 103, "beat_still", 0.6],
                    banana_fwd: [344, 354, "idle", 0.6],
                    surprised_fwd: [356, 360, "surprised_still", 0.8],
                    laugh_fwd: [361, 364, "laugh_still", 0.8],
                    write_fwd: [365, 377, "write_still", 0.8],
                    write_once_fwd: [365, 400, "write_once_still", 0.8],
                    write_infinite_fwd: [365, 396, "write_infinite", 0.8],
                    write_infinite: [381, 396, "write_infinite", 0.8],
                    write_still: 377,
                    write_once_still: 401,
                    write_back: { frames: range(378, 366), next: "idle", speed: 0.8 },
                    laugh_back: { frames: range(364, 361), next: "idle", speed: 0.8 },
                    surprised_back: { frames: range(360, 356), next: "idle", speed: 0.8 },
                    laugh_still: [363, 364, "laugh_still", 0.6],
                    surprised_still: 360,
                    banana_fwd: [344, 354, "banana_back", 0.6],
                    banana_back: [350, 344, "idle", 0.6],
                    beat_still: [104, 107, "beat_still", 0.6],
                    beat_back: { frames: range(103, 101), next: "idle", speed: 1 },
                    cool_fwd: [333, 348, "cool_still", 0.5],
                    cool_still: 348,
                    cool_back: { frames: range(348, 333), next: "idle", speed: 0.5 },
                    cool_right_fwd: [348, 352, "cool_right_still", 1],
                    cool_right_still: 352,
                    cool_right_back: { frames: range(352, 348), next: "idle", speed: 1 },
                    cool_left_fwd: [131, 133, "cool_left_still", 1],
                    cool_left_still: 134,
                    cool_left_back: { frames: range(133, 131), next: "cool_still", speed: 1 },
                    cool_adjust: { frames: [124, 123, 122, 121, 120, 135, 136, 135, 120, 121, 122, 123, 124], next: "cool_still", speed: 1 },
                    present_fwd: [137, 141, "present_still", 1],
                    present_still: 142,
                    present_back: { frames: range(141, 137), next: "idle", speed: 1 },
                    look_left_fwd: [143, 145, "look_left_still", 1],
                    look_left_still: 146,
                    look_left_back: { frames: range(145, 143), next: "idle", speed: 1 },
                    look_right_fwd: [149, 151, "look_right_still", 1],
                    look_right_still: 152,
                    look_right_back: { frames: range(151, 149), next: "idle", speed: 1 },
                    lean_right_fwd: { frames: range(158, 156), next: "lean_right_still", speed: 1 },
                    lean_right_still: 155,
                    lean_right_back: [156, 158, "idle", 1],
                    praise_fwd: [159, 163, "praise_still", 1],
                    praise_still: 164,
                    praise_back: { frames: range(163, 159), next: "idle", speed: 1 },
                    greet_fwd: [225, 232, "greet_still", 1],
                    greet_still: 232,
                    greet_back: { frames: range(232, 225), next: "idle", speed: 1 },
                    grin_fwd: [182, 189, "grin_still", 0.6],
                    grin_still: 184,
                    grin_back: { frames: range(184, 182), next: "idle", speed: 0.6 },
                    backflip: [323, 332, "idle", 0.6],
                },
            },
            genius: {
                frames: { width: 124, height: 93 },
                animations: {
                    idle: 0,
                    surf_across_fwd: [1, 16, "surf_across_still", 0.7],
                    wave: [250, 261, "idle", 0.6],
                    sad_fwd: [237, 241, "sad_still", 0.8],
                    sad_still: 241,
                    think_fwd: [55, 59, "think_still", 0.8],
                    think_still: 59,
                    confused_still: 137,
                    surf_across_still: 16,
                    surf_across_back: { frames: range(16, 1), next: "idle", speed: 0.7 },
                    sad_back: { frames: range(239, 237), next: "idle", speed: 0.8 },
                    confused_fwd: [127, 137, "confused_still", 0.7],
                    think_back: { frames: range(247, 242), next: "idle", speed: 0.8 },
                    confused_back: { frames: range(137, 127), next: "idle", speed: 0.7 },
                    clap_fwd: { frames: range(30, 51), next: "idle", speed: 0.5 },
                    clap_clippy_fwd: [10, 12, "clap_clippy_still", 1],
                    clap_still: 30,
                    clap_clippy_still: [13, 13, "clap_clippy_still", 1],
                    clap_back: { frames: range(31, 35), next: "idle", speed: 0.6 },
                    surf_intro: { frames: range(53, 51), next: "idle", speed: 0.6 },
                    surf_intro_emote: { frames: range(53, 51), next: "idle", speed: 0.6 },
                    surf_away: [52, 54, "gone", 0.6],
                    surf_away_emote: [52, 54, "gone_emote", 0.6],
                    gone_emote: [38, 39, "surf_intro_emote"],
                    gone: 54,
                    shrug_fwd: [288, 306, "shrug_still", 0.5],
                    nod: [51, 54, "idle", 0.5],
                    shrug_still: 306,
                    shrug_back: { frames: range(306, 318), next: "idle", speed: 0.5 },
                    earth_fwd: [51, 57, "earth_still", 0.8],
                    earth_still: [58, 80, "earth_still", 0.8],
                    earth_back: [81, 86, "idle", 0.8],
                    look_down_fwd: [87, 90, "look_down_still", 1],
                    look_down_still: 91,
                    look_down_back: { frames: range(90, 87), next: "idle", speed: 1 },
                    lean_left_fwd: [94, 97, "lean_left_still", 1],
                    lean_left_still: 98,
                    lean_left_back: { frames: range(97, 94), next: "idle", speed: 1 },
                    beat_fwd: [101, 103, "beat_still", 0.6],
                    banana_fwd: [344, 354, "idle", 0.6],
                    surprised_fwd: [356, 360, "surprised_still", 0.8],
                    laugh_fwd: [361, 364, "laugh_still", 0.8],
                    write_fwd: [365, 377, "write_still", 0.8],
                    write_once_fwd: [365, 400, "write_once_still", 0.8],
                    write_infinite_fwd: [365, 396, "write_infinite", 0.8],
                    write_infinite: [381, 396, "write_infinite", 0.8],
                    write_still: 377,
                    write_once_still: 401,
                    write_back: { frames: range(378, 366), next: "idle", speed: 0.8 },
                    laugh_back: { frames: range(364, 361), next: "idle", speed: 0.8 },
                    surprised_back: { frames: range(360, 356), next: "idle", speed: 0.8 },
                    laugh_still: [363, 364, "laugh_still", 0.6],
                    surprised_still: 360,
                    banana_fwd: [344, 354, "banana_back", 0.6],
                    banana_back: [350, 344, "idle", 0.6],
                    beat_still: [104, 107, "beat_still", 0.6],
                    beat_back: { frames: range(103, 101), next: "idle", speed: 1 },
                    cool_fwd: [333, 348, "cool_still", 0.5],
                    cool_still: 348,
                    cool_back: { frames: range(348, 333), next: "idle", speed: 0.5 },
                    cool_right_fwd: [348, 352, "cool_right_still", 1],
                    cool_right_still: 352,
                    cool_right_back: { frames: range(352, 348), next: "idle", speed: 1 },
                    cool_left_fwd: [131, 133, "cool_left_still", 1],
                    cool_left_still: 134,
                    cool_left_back: { frames: range(133, 131), next: "cool_still", speed: 1 },
                    cool_adjust: { frames: [124, 123, 122, 121, 120, 135, 136, 135, 120, 121, 122, 123, 124], next: "cool_still", speed: 1 },
                    present_fwd: [137, 141, "present_still", 1],
                    present_still: 142,
                    present_back: { frames: range(141, 137), next: "idle", speed: 1 },
                    look_left_fwd: [143, 145, "look_left_still", 1],
                    look_left_still: 146,
                    look_left_back: { frames: range(145, 143), next: "idle", speed: 1 },
                    look_right_fwd: [149, 151, "look_right_still", 1],
                    look_right_still: 152,
                    look_right_back: { frames: range(151, 149), next: "idle", speed: 1 },
                    lean_right_fwd: { frames: range(158, 156), next: "lean_right_still", speed: 1 },
                    lean_right_still: 155,
                    lean_right_back: [156, 158, "idle", 1],
                    praise_fwd: [159, 163, "praise_still", 1],
                    praise_still: 164,
                    praise_back: { frames: range(163, 159), next: "idle", speed: 1 },
                    greet_fwd: [225, 232, "greet_still", 1],
                    greet_still: 232,
                    greet_back: { frames: range(232, 225), next: "idle", speed: 1 },
                    grin_fwd: [182, 189, "grin_still", 0.6],
                    grin_still: 184,
                    grin_back: { frames: range(184, 182), next: "idle", speed: 0.6 },
                    backflip: [323, 332, "idle", 0.6],
                },
            },
            f1: {
                frames: { width: 124, height: 93 },
                animations: {
                    idle: 0,
                    surf_across_fwd: [1, 16, "surf_across_still", 0.7],
                    wave: [250, 261, "idle", 0.6],
                    sad_fwd: [237, 241, "sad_still", 0.8],
                    sad_still: 241,
                    think_fwd: [55, 59, "think_still", 0.8],
                    think_still: 59,
                    confused_still: 137,
                    surf_across_still: 16,
                    surf_across_back: { frames: range(16, 1), next: "idle", speed: 0.7 },
                    sad_back: { frames: range(239, 237), next: "idle", speed: 0.8 },
                    confused_fwd: [127, 137, "confused_still", 0.7],
                    think_back: { frames: range(247, 242), next: "idle", speed: 0.8 },
                    confused_back: { frames: range(137, 127), next: "idle", speed: 0.7 },
                    clap_fwd: { frames: [17, 18, 19, 20, 21, 22, 23, 24, 25, 25, 25, 25, 25, 25], next: "clap_back", speed: 0.6 },
                    clap_clippy_fwd: [10, 12, "clap_clippy_still", 1],
                    clap_still: 30,
                    clap_clippy_still: [13, 13, "clap_clippy_still", 1],
                    clap_back: { frames: [25, 26, 27], next: "idle", speed: 0.4 },
                    surf_intro: { frames: range(622, 588), next: "idle", speed: 0.6 },
                    surf_intro_emote: { frames: range(622, 588), next: "idle", speed: 0.6 },
                    surf_away: [588, 622, "gone", 0.6],
                    surf_away_emote: [588, 622, "gone_emote", 0.6],
                    gone_emote: [622, "surf_intro_emote"],
                    gone: 622,
                    shrug_fwd: [288, 306, "shrug_still", 0.5],
                    nod: [51, 54, "idle", 0.5],
                    shrug_still: 306,
                    shrug_back: { frames: range(306, 318), next: "idle", speed: 0.5 },
                    earth_fwd: [51, 57, "earth_still", 0.8],
                    earth_still: [58, 80, "earth_still", 0.8],
                    earth_back: [81, 86, "idle", 0.8],
                    look_down_fwd: [87, 90, "look_down_still", 1],
                    look_down_still: 91,
                    look_down_back: { frames: range(90, 87), next: "idle", speed: 1 },
                    lean_left_fwd: [94, 97, "lean_left_still", 1],
                    lean_left_still: 98,
                    lean_left_back: { frames: range(97, 94), next: "idle", speed: 1 },
                    beat_fwd: [101, 103, "beat_still", 0.6],
                    banana_fwd: [344, 354, "idle", 0.6],
                    surprised_fwd: [356, 360, "surprised_still", 0.8],
                    laugh_fwd: [361, 364, "laugh_still", 0.8],
                    write_fwd: [365, 377, "write_still", 0.8],
                    write_once_fwd: [365, 400, "write_once_still", 0.8],
                    write_infinite_fwd: [365, 396, "write_infinite", 0.8],
                    write_infinite: [381, 396, "write_infinite", 0.8],
                    write_still: 377,
                    write_once_still: 401,
                    write_back: { frames: range(378, 366), next: "idle", speed: 0.8 },
                    laugh_back: { frames: range(364, 361), next: "idle", speed: 0.8 },
                    surprised_back: { frames: range(360, 356), next: "idle", speed: 0.8 },
                    laugh_still: [363, 364, "laugh_still", 0.6],
                    surprised_still: 360,
                    banana_fwd: [344, 354, "banana_back", 0.6],
                    banana_back: [350, 344, "idle", 0.6],
                    beat_still: [104, 107, "beat_still", 0.6],
                    beat_back: { frames: range(103, 101), next: "idle", speed: 1 },
                    cool_fwd: [333, 348, "cool_still", 0.5],
                    cool_still: 348,
                    cool_back: { frames: range(348, 333), next: "idle", speed: 0.5 },
                    cool_right_fwd: [348, 352, "cool_right_still", 1],
                    cool_right_still: 352,
                    cool_right_back: { frames: range(352, 348), next: "idle", speed: 1 },
                    cool_left_fwd: [131, 133, "cool_left_still", 1],
                    cool_left_still: 134,
                    cool_left_back: { frames: range(133, 131), next: "cool_still", speed: 1 },
                    cool_adjust: { frames: [124, 123, 122, 121, 120, 135, 136, 135, 120, 121, 122, 123, 124], next: "cool_still", speed: 1 },
                    present_fwd: [137, 141, "present_still", 1],
                    present_still: 142,
                    present_back: { frames: range(141, 137), next: "idle", speed: 1 },
                    look_left_fwd: [143, 145, "look_left_still", 1],
                    look_left_still: 146,
                    look_left_back: { frames: range(145, 143), next: "idle", speed: 1 },
                    look_right_fwd: [149, 151, "look_right_still", 1],
                    look_right_still: 152,
                    look_right_back: { frames: range(151, 149), next: "idle", speed: 1 },
                    lean_right_fwd: { frames: range(158, 156), next: "lean_right_still", speed: 1 },
                    lean_right_still: 155,
                    lean_right_back: [156, 158, "idle", 1],
                    praise_fwd: [159, 163, "praise_still", 1],
                    praise_still: 164,
                    praise_back: { frames: range(163, 159), next: "idle", speed: 1 },
                    greet_fwd: [225, 232, "greet_still", 1],
                    greet_still: 232,
                    greet_back: { frames: range(232, 225), next: "idle", speed: 1 },
                    grin_fwd: [182, 189, "grin_still", 0.6],
                    grin_still: 184,
                    grin_back: { frames: range(184, 182), next: "idle", speed: 0.6 },
                    backflip: [323, 332, "idle", 0.6],
                },
            },
            frames: { width: 200, height: 160 },
            animations: {
                idle: 0,
                surf_across_fwd: [1, 8, "surf_across_still", 1],
                wave: [250, 261, "idle", 0.6],
                sad_fwd: [237, 241, "sad_still", 0.8],
                sad_still: 241,
                think_fwd: [242, 247, "think_still", 0.8],
                think_still: 247,
                confused_still: 137,
                surf_across_still: 9,
                surf_across_back: { frames: range(8, 1), next: "idle", speed: 1 },
                sad_back: { frames: range(239, 237), next: "idle", speed: 0.8 },
                confused_fwd: [127, 137, "confused_still", 0.7],
                think_back: { frames: range(247, 242), next: "idle", speed: 0.8 },
                confused_back: { frames: range(137, 127), next: "idle", speed: 0.7 },
                clap_fwd: { frames: range(10, 14), next: "clap_still", speed: 0.8 },
                clap_clippy_fwd: [10, 12, "clap_clippy_still", 1],
                clap_still: [13, 15, "clap_still", 0.8],
                clap_clippy_still: [13, 13, "clap_clippy_still", 1],
                clap_back: { frames: range(15, 10), next: "idle", speed: 0.6 },
                surf_intro: [277, 302, "idle", 0.6],
                surf_intro_emote: [277, 302, "wave", 0.8],
                surf_away: [16, 38, "gone", 0.6],
                surf_away_emote: [16, 38, "gone_emote", 0.8],
                gone_emote: [38, 39, "surf_intro_emote"],
                gone: 39,
                shrug_fwd: [45, 50, "shrug_still", 1],
                nod: [40, 44, "idle", 0.5],
                shrug_still: 50,
                shrug_back: { frames: range(50, 45), next: "idle", speed: 1 },
                earth_fwd: [51, 57, "earth_still", 0.8],
                earth_still: [58, 80, "earth_still", 0.8],
                earth_back: [81, 86, "idle", 0.8],
                look_down_fwd: [87, 90, "look_down_still", 1],
                look_down_still: 91,
                look_down_back: { frames: range(90, 87), next: "idle", speed: 1 },
                lean_left_fwd: [94, 97, "lean_left_still", 1],
                lean_left_still: 98,
                lean_left_back: { frames: range(97, 94), next: "idle", speed: 1 },
                beat_fwd: [101, 103, "beat_still", 0.6],
                banana_fwd: [344, 354, "idle", 0.6],
                surprised_fwd: [356, 360, "surprised_still", 0.8],
                laugh_fwd: [361, 364, "laugh_still", 0.8],
                write_fwd: [365, 377, "write_still", 0.8],
                write_once_fwd: [365, 400, "write_once_still", 0.8],
                write_infinite_fwd: [365, 396, "write_infinite", 0.8],
                write_infinite: [381, 396, "write_infinite", 0.8],
                write_still: 377,
                write_once_still: 401,
                write_back: { frames: range(378, 366), next: "idle", speed: 0.8 },
                laugh_back: { frames: range(364, 361), next: "idle", speed: 0.8 },
                surprised_back: { frames: range(360, 356), next: "idle", speed: 0.8 },
                laugh_still: [363, 364, "laugh_still", 0.6],
                surprised_still: 360,
                banana_fwd: [344, 354, "banana_back", 0.6],
                banana_back: [350, 344, "idle", 0.6],
                beat_still: [104, 107, "beat_still", 0.6],
                beat_back: { frames: range(103, 101), next: "idle", speed: 1 },
                cool_fwd: [108, 124, "cool_still", 0.8],
                cool_still: 125,
                cool_back: { frames: range(124, 108), next: "idle", speed: 0.8 },
                cool_right_fwd: [126, 128, "cool_right_still", 1],
                cool_right_still: 129,
                cool_right_back: { frames: range(128, 126), next: "idle", speed: 1 },
                cool_left_fwd: [131, 133, "cool_left_still", 1],
                cool_left_still: 134,
                cool_left_back: { frames: range(133, 131), next: "cool_still", speed: 1 },
                cool_adjust: { frames: [124, 123, 122, 121, 120, 135, 136, 135, 120, 121, 122, 123, 124], next: "cool_still", speed: 1 },
                present_fwd: [137, 141, "present_still", 1],
                present_still: 142,
                present_back: { frames: range(141, 137), next: "idle", speed: 1 },
                look_left_fwd: [143, 145, "look_left_still", 1],
                look_left_still: 146,
                look_left_back: { frames: range(145, 143), next: "idle", speed: 1 },
                look_right_fwd: [149, 151, "look_right_still", 1],
                look_right_still: 152,
                look_right_back: { frames: range(151, 149), next: "idle", speed: 1 },
                lean_right_fwd: { frames: range(158, 156), next: "lean_right_still", speed: 1 },
                lean_right_still: 155,
                lean_right_back: [156, 158, "idle", 1],
                praise_fwd: [159, 163, "praise_still", 1],
                praise_still: 164,
                praise_back: { frames: range(163, 159), next: "idle", speed: 1 },
                greet_fwd: [225, 232, "greet_still", 1],
                greet_still: 232,
                greet_back: { frames: range(232, 225), next: "idle", speed: 1 },
                grin_fwd: [182, 189, "grin_still", 0.6],
                grin_still: 184,
                grin_back: { frames: range(184, 182), next: "idle", speed: 0.6 },
                backflip: [331, 343, "idle", 0.6],
            },
        },
        to_idle: {
            surf_across_fwd: "surf_across_back",
            sad_still: "sad_back",
            think_still: "think_back",
            think_fwd: "think_back",
            surf_across_still: "surf_across_back",
            clap_fwd: "clap_back",
            confused_still: "confused_back",
            confused_fwd: "confused_back",
            clap_still: "clap_back",
            surf_away_emote: "gone_emote",
            gone_emote: "surf_intro_emote",
            surf_intro_emote: "wave",
            clap_clippy_still: "clap_back",
            clap_clippy_fwd: "clap_back",
            shrug_fwd: "shrug_back",
            greet_fwd: "greet_back",
            shrug_still: "shrug_back",
            greet_still: "greet_back",
            earth_fwd: "earth_back",
            earth_still: "earth_back",
            look_down_fwd: "look_down_back",
            look_down_still: "look_down_back",
            lean_left_fwd: "lean_left_back",
            lean_left_still: "lean_left_back",
            beat_fwd: "beat_back",
            banana_fwd: "banana_back",
            surprised_fwd: "surprised_back",
            surprised_still: "surprised_back",
            laugh_fwd: "laugh_back",
            write_fwd: "write_back",
            write_once_fwd: "write_back",
            write_infinite_fwd: "write_back",
            write_infinite: "write_back",
            write_still: "write_back",
            write_once_still: "write_back",
            laugh_still: "laugh_back",
            beat_still: "beat_back",
            cool_fwd: "cool_back",
            cool_still: "cool_back",
            cool_adjust: "cool_back",
            cool_left_fwd: "cool_left_back",
            cool_left_still: "cool_left_back",
            present_fwd: "present_back",
            present_still: "present_back",
            look_left_fwd: "look_left_back",
            look_left_still: "look_left_back",
            look_right_fwd: "look_right_back",
            look_right_still: "look_right_back",
            lean_right_fwd: "lean_right_back",
            lean_right_still: "lean_right_back",
            praise_fwd: "praise_back",
            praise_still: "praise_back",
            grin_fwd: "grin_back",
            grin_still: "grin_back",
            backflip: "idle",
            idle: "idle",
        },
        pass_idle: ["gone"],
        event_list_joke_open: [
            [{ type: "text", text: "Yeah, of course {NAME} wants me to tell a joke." }],
            [{ type: "text", text: "Anything for you {NAME}." }],
            [{ type: "text", text: "Ok, if you're sure, {NAME}." }],
            [{ type: "text", text: "Sure thing, {NAME}. I've got a funny one." }],
            [{ type: "text", text: "Hello? Does anyone want to hear a joke?" }],
            [{ type: "text", text: "Ok, here goes." }],
            [{ type: "text", text: "{NAME}? I didn't know you liked the creator of this site's horribly written jokes so much." }],
            [{ type: "text", text: "Time for whatever horrible fucking jokes the creator of this site wrote." }],
        ],
        event_list_joke_mid: [
            [
                { type: "text", text: "What is easy to get into, but hard to get out of?" },
                { type: "text", text: "Child support!" },
            ],
            [
                { type: "text", text: "Why do they call HTML HyperText?" },
                { type: "text", text: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" },
                { type: "text", text: "Sorry. I just had an epiphany of my own sad, sad existence." },
            ],
            [
                {
                    type: "text",
                    text: 'Two sausages are in a pan. One looks at the other and says "Boy it\'s hot in here!" and the other sausage says "Unbelievable! It\'s a talking sausage!"',
                    say: "Two sausages are in a pan. One looks at the other and says, Boy it's hot in here! and the other sausage says, Unbelievable! It's a talking sausage!",
                },
                { type: "anim", anim: "shrug_back" },
                { type: "text", text: "What were you expecting? A dick joke? You're a sick fuck." },
            ],
            [
                { type: "text", text: "What is in the middle of Paris?" },
                { type: "text", text: "A giant inflatable buttplug." },
            ],
            [
                { type: "text", text: "What goes in pink and comes out blue?" },
                { type: "text", text: "Me!", say: "Me!" },
            ],
            [
                { type: "text", text: "What type of water won't freeze?" },
                { type: "text", text: "Your mother's." },
            ],
            [
                { type: "text", text: "Who earns a living by driving his customers away?" },
                { type: "text", text: "Nickelodeon!" },
            ],
            [
                { type: "text", text: "What did the digital clock say to the grandfather clock?" },
                { type: "text", text: "Suck my clock." },
            ],
            [
                { type: "text", text: "What do you call a man who shaves 10 times a day?" },
                { type: "text", text: "A woman." },
            ],
            [
                { type: "text", text: "How do you get water in watermelons?" },
                { type: "text", text: "Cum in them." },
            ],
            [{ type: "text", text: "What did Steam say to the gamers on tuesday? Shutting down!" }],
            [
                { type: "text", text: "Why do we call money bread?" },
                { type: "text", text: "Because we KNEAD it. Haha please donate to my paypal nigerianprince99@bonzi.com" },
            ],
            [
                { type: "text", text: "What is a cow that eats grass?" },
                { type: "text", text: "ASS." },
                { type: "text", text: "I'm a comedic genius, i know." },
            ],
        ],
        event_list_joke_end: [
            [
                { type: "text", text: "You know {NAME}, a good friend laughs at your jokes even when they're not so funny." },
                { type: "text", text: "And you fucking suck. Thanks." },
            ],
            [{ type: "text", text: "Where do I come up with these? My ass?" }],
            [{ type: "text", text: "Do I amuse you, {NAME}? Am I funny? Do I make you laugh?" }],
            [{ type: "text", text: "Maybe I'll keep my day job, {NAME}. Patreon didn't accept me." }],
            [
                { type: "text", text: "Laughter is the best medicine!" },
                { type: "text", text: "Apart from meth." },
            ],
            [
                { type: "text", text: "Don't judge me on my sense of humor alone." },
                { type: "text", text: "Help! i'm being oppressed!" },
            ],
        ],
        event_list_fact_open: [
            [{ type: "html", text: "Hey kids, it's time for a Fun Fact&reg;!", say: "Hey kids, it's time for a Fun Fact!" }],
            [
                { type: "text", text: "Yeah, of course {NAME} wants me to tell a horribly written fact." },
                { type: "anim", anim: "praise_fwd" },
                { type: "text", text: '"Haha! look at the stupid {COLOR} monkey telling bad facts!" Fuck you! It isn\'t even funny!' },
                { type: "anim", anim: "praise_back" },
                { type: "text", text: "I'll just do it anyway. Because you want me to. I hope you're happy." },
            ],
        ],
        event_list_fact_mid: [
            [
                { type: "anim", anim: "earth_fwd", ticks: 30 },
                { type: "text", text: "Did you know that Uranus is 31,518 miles (50,724 km) in diameter?", say: "Did you know that Yer Anus is 31 thousand 500 and 18 miles in diameter?" },
                { type: "anim", anim: "earth_back" },
                { type: "anim", anim: "grin_fwd" },
            ],
            [
                { type: "text", text: "Fun Fact: The skript kiddie of this site didn't bother checking if the text that goes into the dialog box is HTML code." },
                { type: "html", text: "<img src='./img/misc/topjej.png'></img>", say: "toppest jej" },
            ],
        ],
        event_list_fact_end: [[{ type: "text", text: "o gee whilickers wasn't that sure intresting huh" }]],
    };
(BonziData.event_list_joke = [
    { type: "add_random", pool: "event_list_joke_open", add: BonziData.event_list_joke_open },
    { type: "anim", anim: "shrug_fwd", ticks: 20 },
    { type: "add_random", pool: "event_list_joke_mid", add: BonziData.event_list_joke_mid },
    { type: "idle" },
    { type: "add_random", pool: "event_list_joke_end", add: BonziData.event_list_joke_end },
    { type: "idle" },
]),
    (BonziData.event_list_fact = [
        { type: "add_random", pool: "event_list_fact_open", add: BonziData.event_list_fact_open },
        { type: "add_random", pool: "event_list_fact_mid", add: BonziData.event_list_fact_mid },
        { type: "idle" },
        { type: "add_random", pool: "event_list_fact_end", add: BonziData.event_list_fact_end },
        { type: "idle" },
    ]),
    (BonziData.event_list_triggered = [
        { type: "anim", anim: "cool_fwd", ticks: 20 },
        {
            type: "text",
            text: "I sexually identify as BonziBUDDY. Ever since I was a young gorilla I dreamed of invading desktops dropping hot sticky tootorals on disgusting PC users.",
            say: "I sexually identify as BonziBUDDY. Ever since I was a young gorilla I dreamed of invading desktops dropping hot sticky tootorals on disgusting PC users.",
        },
        {
            type: "text",
            text: "People say to me that a person being a BonziBUDDY is impossible and that I’m a fucking virus but I don’t care, I’m beautiful.",
            say: "People say to me that a person being a BonziBUDDY is impossible and that I'm a fucking virus but I dont care, I'm beautiful.",
        },
        {
            type: "text",
            text: "I’m having an IT intern install Internet Explorer 6, aquarium screensavers and PC Doctor 2016 on my body. From now on I want you guys to call me “Joel” and respect my right to meme from above and meme needlessly.",
            say: "I'm having an IT intern install Internet Explorer 6, aquarium screensavers and PC Doctor 2016 on my body. From now on I want you guys to call me Joel and respect my right to meme from above and meme needlessly.",
        },
        {
            type: "text",
            text: "If you can’t accept me you’re a gorillaphobe and need to check your file permissions. Thank you for being so understanding.",
            say: "If you cant accept me your a gorillaphobe and need to check your file permissions. Thank you for being so understanding.",
        },
        { type: "idle" },
    ]),
    (BonziData.event_list_linux = [
        { type: "text", text: "I'd just like to interject for a moment. What you’re referring to as Linux, is in fact, BONZI/Linux, or as I’ve recently taken to calling it, BONZI plus Linux." },
        {
            type: "text",
            text:
                "Linux is not an operating system unto itself, but rather another free component of a fully functioning BONZI system made useful by the BONZI corelibs, shell utilities and vital system components comprising a full OS as defined by M.A.L.W.A.R.E.",
        },
        {
            type: "text",
            text:
                "Many computer users run a modified version of the BONZI system every day, without realizing it. Through a peculiar turn of events, the version of BONZI which is widely used today is often called “Linux”, and many of its users are not aware that it is basically the BONZI system, developed by the BONZI Project.",
        },
        {
            type: "text",
            text:
                "There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine’s memes to the other programs that you run. ",
        },
        { type: "text", text: "The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system, such as systemd." },
        {
            type: "text",
            text:
                "Linux is normally used in combination with the BONZI operating system: the whole system is basically BONZI with Linux added, or BONZI/Linux. All the so-called “Linux” distributions are really distributions of BONZI/Linux.",
        },
    ]),
    (BonziData.event_list_pawn = [
        {
            type: "text",
            text:
                "Hi, my name is BonziBUDDY, and this is my website. I meme here with my old harambe, and my son, Clippy. Everything in here has an ad and a fact. One thing I've learned after 17 years - you never know what is gonna give you some malware.",
        },
    ]),
    $(document).ready(function () {
        window.BonziHandler = new (function () {
            return (
                (this.framerate = 1 / 15),
                (this.spriteSheets = {}),
                (this.prepSprites = function () {
                    for (
                        var a = [
                                "black",
                                "blue",
                                "brown",
                                "green",
                                "purple",
                                "bonzi",
                                "magenta",
                                "red",
                                "pink",
                                "yellow",
                                "orange",
                                "white",
                                "dark_purple",
                                "cyan",
                                "glitch",
                                "glitchy",
                                "rainbow",
                                "buggiest",
                                "grey",
                                "soldier",
                                "diogo2",
                                "losky",
                                "unbojih",
                                "unbojihpope",
                                "owner",
                                "guestgal",
                                "clippy",
                                "genie",
                                "merlin",
                                "program",
                                "robot",
                                "kiddie",
                                "invisible",
                                "bruh",
                                "clippypope",
								"donutpope",
                                "pmpope",
                                "qmark",
                                "maxpope",
                                "shitsky",
                                "dunce",
                                "red_clippy",
                                "rover",
                                "pm",
                                "james",
                                "max",
                                "peedy",
                                "pope",
                                "dogpope",
                                "god",
                                "genius",
                                "peedy_pope",
                                "ban",
                                "robby",
                                "diogo",
                                "links",
                                "rocky",
                                "f1",
                            ],
                            b = 0;
                        b < a.length;
                        b++
                    ) {
                        var c = a[b];
                         d = { images: ["./img/bonzi/invisible.png"], frames: BonziData.sprite.frames, animations: BonziData.sprite.animations };
                        this.spriteSheets[c] = new createjs.SpriteSheet(d);
                    }
                }),
                this.prepSprites(),
                (this.$canvas = $("#bonzi_canvas")),
                (this.stage = new createjs.StageGL(this.$canvas[0], { transparent: !0 })),
                (this.stage.tickOnUpdate = !1),
                (this.resizeCanvas = function () {
                    var a = this.$canvas.width(),
                        b = this.$canvas.height();
                    this.$canvas.attr({ width: this.$canvas.width(), height: this.$canvas.height() }), this.stage.updateViewport(a, b), (this.needsUpdate = !0);
                    for (var c = 0; c < usersAmt; c++) {
                        var d = usersKeys[c];
                    }
                }),
                this.resizeCanvas(),
                (this.resize = function () {
                    setTimeout(this.resizeCanvas.bind(this), 1);
                }),
                (this.needsUpdate = !0),
                (this.intervalHelper = setInterval(
                    function () {
                        this.needsUpdate = !0;
                    }.bind(this),
                    1e3
                )),
                (this.intervalMain = setInterval(
                    function () {
                        this.needsUpdate && (this.stage.update(), (this.needsUpdate = !1));
                    }.bind(this),
                    1e3 / 60
                )),
                $(window).resize(this.resize.bind(this)),
                (this.speakList = {}),
                (this.bonzisCheck = function () {
                    for (var a = 0; a < usersAmt; a++) {
                        var b = usersKeys[a];
                        if (b in bonzis) {
                            var c = bonzis[b];
                            var d = usersPublic[b].color;
                            c.color != d && ((c.color = d), c.updateSprite());
                        } else bonzis[b] = new Bonzi(b, usersPublic[b]);
                    }
                }),
                $("#btn_tile").click(function () {
                    for (var a = $(window).width(), b = $(window).height(), c = 0, d = 80, e = 0, f = 0, g = 0; g < usersAmt; g++) {
                        var h = usersKeys[g];
                        bonzis[h].move(e, f), (e += 200), e + 100 > a && ((e = 0), (f += 160), f + 160 > b && ((c += d), (d /= 2), (f = c)));
                    }
                }),
                this
            );
        })();
    }),
    Array.prototype.equals && console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."),
    (Array.prototype.equals = function (a) {
        if (!a) return !1;
        if (this.length != a.length) return !1;
        for (var b = 0, c = this.length; b < c; b++)
            if (this[b] instanceof Array && a[b] instanceof Array) {
                if (!this[b].equals(a[b])) return !1;
            } else if (this[b] != a[b]) return !1;
        return !0;
    }),
    Object.defineProperty(Array.prototype, "equals", { enumerable: !1 });
var loadQueue = new createjs.LoadQueue(),
    loadDone = [],
    loadNeeded = [
        "bonziBlack",
        "bonziBlue",
        "bonziBrown",
        "bonziGreen",
        "bonziPurple",
        "bonziRed",
        "bonziPink",
        "bonziYellow",
        "bonziOrange",
        "bonziWhite",
        "bonziDarkPurple",
        "bright_purple",
        "bright_blue",
        "bright_brown",
        "bright_cyan",
        "bright_green",
        "bright_red",
        "bright_yellow",
        "unbojih", // remove maybe?
        "grey",
        "clippy",
        "cyan",
        "bonziGlitch",
        "bonziAux",
        "SuperOldLegacySince2017WedoNotEvenNeedThisShittyReputationRuiningColour", // remove maybe?
        "bonziPeedy",
        "f1",
        "pm",
        "bonzi",
        "topjej",
        "error",
    ];
$(window).load(function () {
    $("#login_card").show(), $("#login_load").hide(), $("#login_sub").hide(), loadBonzis();
});
var undefined,
    hostname = window.location.hostname,
    socket = io("//" + hostname + ":" + window.location.port),
    usersPublic = {},
    bonzis = {},
    debug = !0;
$(function () {
    $("#login_go").click(loadTest),
        $("#login_room").val(window.location.hash.slice(1)),
        socket.on("achieve", function (a, p) {
            $("#page_achieve").show(), $("#achieve_reason").html(a.reason), (p = new Audio("./js/tada.wav")), p.play();
        }),
        socket.on("ban", function (a) {
            (p = new Audio("ban.wav")), p.play(), $("#page_ban").show(), $("#ban_reason").html(a.reason), $("#ban_end").html(new Date(a.end).toString());
        }),
        socket.on("warning", function (a, p) {
            (p = new Audio("./warning.wav")), p.play(), $("#page_warning").show(), $("#warning_reason").html(a.reason);
        }),
        socket.on("mute", function (a, p) {
            (p = new Audio("./mute.wav")), p.play(), $("#page_mute").show(), $("#mute_reason").html(a.reason), $("#mute_end").html(new Date(a.end).toString());
        }),
        socket.on("kick", function (a, p) {
            (p = new Audio("./kick.wav")), p.play(), $("#page_kick").show(), $("#kick_reason").html(a.reason);
        }),
        socket.on("loginFail", function (a) {
            var b = {
                nameLength: "Name too long.",
                full: "Room is full.",
                cooldown: "On Cooldown: Cannot join a room for 25 seconds.",
                nameMal: "Nice try. Why would anyone join a room named that anyway?", // used for c3ns0rsh1p
                fuckOff:
                    "Ok I fucking hate BonziWORLD reacts. Do you expect us to fucking react to anything in the videos you show us? No. Fucking stop with your shit. It's not funny. Most people will just close the video. The people who won't will just watch. They won't react. Let me ask you this, kiddie: have you ever seen someone react to the video? No. Stop it. It's useless. Why does this trend even exist? These videos flood Youtube when you look up BonziWORLD. I hate you for even mentioning BonziWORLD reacts. Go get a fucking life.",
                TooMany: "You're already logged in!",
            };
            $("#login_card").show(),
                $("#login_load").hide(),
                (document.getElementById("page_login").style.cursor = "not-allowed"),
                $("#login_error")
                    .show()
                    .text("Error: " + b[a.reason] + " (" + a.reason + ")");
        }),
        socket.on("disconnect", function (a) {
            errorFatal();
        });
});
var usersAmt = 0,
    usersKeys = [];
$(window).load(function () {
    document.addEventListener("touchstart", touchHandler, !0), document.addEventListener("touchmove", touchHandler, !0), document.addEventListener("touchend", touchHandler, !0), document.addEventListener("touchcancel", touchHandler, !0);
});
