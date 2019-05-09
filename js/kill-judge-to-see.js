"use strict";
//接受参数
var arr = sessionStorage.getItem("headcount");
var nums = JSON.parse(arr);//用 JSON.parse(arr) 转出字符串
console.log(nums[0]);

//设置页头上方两个按钮跳转
function player() {
  window.location.href = "kill-identity.html";
}
function home() {
  var a = confirm("确定要结束游戏吗？");
  if (a === true) {
    window.location.href = "kill-1.html";
  }
}

//动态设置内容
//         $(function box(){
//             for(var i = 0;i<nums.length; i++){
//             // var bbb = document.getElementsByClassName("main");
//             var bbb = "<div class=\"option\">"+ "<p class=\"option-top-p cen-cen\">"+ nums[i] +"</p>"+
//                 "<p class=\"option-bottom-p cen-cen\">"+ (i+1) +"</p>"+"</div>";
//             $(".main").append(bbb);
//             }
//         });
$(document).ready(function () {

  for (var c = 0; c < nums.length; c++) {
    // var bbb = document.getElementsByClassName("main");
    var bbb = "<div class=\"option\">" + "<p class=\"option-top-p cen-cen\">" + nums[c] + "</p>" +
      "<p class=\"option-bottom-p cen-cen\">" + (c + 1) + "</p>" + "</div>";
    $(".main").append(bbb);
  }

  //将三种状态放在全部对象中
  var players = [];
  for (var i = 0; i < nums.length; i++) {
    players[i] = {
      role: nums[i],//角色
      num: i + 1,//序号
      state: "live"//状态
    }
  }
  sessionStorage.setItem("state", "living");
  sessionStorage.setItem("players", JSON.stringify(players));//存储三种状态
  sessionStorage.setItem("day", 1);//给下个页面定义初始天数
  var words = [];//创建一个空数组用来给下一个页面存放两个事件的说明
  sessionStorage.setItem("words", JSON.stringify(words));
  var words_a = [];
  sessionStorage.setItem("words_a", JSON.stringify(words_a));
});



//页面底部按钮跳转
function button() {
  window.location.href = "kill-judge.html";
}
