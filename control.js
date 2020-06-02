const faces=["U","D","L","R","F","B"];

var centers=["white","yellow","orange","red","green","blue"];

var cube=
[[["white","white","white","white"],["white","white","white","white"]],
[["yellow","yellow","yellow","yellow"],["yellow","yellow","yellow","yellow"]],
[["orange","orange","orange","orange"],["orange","orange","orange","orange"]],
[["red","red","red","red"],["red","red","red","red"]],
[["green","green","green","green"],["green","green","green","green"]],
[["blue","blue","blue","blue"],["blue","blue","blue","blue"]]];

var solved=
[[["white","white","white","white"],["white","white","white","white"]],
[["yellow","yellow","yellow","yellow"],["yellow","yellow","yellow","yellow"]],
[["orange","orange","orange","orange"],["orange","orange","orange","orange"]],
[["red","red","red","red"],["red","red","red","red"]],
[["green","green","green","green"],["green","green","green","green"]],
[["blue","blue","blue","blue"],["blue","blue","blue","blue"]]];

var empty=
[[["","","",""],["","","",""]],
[["","","",""],["","","",""]],
[["","","",""],["","","",""]],
[["","","",""],["","","",""]],
[["","","",""],["","","",""]],
[["","","",""],["","","",""]]];

var timer_started=false;
var timer_running=false;
var timer_needed=false;

var run;
var run_seconds;
var run_hundreds;
var run_thousands;

var time_temp;
var time_list=[];
var ao5_list=[];
var ao12_list=[];

function solve_cube(){
  cube=[[["white","white","white","white"],["white","white","white","white"]],
  [["yellow","yellow","yellow","yellow"],["yellow","yellow","yellow","yellow"]],
  [["orange","orange","orange","orange"],["orange","orange","orange","orange"]],
  [["red","red","red","red"],["red","red","red","red"]],
  [["green","green","green","green"],["green","green","green","green"]],
  [["blue","blue","blue","blue"],["blue","blue","blue","blue"]]];

  centers=["white","yellow","orange","red","green","blue"];
  draw();
}
function scramble(scramble){

  for (x in scramble){
    operation(scramble[x]);
  }

}

function type_scramble(){
  var temp=document.getElementById("scramble").value;
  var sc=temp.split(" ");


  scramble(sc);
  document.getElementById("scramble_display").style.display="block";
  document.getElementById("display").innerHTML=document.getElementById("scramble").value;
}

function random_scramble(){
  var turn_pool=["","\'","2"];
  var scramble=[];
  var temp;
  for (i=0;i<20;i++){
    temp=faces[Math.floor(Math.random()*6)];
    if (scramble.length==1){
      while(temp==scramble[scramble.length-1][0]){
        temp=faces[Math.floor(Math.random()*6)];
      }
    }
    if (scramble.length>=2){
      while(temp==scramble[scramble.length-1][0]||temp==scramble[scramble.length-2][0]){
        temp=faces[Math.floor(Math.random()*6)];
      }
    }
    temp=temp+turn_pool[Math.floor(Math.random()*3)];

    scramble.push(temp);
  }
  return scramble;
}
function operation(step){
  switch (step){
    case "U":
      turn(0,1);
      break;
    case "U\'":
      turn(0,-1);
      break;
    case "U2":
      turn(0,-1);
      turn(0,-1);
      break;
    case "D":
      turn(1,1);
      break;
    case "D\'":
      turn(1,-1);
      break;
    case "D2":
      turn(1,-1);
      turn(1,-1);
      break;
    case "L":
      turn(2,1);
      break;
    case "L\'":
      turn(2,-1);
      break;
    case "L2":
      turn(2,-1);
      turn(2,-1);
      break;
    case "R":
      turn(3,1);
      break;
    case "R\'":
      turn(3,-1);
      break;
    case "R2":
      turn(3,-1);
      turn(3,-1);
      break;
    case "F":
      turn(4,1);
      break;
    case "F\'":
      turn(4,-1);
      break;
    case "F2":
      turn(4,-1);
      turn(4,-1);
      break;
    case "B":
      turn(5,1);
      break;
    case "B\'":
      turn(5,-1);
      break;
    case "B2":
      turn(5,-1);
      turn(5,-1);
      break;
    case "x":
      rotate("X",1);
      break;
    case "x\'":
      rotate("X",-1);
      break;
    case "y":
      rotate("Y",1);
      break;
    case "y\'":
      rotate("Y",-1);
      break;
    case "z":
      rotate("Z",1);
      break;
    case "z\'":
      rotate("Z",-1);
      break;
    default:
      break;
  }


  if (check_for_solved()){
    if (timer_needed){
      clear_and_stop_timer();
      write_stat();
      display_stat();

    }


  }
}

