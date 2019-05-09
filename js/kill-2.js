"use strict";
var players = JSON.parse(sessionStorage.getItem("players"));//三种状态
var day = sessionStorage.getItem("day");//获取天数
var nnn = sessionStorage.getItem("index_a");
var words_a = JSON.parse(sessionStorage.getItem("words_a"));
var index = sessionStorage.getItem("index");
console.log(words_a);
$(document).ready(function () {
  //页面头部跳转
  $(".header-right").click(function () {
    if (confirm("确定结束游戏吗？") === true) {
      window.location.href = "kill-1.html";
    }
  });
  //页尾按钮跳转
  // $(".footer-btn-q").click(function(){
  //     window.location.href = "kill-judge.html";
  // });


  //获取内容
  for (var i = 0; i < players.length; i++) {
    var bbb = "<div class=\"option relative\">" + "<p class=\"option-top-p cen-cen\">" + players[i].role + "</p>" +
      "<p class=\"option-bottom-p cen-cen\">" + players[i].num + "</p>" + "<div class=\"knife absolute cen-cen\">" +
      "<img src=\"img/dao.png\" alt=\"图片\">" +
      "</div>" + "</div>";
    $(".main").append(bbb);//把 bbb 中的内容插入进 .main 中
    if (players[i].state === "die") {
      $(".option-top-p").eq(i).css("backgroundColor", "#5a6268");
      $(".option-bottom-p").eq(i).css("backgroundColor", "#5a6268");
    }
  }

  // if(players[index].state==="die"){//如果杀人了，则在这个页面修改被杀玩家的样式
  //     $(".option-top-p").eq(sessionStorage.getItem("index")).css("backgroundColor", "#5a6268");
  //     $(".option-bottom-p").eq(sessionStorage.getItem("index")).css("backgroundColor", "#5a6268");
  // }
  //创建两个空数组放平民和杀手。用来判断输赢
  var civilians = [], killers = [];
  $(".knife").hide();//小刀全部隐藏
  $(".option").click(function () {
    $(".knife").hide();//点击另一个盒子后，原来的盒子出现的刀隐藏
    var index_a = $(".option").index(this);//获取玩家盒子下标。加了“a”用来区别杀人页面的index。
    $(".knife").eq(index_a).show();//通过指定下标显示指定的小刀
    //选择杀人
  });
  $(".knife").click(function () {//点击小刀杀人
    var index_a = $(".knife").index(this);//获取小刀下标，让系统知道选中哪一个小刀。
    if (players[index_a].role === "幽灵") {//判断选择杀死的人是不是“杀手”，不是则执行下一步
      if (confirm("确定要干掉他吗？") === true) {
        sessionStorage.setItem("index_a", index_a);
        console.log(index_a);
        players[index_a].state = "die";//改变被杀玩家的状态
        sessionStorage.setItem("players", JSON.stringify(players));
        $(".option-top-p").eq(index_a).css("backgroundColor", "#5a6268");
        $(".option-bottom-p").eq(index_a).css("backgroundColor", "#5a6268");
        $(".knife").off("click");//取消小刀的点击效果，让小刀的点击事件只执行一次。
        words_a.push((parseInt(index_a) + 1) + "号被杀死，真实身份是" + players[index_a].role);
        sessionStorage.setItem("words_a", JSON.stringify(words_a));
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
        // //设置按钮跳转
        $(".footer-btn-q").click(function () {
          if (killers.length >= civilians.length) {
            sessionStorage.setItem("win", "杀手胜利");
            alert("杀手获得胜利");
            window.location.href = "kill-3.html";
          }
          else if (killers.length === 0) {
            sessionStorage.setItem("win", "平民胜利");
            alert("平民获得胜利");
            window.location.href = "kill-3.html";
          }
          else if (players[index_a].state === "die") {
            day++;//天数自增
            sessionStorage.setItem("day", day);//存储天数
            window.location.href = "kill-judge.html";
          }
        });
      }
    }
    else if (players[index_a].state === "die") {
      alert("请不要重复杀人");
    }
    else if (confirm("确定要干掉他吗？") === true) {
      //下面这部分跟上面的if部分一样，都是点击后修改状态
      sessionStorage.setItem("index_a", index_a);
      console.log(index_a);
      players[index_a].state = "die";//改变被杀玩家的状态
      sessionStorage.setItem("players", JSON.stringify(players));
      $(".option-top-p").eq(index_a).css("backgroundColor", "#5a6268");
      $(".option-bottom-p").eq(index_a).css("backgroundColor", "#5a6268");
      $(".knife").off("click");//取消小刀的点击效果，让小刀的点击事件只执行一次。
      words_a.push((parseInt(index_a) + 1) + "号被杀死，真实身份是" + players[index_a].role);
      sessionStorage.setItem("words_a", JSON.stringify(words_a));
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
      // //设置按钮跳转
      $(".footer-btn-q").click(function () {
        if (killers.length >= civilians.length) {
          sessionStorage.setItem("win", "杀手胜利");
          alert("杀手获得胜利");
          window.location.href = "kill-3.html";
        }
        else if (killers.length === 0) {
          sessionStorage.setItem("win", "平民胜利");
          alert("平民获得胜利");
          window.location.href = "kill-3.html";
        }
        else if (players[index_a].state === "die") {
          day++;//天数自增
          sessionStorage.setItem("day", day);//存储天数
          window.location.href = "kill-judge.html";
        }

      });
    }
  });

});