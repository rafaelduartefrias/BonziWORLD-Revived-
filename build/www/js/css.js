function theme(a){
    document.getElementById("theme").innerHTML=a
}

window.onload = function(){
    socket.on("css",function(data){
        let button = document.createElement("button")
        button.title = data.css
        button.innerHTML = "Style BonziWorld"
        button.onclick = function(){
            let style = document.createElement("style")
            style.innerHTML = this.title
            document.head.appendChild(style)
        }
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].appendChild(button)
    })
    $.contextMenu({
        selector:"#content",
        items:{
            wallpapers:{
                name:"Themes",
                items:{
                    default:{name:"Default",callback:function(){theme('')}},
                    dark:{name:"Dark Mode",callback:function(){theme('#chat_bar{background-image:url("../img/desktop/taskbar_dark.png")}#chat_send{background-image:url("../img/desktop/start_dark.png")}#chat_tray{background-image:url("../img/desktop/notif_left_dark.png"), url("../img/desktop/notif_dark.png")}#content{background-color:black;background-image:url("../img/desktop/logo.png"), url("../img/desktop/bg_dark.png")}')}},
                    acid:{name:"Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}canvas{animation:sex 5s linear infinite}')}},
                    sacid:{name:"Super Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}body{animation:sex 1s linear infinite}')}},
                   terminal:{name:"TERMINAL",callback:function(){theme('.bubble,.bonzi_name,.bubble::after{background:0!important;border:0}*{color:green!important;font-family:monospace!important}#content{background:#000}.bubble-content::before{content:">"}.bonzi_name{padding:0;position:static}.bubble{overflow:visible}.bubble-left{right:0px}input[type=text]{background-color:#000;border:0}#chat_send,#chat_tray{display:none}#chat_bar{background:0}')}},
                    xp:{name:"Windows XP",callback:function(){theme('#content{background:url("./img/desktop/bg_xp.png")}#chat_bar{background:url("./img/desktop/taskbar_xp.png")}#chat_tray{display:none}#chat_send{background:url("./img/desktop/start_xp.png")}')}},
                    mxp:{name:"Windows XP Media Center Edition",callback:function(){theme('#content{background:url("./img/desktop/bg_mediaxp.png")}#chat_bar{background:url("./img/desktop/taskbar_mediaxp.png")}#chat_tray{display:none}#chat_send{background:url("./img/desktop/start_mediaxp.png")}')}},
                    zunexp:{name:"Zune",callback:function(){theme('#content{background:url("./img/desktop/bg_zune.png")}#chat_bar{background:url("./img/desktop/zune_taskbar.png")}#chat_tray{display:none}#chat_send{background:url("./img/desktop/zune_start.png")}')}},
                    royalexp:{name:"Royale Noir",callback:function(){theme('#content{background:url("./img/desktop/bg_royalenoir.png")}#chat_bar{background:url("./img/desktop/notif_royalenoir.png")}#chat_tray{display:none}#chat_send{background:url("./img/desktop/start_royalenoir.png")}')}},
                }
            },
            update:{
                name:"See Updates",
                callback:function(){socket.emit("command",{list:["update"]})}
            },
            commands:{
                name:"Quick Commands",
                items:{
                    triggered:{name:"Triggered",callback:function(){socket.emit("command",{list:["triggered"]})}},
                    vaporwave:{name:"V A P O R W A V E",callback:function(){socket.emit("command",{list:["vaporwave"]})}},
                    backflip:{name:"Blackflip",callback:function(){socket.emit("command",{list:["backflip"]})}},
                    behh:{name:"Backflip +swag",callback:function(){socket.emit("command",{list:["backflip","swag"]})}},
                    wtf:{name:"wtf",callback:function(){socket.emit("command",{list:["wtf"]})}},
                    pope:{name:"POPE",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["pope"]})}},
                    god:{name:"GOD",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["god"]})}},
                }
            }
        }
    })
    socket.on("admin",function(){
        admin = true;
    })
    socket.on("sendraw",function(data){
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].textContent = data.text
    })
}