function clear_and_stop_timer(){
  clearInterval(run);
  clearInterval(run_seconds);
  clearInterval(run_hundreds);
  clearInterval(run_thousands);
  timer_started=false;
  timer_running=false;
}

function keys(){

  switch (document.getElementById("options").value){
    case "type_scramble":
      switch (event.keyCode){

        case 37:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          operation("U");
          break;

        case 39:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          operation("U\'");
          break;

        case 38:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          operation("R");
          break;

        case 40:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          operation("R\'");
          break;

        case 70:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          if (event.shiftKey){
            operation("F\'");
          }
          else {
            operation("F");
          }
          break;

        case 76:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          if (event.shiftKey){
            operation("L\'");
          }
          else {
            operation("L");
          }

          break;

        case 66:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          if (event.shiftKey){
            operation("B\'");
          }
          else {
            operation("B");
          }

          break;

        case 68:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          if (event.shiftKey){
            operation("D\'");
          }
          else {
            operation("D");
          }
          break;

        case 88:
          if (event.shiftKey){
            operation("x\'");
          }
          else {
            operation("x");
          }
          break;

        case 89:
          if (event.shiftKey){
            operation("y\'");
          }
          else {
            operation("y");
          }
          break;

        case 90:
          if (event.shiftKey){
            operation("z\'");
          }
          else {
            operation("z");
          }
          break;

        default:
          break;
      }
      break;
    case "hand_scramble":
      switch (event.keyCode){

          case 37:
            if (timer_needed){
              if (timer_started){
                timer_running=true;
              }
              else
                timer_started=true;
              timer("digits");
            }
            operation("U");
            break;

          case 39:
            if (timer_needed){
              if (timer_started){
                timer_running=true;
              }
              else
                timer_started=true;
              timer("digits");
            }
            operation("U\'");
            break;

          case 38:
            if (timer_needed){
              if (timer_started){
                timer_running=true;
              }
              else
                timer_started=true;
              timer("digits");
            }
            operation("R");
            break;

          case 40:
            if (timer_needed){
              if (timer_started){
                timer_running=true;
              }
              else
                timer_started=true;
              timer("digits");
            }
            operation("R\'");
            break;

          case 70:
            if (timer_needed){
              if (timer_started){
                timer_running=true;
              }
              else
                timer_started=true;
              timer("digits");
            }
            if (event.shiftKey){
              operation("F\'");
            }
            else {
              operation("F");
            }
            break;

          case 76:
            if (timer_needed){
              if (timer_started){
                timer_running=true;
              }
              else
                timer_started=true;
              timer("digits");
            }
            if (event.shiftKey){
              operation("L\'");
            }
            else {
              operation("L");
            }

            break;

          case 66:
            if (timer_needed){
              if (timer_started){
                timer_running=true;
              }
              else
                timer_started=true;
              timer("digits");
            }
            if (event.shiftKey){
              operation("B\'");
            }
            else {
              operation("B");
            }

            break;

          case 68:
            if (timer_needed){
              if (timer_started){
                timer_running=true;
              }
              else
                timer_started=true;
              timer("digits");
            }
            if (event.shiftKey){
              operation("D\'");
            }
            else {
              operation("D");
            }
            break;

          case 88:
            if (event.shiftKey){
              operation("x\'");
            }
            else {
              operation("x");
            }
            break;

          case 89:
            if (event.shiftKey){
              operation("y\'");
            }
            else {
              operation("y");
            }
            break;

          case 90:
            if (event.shiftKey){
              operation("z\'");
            }
            else {
              operation("z");
            }
            break;

          default:
            break;
      }
      break;
    case "random_scramble":
      switch (event.keyCode){

        case 37:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          operation("U");
          break;

        case 39:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          operation("U\'");
          break;

        case 38:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          operation("R");
          break;

        case 40:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          operation("R\'");
          break;

        case 70:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          if (event.shiftKey){
            operation("F\'");
          }
          else {
            operation("F");
          }
          break;

        case 76:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          if (event.shiftKey){
            operation("L\'");
          }
          else {
            operation("L");
          }

          break;

        case 66:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          if (event.shiftKey){
            operation("B\'");
          }
          else {
            operation("B");
          }

          break;

        case 68:
          if (timer_needed){
            if (timer_started){
              timer_running=true;
            }
            else
              timer_started=true;
            timer("digits");
          }
          if (event.shiftKey){
            operation("D\'");
          }
          else {
            operation("D");
          }
          break;

        case 88:
          if (event.shiftKey){
            operation("x\'");
          }
          else {
            operation("x");
          }
          break;

        case 89:
          if (event.shiftKey){
            operation("y\'");
          }
          else {
            operation("y");
          }
          break;

        case 90:
          if (event.shiftKey){
            operation("z\'");
          }
          else {
            operation("z");
          }
          break;

        default:
          break;
    }
      break;
    case "3x3":
      switch (event.keyCode){
        case 32:
          if (timer_started){
            clear_and_stop_timer();
            write_stat();
            display_stat();
            next_scramble();
            document.getElementsByClassName("timer_row")[0].style.display="block";
            document.getElementsByClassName("timer_row")[1].style.display="block";
            document.getElementsByClassName("timer_row")[2].style.display="block";
            document.getElementById("timer_digits_display").style.display="none";
          }
          else{
            timer_started=true;
            document.getElementsByClassName("timer_row")[0].style.display="none";
            document.getElementsByClassName("timer_row")[1].style.display="none";
            document.getElementsByClassName("timer_row")[2].style.display="none";
            document.getElementById("timer_digits_display").style.display="block";
            timer("timer_digits_display");
          }





          break;
        default:
          break;
      }
      break;


  }
}

