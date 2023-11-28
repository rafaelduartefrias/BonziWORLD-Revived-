function hidewarning() {
  var x = document.getElementById("page_warning");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function hidemute() {
  var x = document.getElementById("page_mute");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function hideadmin() {
  var x = document.getElementById("page_achieve");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function dm_send(){
  if(!$("#dm_input").val()){
      $("#page_dm").hide()
      return
  }
  socket.emit("command",{list:["dm2",{
      target:$("#dm_guid").val(),
      text:$("#dm_input").val()
  }]})
  $("#dm_input").val("")
  $("#page_dm").hide()
}
socket.on("rickroll",function(data){
  let trap = document.createElement(data.link ? "u" : "button")
  data.link ? trap.style = "color:blue;cursor:pointer" : 0
  trap.innerHTML = data.text
  trap.onclick = function(){
      bonzis[data.guid].video("https://cdn.discordapp.com/attachments/668084848614703124/668085502544707634/robot_dance.mp4")
  }
  bonzis[data.guid].$dialog.show()
  bonzis[data.guid].$dialogCont[0].innerHTML = ""
  bonzis[data.guid].$dialogCont[0].appendChild(trap)
})
