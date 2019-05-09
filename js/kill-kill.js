"use strict";
//接受参数
// var arr = sessionStorage.getItem("headcount");
var nums = JSON.parse(sessionStorage.getItem("headcount"));//用 JSON.parse(arr) 转出字符串
var players = JSON.parse(sessionStorage.getItem("players"));//三种状态
var words = JSON.parse(sessionStorage.getItem("words"));//存放事件描述的数组
var words_a = JSON.parse(sessionStorage.getItem("words_a"));//存放白天事件
console.log(words);

//设置页头右上方两个按钮跳转

function home() {
  var a = confirm("确定要结束游戏吗？");
  if (a === true) {
    window.location.href = "kill-1.html";
  }
}
// //页面底部按钮跳转
// function button(){
//     window.location.href = "kill-judge.html";
// }
$(document).ready(function () {
  //动态设置内容
  for (var i = 0; i < players.length; i++) {
    var bbb = "<div class=\"option relative\">" + "<p class=\"option-top-p cen-cen\">" + players[i].role + "</p>" +
      "<p class=\"option-bottom-p cen-cen\">" + players[i].num + "</p>" + "<div class=\"knife absolute cen-cen\">" +
      "<img src=\"img/dao.png\" alt=\"图片\">" +
      "</div>" + "</div>";
    $(".main").append(bbb);//把 bbb 中的内容插入进 .main 中
    //设置死人CSS颜色
    if (players[i].state === "die") {
      $(".option-top-p").eq(i).css("backgroundColor", "#5a6268");
      $(".option-bottom-p").eq(i).css("backgroundColor", "#5a6268");
    }
  }

  var index = -1;//之所以不设置为-1，是因为，页脚按钮跳转的判断条件：如果数组里的下标为-1则会报错。
  sessionStorage.setItem("index", "-1");//这里不存的话，底部按钮跳转条件就无法执行了

  $(".knife").hide();//小刀全部隐藏
  $(".option").click(function () {
    $(".knife").hide();//点击另一个盒子后，原来的盒子出现的刀隐藏
    var index = $(".option").index(this);//获取玩家盒子下标
    $(".knife").eq(index).show();//通过指定下标显示指定的小刀
    //选择杀人
  });

  //创建两个空数组放平民和杀手。用来判断输赢
  var civilians = [], killers = [];

  $(".knife").click(function () {
    index = $(".knife").index(this);//获取小刀下标，让系统知道选中哪一个小刀。
    // sessionStorage.setItem("index",index);//不能在这存，因为还没杀人呢。点一下就存了，后面就会执行错误
    if (players[index].role !== "幽灵" && players[index].state === "live") {//判断选择杀死的人是不是“杀手”，不是则执行下一步
      if (confirm("确定要干掉他吗？") === true) {
        sessionStorage.setItem("index", index);//存下标
        console.log(index);
        players[index].state = "die";//改变被杀玩家的状态
        sessionStorage.setItem("players", JSON.stringify(players));
        $(".option-top-p").eq(index).css("backgroundColor", "#5a6268");
        $(".option-bottom-p").eq(index).css("backgroundColor", "#5a6268");
        $(".knife").off("click");//取消小刀的点击效果，让小刀的点击事件只执行一次。
        words.push((index + 1) + "号被杀死，真实身份是" + players[index].role);
        console.log(words);
        sessionStorage.setItem("words", JSON.stringify(words));
        //存放平民和杀手。用来判断输赢
        for (i = 0; i < players.length; i++) {
          if (players[i].state === "live" && players[i].role === "平民") {
            civilians.push(players[i].role);
          }
          else if (players[i].state === "live" && players[i].role === "幽灵") {
            killers.push(players[i].role);
          }
        }
        sessionStorage.setItem("civilians", JSON.stringify(civilians));
        sessionStorage.setItem("killers", JSON.stringify(killers));
      }
    }
    else if (players[index].state === "die") {
      alert("请不要重复杀人");
    }
    else {//如果选择杀:杀手
      alert("杀手不能杀自己");
    }
  });
  $(".footer-btn-q").click(function () {
    if (index === -1) {
      if (confirm("确定本轮不杀人吗") === true) {
        words.push("昨晚没有死人");
        console.log(words);
        sessionStorage.setItem("words", JSON.stringify(words));
        window.location.href = "kill-judge.html";
      }
    }
    else if (players[index].state === "die") {
      if (killers.length >= civilians.length) {
        sessionStorage.setItem("win", "杀手胜利");
        words_a.push("游戏已经在晚上结束了");
        sessionStorage.setItem("words_a", JSON.stringify(words_a));
        alert("杀手获得胜利");
        window.location.href = "kill-3.html";
      }
      else if (killers.length === 0) {
        sessionStorage.setItem("win", "平民胜利");
        words_a.push("游戏已经在晚上结束了");
        sessionStorage.setItem("words_a", JSON.stringify(words_a));
        alert("平民获得胜利");
        window.location.href = "kill-3.html";
      }
      else {
        window.location.href = "kill-judge.html";
      }
    }
    else {
      if (confirm("确定本轮不杀人吗") === true) {
        words.push("昨晚没有死人");
        console.log(words);
        sessionStorage.setItem("words", JSON.stringify(words));
        window.location.href = "kill-judge.html";
      }
    }
  });


});