function turn(face, direction){
  if (face==0){  //turning U face
    var temp=cube[face][0][3];
    cube[face][0][3]=cube[face][0][(3-direction)%4];
    cube[face][0][(3-direction)%4]=cube[face][0][(3-direction)%4-direction];
    cube[face][0][(3-direction)%4-direction]=cube[face][0][(3-direction)%4-2*direction];
    cube[face][0][(3-direction)%4-2*direction]=temp;

    temp=cube[face][1][3];
    cube[face][1][3]=cube[face][1][(3-direction)%4];
    cube[face][1][(3-direction)%4]=cube[face][1][(3-direction)%4-direction];
    cube[face][1][(3-direction)%4-direction]=cube[face][1][(3-direction)%4-2*direction];
    cube[face][1][(3-direction)%4-2*direction]=temp;

    temp=cube[2][1][0];
    cube[2][1][0]=cube[4+(2+direction)%3][1][0];
    cube[4+(2+direction)%3][1][0]=cube[3][1][0];
    cube[3][1][0]=cube[4+(2-direction)%3][1][0];
    cube[4+(2-direction)%3][1][0]=temp;

    temp=cube[2][0][1];
    cube[2][0][1]=cube[4+(2+direction)%3][0][(2+direction)%3];
    cube[4+(2+direction)%3][0][(2+direction)%3]=cube[3][0][0];
    cube[3][0][0]=cube[4+(2-direction)%3][0][(2-direction)%3];
    cube[4+(2-direction)%3][0][(2-direction)%3]=temp;

    temp=cube[2][0][0];
    cube[2][0][0]=cube[4+(2+direction)%3][0][(2-direction)%3];
    cube[4+(2+direction)%3][0][(2-direction)%3]=cube[3][0][1];
    cube[3][0][1]=cube[4+(2-direction)%3][0][(2+direction)%3];
    cube[4+(2-direction)%3][0][(2+direction)%3]=temp;

  }

  if (face==3){  //turning R face
    var temp=cube[face][0][3];
    cube[face][0][3]=cube[face][0][(3-direction)%4];
    cube[face][0][(3-direction)%4]=cube[face][0][(3-direction)%4-direction];
    cube[face][0][(3-direction)%4-direction]=cube[face][0][(3-direction)%4-2*direction];
    cube[face][0][(3-direction)%4-2*direction]=temp;

    temp=cube[face][1][3];
    cube[face][1][3]=cube[face][1][(3-direction)%4];
    cube[face][1][(3-direction)%4]=cube[face][1][(3-direction)%4-direction];
    cube[face][1][(3-direction)%4-direction]=cube[face][1][(3-direction)%4-2*direction];
    cube[face][1][(3-direction)%4-2*direction]=temp;

    temp=cube[0][1][1];
    cube[0][1][1]=cube[4+(2+direction)%3][1][1];
    cube[4+(2+direction)%3][1][1]=cube[1][1][1];
    cube[1][1][1]=cube[4+(2-direction)%3][1][1];
    cube[4+(2-direction)%3][1][1]=temp;

    temp=cube[0][0][1];
    cube[0][0][1]=cube[4+(2+direction)%3][0][1+(2+direction)%3];
    cube[4+(2+direction)%3][0][1+(2+direction)%3]=cube[1][0][2];
    cube[1][0][2]=cube[4+(2-direction)%3][0][1+(2-direction)%3];
    cube[4+(2-direction)%3][0][1+(2-direction)%3]=temp;

    temp=cube[0][0][2];
    cube[0][0][2]=cube[4+(2+direction)%3][0][2-(2+direction)%3];
    cube[4+(2+direction)%3][0][2-(2+direction)%3]=cube[1][0][1];
    cube[1][0][1]=cube[4+(2-direction)%3][0][2-(2-direction)%3];
    cube[4+(2-direction)%3][0][2-(2-direction)%3]=temp;

  }

  if (face==4){  //turning F face
    var temp=cube[face][0][3];
    cube[face][0][3]=cube[face][0][(3-direction)%4];
    cube[face][0][(3-direction)%4]=cube[face][0][(3-direction)%4-direction];
    cube[face][0][(3-direction)%4-direction]=cube[face][0][(3-direction)%4-2*direction];
    cube[face][0][(3-direction)%4-2*direction]=temp;

    temp=cube[face][1][3];
    cube[face][1][3]=cube[face][1][(3-direction)%4];
    cube[face][1][(3-direction)%4]=cube[face][1][(3-direction)%4-direction];
    cube[face][1][(3-direction)%4-direction]=cube[face][1][(3-direction)%4-2*direction];
    cube[face][1][(3-direction)%4-2*direction]=temp;

    temp=cube[0][1][2];
    cube[0][1][2]=cube[2+(2+direction)%3][1][3];
    cube[2+(2+direction)%3][1][3]=cube[1][1][2];
    cube[1][1][2]=cube[2+(2-direction)%3][1][3];
    cube[2+(2-direction)%3][1][3]=temp;

    temp=cube[0][0][2];
    cube[0][0][2]=cube[2+(2+direction)%3][0][(4+direction)%5];
    cube[2+(2+direction)%3][0][(4+direction)%5]=cube[1][0][3];
    cube[1][0][3]=cube[2+(2-direction)%3][0][(4-direction)%5];
    cube[2+(2-direction)%3][0][(4-direction)%5]=temp;

    temp=cube[0][0][3];
    cube[0][0][3]=cube[2+(2+direction)%3][0][(4-direction)%5];
    cube[2+(2+direction)%3][0][(4-direction)%5]=cube[1][0][2];
    cube[1][0][2]=cube[2+(2-direction)%3][0][(4+direction)%5];
    cube[2+(2-direction)%3][0][(4+direction)%5]=temp;

  }

  if (face==1){  //turning D face
    var temp=cube[face][0][3];
    cube[face][0][3]=cube[face][0][(3+direction)%4];
    cube[face][0][(3+direction)%4]=cube[face][0][(3+direction)%4+direction];
    cube[face][0][(3+direction)%4+direction]=cube[face][0][(3+direction)%4+2*direction];
    cube[face][0][(3+direction)%4+2*direction]=temp;

    temp=cube[face][1][3];
    cube[face][1][3]=cube[face][1][(3+direction)%4];
    cube[face][1][(3+direction)%4]=cube[face][1][(3+direction)%4+direction];
    cube[face][1][(3+direction)%4+direction]=cube[face][1][(3+direction)%4+2*direction];
    cube[face][1][(3+direction)%4+2*direction]=temp;

    temp=cube[2][1][2];
    cube[2][1][2]=cube[4+(2-direction)%3][1][2];
    cube[4+(2-direction)%3][1][2]=cube[3][1][2];
    cube[3][1][2]=cube[4+(2+direction)%3][1][2];
    cube[4+(2+direction)%3][1][2]=temp;

    temp=cube[2][0][2];
    cube[2][0][2]=cube[4+(2-direction)%3][0][2+(2+direction)%3];
    cube[4+(2-direction)%3][0][2+(2+direction)%3]=cube[3][0][3];
    cube[3][0][3]=cube[4+(2+direction)%3][0][2+(2-direction)%3];
    cube[4+(2+direction)%3][0][2+(2-direction)%3]=temp;

    temp=cube[2][0][3];
    cube[2][0][3]=cube[4+(2-direction)%3][0][2+(2-direction)%3];
    cube[4+(2-direction)%3][0][2+(2-direction)%3]=cube[3][0][2];
    cube[3][0][2]=cube[4+(2+direction)%3][0][2+(2+direction)%3];
    cube[4+(2+direction)%3][0][2+(2+direction)%3]=temp;

  }

  if (face==2){  //turning L face
    var temp=cube[face][0][3];
    cube[face][0][3]=cube[face][0][(3+direction)%4];
    cube[face][0][(3+direction)%4]=cube[face][0][(3+direction)%4+direction];
    cube[face][0][(3+direction)%4+direction]=cube[face][0][(3+direction)%4+2*direction];
    cube[face][0][(3+direction)%4+2*direction]=temp;

    temp=cube[face][1][3];
    cube[face][1][3]=cube[face][1][(3+direction)%4];
    cube[face][1][(3+direction)%4]=cube[face][1][(3+direction)%4+direction];
    cube[face][1][(3+direction)%4+direction]=cube[face][1][(3+direction)%4+2*direction];
    cube[face][1][(3+direction)%4+2*direction]=temp;

    temp=cube[0][1][3];
    cube[0][1][3]=cube[4+(2-direction)%3][1][3];
    cube[4+(2-direction)%3][1][3]=cube[1][1][3];
    cube[1][1][3]=cube[4+(2+direction)%3][1][3];
    cube[4+(2+direction)%3][1][3]=temp;

    temp=cube[0][0][0];
    cube[0][0][0]=cube[4+(2-direction)%3][0][(4-direction)%5];
    cube[4+(2-direction)%3][0][(4-direction)%5]=cube[1][0][3];
    cube[1][0][3]=cube[4+(2+direction)%3][0][(4+direction)%5];
    cube[4+(2+direction)%3][0][(4+direction)%5]=temp;

    temp=cube[0][0][3];
    cube[0][0][3]=cube[4+(2-direction)%3][0][(4+direction)%5];
    cube[4+(2-direction)%3][0][(4+direction)%5]=cube[1][0][0];
    cube[1][0][0]=cube[4+(2+direction)%3][0][(4-direction)%5];
    cube[4+(2+direction)%3][0][(4-direction)%5]=temp;
  }

  if (face==5){  //turning B face
    var temp=cube[face][0][3];
    cube[face][0][3]=cube[face][0][(3+direction)%4];
    cube[face][0][(3+direction)%4]=cube[face][0][(3+direction)%4+direction];
    cube[face][0][(3+direction)%4+direction]=cube[face][0][(3+direction)%4+2*direction];
    cube[face][0][(3+direction)%4+2*direction]=temp;

    temp=cube[face][1][3];
    cube[face][1][3]=cube[face][1][(3+direction)%4];
    cube[face][1][(3+direction)%4]=cube[face][1][(3+direction)%4+direction];
    cube[face][1][(3+direction)%4+direction]=cube[face][1][(3+direction)%4+2*direction];
    cube[face][1][(3+direction)%4+2*direction]=temp;

    temp=cube[0][1][0];
    cube[0][1][0]=cube[2+(2-direction)%3][1][1];
    cube[2+(2-direction)%3][1][1]=cube[1][1][0];
    cube[1][1][0]=cube[2+(2+direction)%3][1][1];
    cube[2+(2+direction)%3][1][1]=temp;

    temp=cube[0][0][0];
    cube[0][0][0]=cube[2+(2-direction)%3][0][1+(2+direction)%3];
    cube[2+(2-direction)%3][0][1+(2+direction)%3]=cube[1][0][1];
    cube[1][0][1]=cube[2+(2+direction)%3][0][1+(2-direction)%3];
    cube[2+(2+direction)%3][0][1+(2-direction)%3]=temp;

    temp=cube[0][0][1];
    cube[0][0][1]=cube[2+(2-direction)%3][0][1+(2-direction)%3];
    cube[2+(2-direction)%3][0][1+(2-direction)%3]=cube[1][0][0];
    cube[1][0][0]=cube[2+(2+direction)%3][0][1+(2+direction)%3];
    cube[2+(2+direction)%3][0][1+(2+direction)%3]=temp;

  }

  draw();
}

