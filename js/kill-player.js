"use strict";
function home() {//返回上一页
  // window.history.back(-1);
  window.location.href = "kill-1.html";
}
//把滑动块的值传递给输入框
function myRange() {
  var x = document.getElementById("range").value;
  document.getElementById("number-inputs").value = x;
  // console.log(x);
  people();//配置玩家数量
}
function add() {//点击按钮value值加一
  var x = document.getElementById("range").value;
  if (x < 18) {
    x++;
  } else {
    x = 18;
  }
  document.getElementById("range").value = x;
  document.getElementById("number-inputs").value = x;
  // console.log(x);
  people();//配置玩家数量
  // var a = document.getElementById("range").value;
  // if(a === 5) {
  //     a = 5-1;
  //     document.getElementById("civilian").innerHTML = a;
  // }
  //     else if(a=6){
  //         var b = 1;
  //         b++;
  //         document.getElementById("slayer").innerHTML = b;
  //     }
}
function cut() {//点击按钮value值减一
  var x = document.getElementById("range").value;
  if (x > 4) {
    x--;
  } else {
    x = 4;
  }
  document.getElementById("range").value = x;
  document.getElementById("number-inputs").value = x;
  console.log(x);
  people();
}

//配置玩家数量
function people() {
  var x = document.getElementById("range").value;
  document.getElementById("civilian").innerHTML = Math.ceil(x * 2 / 3);
  document.getElementById("slayer").innerHTML = Math.floor(x / 3);
  console.log(x);
}

// //玩家数量与滑动块关联（onchange事件）
// function myNumeber() {
//     var x = document.getElementById("number-inputs").value;
//     document.getElementById("range").value = x;
//     console.log(x);
// }//功能与下方的onblur事件部分功能重合
function myOnKeyUp() {//玩家数量与滑动块关联
  var x = document.getElementById("number-inputs");
  var a = document.getElementById("range");
  if (4 <= x.value && x.value <= 18) {
    a.value = x.value;
    console.log(a);
  } else {
    x.value = null;
    alert("请输入4~18的数字");
    console.log(x);
  }
  people();
}

//上面那个是用onblur事件做的，这个是用onchange事件做的，都是相同的内容，结果也是相同的。
// function myNumeber() {
//     var x = document.getElementById("number-inputs");
//     var a = document.getElementById("range");
//     if( 4 <= x.value && x.value <= 18) {
//         a.value = x.value;
//         console.log(a);
//     }else {
//         x.value = a.value;
//         alert ("请输入4~18的数字");
//         console.log(x);
//     }
//     people();
// }
function set() {
  var x = document.getElementById("number-inputs");
  var a = document.getElementById("range");
  if (4 <= x.value && x.value <= 18) {
    a.value = x.value;
    console.log(a);
  } else {
    x.value = 4;
    a.value = x.value;
    console.log(x);
  }
  people();
}

//发牌，点击跳转并传参
function deal() {
  var slayer = document.getElementById("slayer");//获取杀手
  var civilian = document.getElementById("civilian");//获取平民
  var input_number = document.getElementById("number-inputs");
  var x = document.getElementById("number-inputs");//获取输入框节点
  if (x.value >= 4 && x.value <= 18) {
    window.location.href = "kill-identity.html";//跳转页面
    sessionStorage.setItem("slayerPeople", slayer.innerText);//获取杀手人数
    sessionStorage.setItem("civilian", civilian.innerText);//获取平民人数
    sessionStorage.setItem("input_number", input_number.value);//获取总人数
  } else {
    alert("请输入玩家数量");
  }
}