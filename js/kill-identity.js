"use strict";
var slayerPeople = sessionStorage.getItem("slayerPeople");//接受杀手人数
var civilian = sessionStorage.getItem("civilian");//接受平民人数
var input_number = sessionStorage.getItem("input_number");//接受总人数
console.log(slayerPeople);
console.log(civilian);
console.log(input_number);

//顶部两按钮设置跳转
function player() {
  window.location.href = "kill-player.html";
}
function home() {
  var a = confirm("确定要结束游戏吗？");
  if (a === true) {
    window.location.href = "kill-1.html";
    // console.log(1);//当代码不起作用时，可以用来检测有没有执行
  }
}

//获取幽灵与平民的数组
var sum = [];

for (var i = 0; i < slayerPeople; i++) {
  sum.push("幽灵");
}
console.log(sum);
for (var u = 0; u < civilian; u++) {
  sum.push("平民");
}

//数组乱序
~function disorder() {
  for (var i = 0; i < sum.length; i++) {
    var ccc = Math.floor(Math.random() * sum.length);
    var ddd = sum[ccc];
    sum[ccc] = sum[i];
    sum[i] = ddd;
  }
}();
console.log(sum);
sessionStorage.setItem("headcount", JSON.stringify(sum));
//点击按钮内容改变
var draw = document.getElementsByClassName("draw-p")[0];//图片下方的文字
var boy = document.getElementsByClassName("img-boy")[0];//翻牌前图片
var girl = document.getElementsByClassName("img-girl")[0];//翻牌后图片
var number = document.getElementsByClassName("main-number")[0];//图片上方的文字
var btn = document.getElementsByClassName("btn-p-q")[0];//下方按钮


$(document).ready(function () {
  var label = 1, status = 0;
  $(".footer-btn-q").click(function () {
    switch (status) {
      case 0://处于皇上翻牌状态（点击去到女孩出现状态）
        boy.style.display = "none";
        girl.style.display = "block";
        draw.innerHTML = sum[label - 1];
        status = 1;//实现点击后换状态
        label++;//在此状态下点击序号加1
        if (label < sum.length + 1) {
          btn.innerHTML = "隐藏并传递给" + label + "号";
        }
        else {
          btn.innerHTML = "法官查看";
          status = 2;
        }
        break;
      case 1://处于女孩出现状态（点击去到皇上翻牌状态）
        boy.style.display = "block";
        girl.style.display = "none";
        draw.innerHTML = "";
        status = 0;//实现点击后换状态
        if (label < sum.length + 1) {
          number.innerHTML = label;//在此状态下点击改变圆圈序号
          btn.innerHTML = "查看" + label + "号身份";
        }
        break;
      case 2://处于准备法官查看状态（点击去到法官查看页面）
        if (confirm("请把手机交给法官")) {
          location.href = "kill-judge-to-see.html";
        }
    }
  });
  //有瑕疵，跳转到最后会有 undefined 一闪而过
  // var x = 2;
  // var num = 1;
  //
  // //状态机内容
  // var fsm = {
  //     state:"翻牌",
  //     transition:function() {
  //         if(x>sum.length){
  //             this.state = "法官查看";
  //         }
  //         if(num>sum.length) {
  //             alert("请将手机交给法官");
  //             window.location.href="kill-judge-to-see.html";
  //         }
  //         switch(this.state/*fsm.state*/){
  //             case ("查看"):
  //                 this.state = "翻牌";
  //                 draw.innerHTML = "";
  //                 boy.style.display = "block";
  //                 girl.style.display = "none";
  //                 number.innerHTML = num;
  //                 btn.innerHTML = "查看"+ x +"号身份";
  //                 x++;
  //                 break;
  //             case("翻牌"):
  //                 this.state = "查看";
  //                 draw.innerHTML = sum[num-1];
  //                 boy.style.display = "none";
  //                 girl.style.display = "block";
  //                 number.innerHTML = num;
  //                 btn.innerHTML = "隐藏并传递给"+ x +"号";
  //                 num++;
  //                 break;
  //             case("法官查看"):
  //                 draw.innerHTML = sum[num-1];
  //                 boy.style.display = "none";
  //                 girl.style.display = "block";
  //                 number.innerHTML = num;
  //                 btn.innerHTML = "法官查看";
  //                 num++;
  //                 break;
  //         }
  //         console.log(this.state);
  //         console.log(x);
  //         console.log(num);
  //     }

  // };
  // $(".footer-btn-q").click(function(){
  //     fsm.transition();
  // });

});