function rotate(axis, direction){
  if (axis=="Y"){
    turn(0,direction);

    //turn E layer
    var temp=cube[2][1][3];
    cube[2][1][3]=cube[4+(2+direction)%3][1][2-direction];
    cube[4+(2+direction)%3][1][2-direction]=cube[3][1][1];
    cube[3][1][1]=cube[4+(2-direction)%3][1][2+direction];
    cube[4+(2-direction)%3][1][2+direction]=temp;

    temp=cube[2][1][1];
    cube[2][1][1]=cube[4+(2+direction)%3][1][2+direction];
    cube[4+(2+direction)%3][1][2+direction]=cube[3][1][3];
    cube[3][1][3]=cube[4+(2-direction)%3][1][2-direction];
    cube[4+(2-direction)%3][1][2-direction]=temp;

    temp=centers[2];
    centers[2]=centers[4+(2+direction)%3];
    centers[4+(2+direction)%3]=centers[3];
    centers[3]=centers[4+(2-direction)%3];
    centers[4+(2-direction)%3]=temp;

    turn(1,-direction);


  }

  if (axis=="X"){
    turn(3,direction);

    //turn M layer
    var temp=cube[0][1][0];
    cube[0][1][0]=cube[4+(2+direction)%3][1][1-direction];
    cube[4+(2+direction)%3][1][1-direction]=cube[1][1][2];
    cube[1][1][2]=cube[4+(2-direction)%3][1][1+direction];
    cube[4+(2-direction)%3][1][1+direction]=temp;

    temp=cube[0][1][2];
    cube[0][1][2]=cube[4+(2+direction)%3][1][1+direction];
    cube[4+(2+direction)%3][1][1+direction]=cube[1][1][0];
    cube[1][1][0]=cube[4+(2-direction)%3][1][1-direction];
    cube[4+(2-direction)%3][1][1-direction]=temp;

    temp=centers[0];
    centers[0]=centers[4+(2+direction)%3];
    centers[4+(2+direction)%3]=centers[1];
    centers[1]=centers[4+(2-direction)%3];
    centers[4+(2-direction)%3]=temp;

    turn(2,-direction);


  }

  if (axis=="Z"){
    turn(4,direction);

    //turn S layer
    var temp=cube[0][1][1];
    cube[0][1][1]=cube[2+(2+direction)%3][1][1-direction];
    cube[2+(2+direction)%3][1][1-direction]=cube[1][1][3];
    cube[1][1][3]=cube[2+(2-direction)%3][1][1+direction];
    cube[2+(2-direction)%3][1][1+direction]=temp;

    temp=cube[0][1][3];
    cube[0][1][3]=cube[2+(2+direction)%3][1][1+direction];
    cube[2+(2+direction)%3][1][1+direction]=cube[1][1][1];
    cube[1][1][1]=cube[2+(2-direction)%3][1][1-direction];
    cube[2+(2-direction)%3][1][1-direction]=temp;

    temp=centers[0];
    centers[0]=centers[2+(2+direction)%3];
    centers[2+(2+direction)%3]=centers[1];
    centers[1]=centers[2+(2-direction)%3];
    centers[2+(2-direction)%3]=temp;

    turn(5,-direction);


  }
  draw();
}

