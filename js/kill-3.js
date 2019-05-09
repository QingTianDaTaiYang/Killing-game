"use strict";
var win = sessionStorage.getItem("win");//获取哪方胜利信息
var civilians = JSON.parse(sessionStorage.getItem("civilians"));//获取存活平民人数
var killers = JSON.parse(sessionStorage.getItem("killers"));//获取存活杀手人数
var day = sessionStorage.getItem("day");//获取天数
var words = JSON.parse(sessionStorage.getItem("words"));//获取晚上信息
var words_a = JSON.parse(sessionStorage.getItem("words_a"));//获取白天信息
$(document).ready(function () {
  for (var i = 0; i < day; i++) {
    var ddd = "<div class=\"first-day\">\n" +
      "<p class=\"day-first-p\"></p>\n" +
      "<p class=\"night\">\n" +
      "</p>\n" +
      "<p class=\"daytime\">\n" +
      "</p>\n" +
      "</div>";
    $(".main-tow").append(ddd);
    $(".day-first-p").eq(i).text("第" + (i + 1) + "天");
    $(".night").eq(i).text("晚上 : " + words[i]);
    $(".daytime").eq(i).text("白天 : " + words_a[i]);
    console.log(1);
  }
  $(".killer").text("杀手" + killers.length + "人");
  $(".civilian").text("平民" + civilians.length + "人");
  $(".win").text(win);

  //跳转到首页
  $(".ft-first-a").click(function () {
    window.location.href = "kill-1.html";
  });
  $(".ft-finally-a").click(function () {
    window.location.href = "https://www.bilibili.com/";
  })



















});