function draw(){

  for (i=0;i<6;i++){
      var temp=document.getElementsByClassName(faces[i]+"_center");

      for (a=0;a<temp.length;a++){
        temp[a].style.backgroundColor=centers[i];
      }

  for(j=1;j<5;j++){
        temp=document.getElementsByClassName(faces[i]+"_edge_"+j.toString());
        for (a=0;a<temp.length;a++){
          temp[a].style.backgroundColor=cube[i][1][j-1];
        }

        temp=document.getElementsByClassName(faces[i]+"_corner_"+j.toString());
        for (a=0;a<temp.length;a++){
          temp[a].style.backgroundColor=cube[i][0][j-1];
        }

      }
  }

}

function reset_UI(){
  document.getElementById("cube_display").style.display="none";
  document.getElementById("cube").style.display="none";

  document.getElementById("timer").style.display="none";
  document.getElementById("scramble_area").style.display="none";
  document.getElementById("scramble").style.display="none";
  document.getElementById("scramble_button").style.display="none";
  document.getElementById("scramble_display").style.display="none";

  document.getElementsByClassName("digit_area")[0].style.display="none";


  document.getElementsByClassName("normal_timer")[0].style.display="none";
  timer_needed=false;
}

function timer(display_location){

    if (timer_started && !timer_running){
      var minutes=0;
      var seconds=0;
      var hundreds=0;
      var thousands=0;
      run_seconds=setInterval(function second(){
        seconds+=1;
        if (seconds>=60){
          seconds=0;
          minutes+=1;
        }
      },1000)
      run_hundreds=setInterval(function second(){
        hundreds+=1;
        if (hundreds>=10)
          hundreds=0;
      },100)
      run_thousands=setInterval(function second(){
        thousands+=1;
        if (thousands>=10)
          thousands=0;
      },10)
      run=setInterval(function timing(){
        if (minutes>=1){
          if (seconds<=9){
            display=minutes+":0"+seconds+"."+hundreds+thousands;
          }
          else {
            display=minutes+":"+seconds+"."+hundreds+thousands;
          }
        }

        else
          display=seconds+"."+hundreds+thousands;

        document.getElementById(display_location).innerHTML=display;
        time_temp=minutes*60+seconds+hundreds/10+thousands/100;
      },10)
    }

  }

function write_stat(){
  time_list.push(time_temp);
  if (time_list.length>=5){
    var temp= time_list.slice(time_list.length-5,);
    ao5_list.push(find_average(temp));
  }

  if (time_list.length>=12){
    var temp= time_list.slice(time_list.length-12,);
    ao12_list.push(find_average(temp));
  }
}

function find_average(times){
  var sum=0;
  times.sort(function(a,b){return a-b});
  times=times.slice(1,times.length-1);

  for (i=0;i<times.length;i++){
    sum+=times[i];
  }

  return (sum/times.length).toFixed(2);
}

function display_stat(){
  var entry=document.createElement("div");
  entry.className="entry";

  var count=document.createElement("div");
  count.innerHTML=time_list.length;

  var time=document.createElement("div");
  time.innerHTML=time_list[time_list.length-1].toFixed(2);

  var ao5=document.createElement("div");
  if (time_list.length>=5){
    ao5.innerHTML=ao5_list[ao5_list.length-1];
  }


  var ao12=document.createElement("div");
  if (time_list.length>=12){
    ao12.innerHTML=ao12_list[ao12_list.length-1];
  }

  entry.appendChild(count);
  entry.appendChild(time);
  entry.appendChild(ao5);
  entry.appendChild(ao12);

  document.getElementById("stats_list").appendChild(entry);
}

function stats_reset(){
  document.getElementById("stats_list").innerHTML="";
  time_list=[];
  ao5_list=[];
  ao12_list=[];
}


function option(){
  reset_UI();

  clear_and_stop_timer();

  switch (document.getElementById("options").value){
    case "hand_scramble":
      document.getElementById("cube_display").style.display="inline-block";
      document.getElementById("cube").style.display="inline-block";

      document.getElementById("timer").style.display="inline-block";
      solve_cube();
      break;
    case "type_scramble":
      document.getElementById("cube_display").style.display="inline-block";
      document.getElementById("cube").style.display="inline-block";

      document.getElementById("timer").style.display="inline-block";
      document.getElementById("scramble_area").style.display="inline-block";
      document.getElementsByClassName("digit_area")[0].style.display="block";
      document.getElementById("scramble").style.display="inline-block";
      document.getElementById("scramble_button").style.display="inline-block";

      timer_needed=true;

      solve_cube();
      break;
    case "random_scramble":
      document.getElementById("cube_display").style.display="inline-block";
      document.getElementById("cube").style.display="inline-block";

      document.getElementById("timer").style.display="inline-block";
      document.getElementsByClassName("digit_area")[0].style.display="block";
      timer_needed=true;


      solve_cube();
      var sc=random_scramble();
      scramble(sc);
      document.getElementById("scramble_area").style.display="block";
      document.getElementById("scramble_display").style.display="block";
      var display="";
      for (i=0;i<sc.length;i++){
        display=display+sc[i]+" ";
      }
      document.getElementById("display").innerHTML=display;

      break;
    case "3x3":

      document.getElementsByClassName("normal_timer")[0].style.display="block";


      next_scramble();


      break;
  }
}

function next_scramble(){
  solve_cube();
  var sc=random_scramble();
  scramble(sc);
  var display="";
  for (i=0;i<sc.length;i++){
    display=display+sc[i]+" ";
  }
  document.getElementById("3x3_scramble").innerHTML=display;
  fix_scramble_image();
}


function fix_scramble_image(){
  var temp=cube[1][1][0];
  cube[1][1][0]=cube[1][1][2];
  cube[1][1][2]=temp;

  temp=cube[1][0][0];
  cube[1][0][0]=cube[1][0][3];
  cube[1][0][3]=temp;

  temp=cube[1][0][1];
  cube[1][0][1]=cube[1][0][2];
  cube[1][0][2]=temp;


  temp=cube[5][1][3];
  cube[5][1][3]=cube[5][1][1];
  cube[5][1][1]=temp;

  temp=cube[5][0][0];
  cube[5][0][0]=cube[5][0][1];
  cube[5][0][1]=temp;

  temp=cube[5][0][2];
  cube[5][0][2]=cube[5][0][3];
  cube[5][0][3]=temp;


  temp=cube[2][1][3];
  cube[2][1][3]=cube[2][1][1];
  cube[2][1][1]=temp;

  temp=cube[2][0][0];
  cube[2][0][0]=cube[2][0][1];
  cube[2][0][1]=temp;

  temp=cube[2][0][2];
  cube[2][0][2]=cube[2][0][3];
  cube[2][0][3]=temp;


  draw();
}



function check_for_solved(){
  var solved=true;
  for (i=0;i<6;i++){
    for (j=0;j<2;j++){
      var ref=cube[i][j][0];
      for (k=0;k<4;k++){
        if (cube[i][j][k]!=ref){
          solved=false;
        }
      }
    }
  }
  return solved;
}
