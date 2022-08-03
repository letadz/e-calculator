let calcPad = document.querySelector('.buttons'),
    screen  = document.querySelector('.screen'),
    display = '0',
    lastOp = '',
    a = null,
    b = null,
    capture = false;

function calculator(key){
  switch(key.getAttribute('data-type')){
    case 'number':
      if(!capture) {
        display = key.value;
        capture = true
      }
      else {
        if(display === '0'){
          display = key.value;
        } else {
          display += key.value;
        }
      }
      break;

    case 'operation':
      if(typeof a === 'string'){
        b = display
      } else {
        a = display;
        lastOp = key.value;
        capture = false;
      }

      if(typeof a === 'string' && typeof b === 'string'){
        if(key.value === '='){
          display = eval(a + lastOp + b).toString();
          a = null;
          b = null;
          capture = false;
        } else if(key.value === '-' || key.value === '+' || key.value === '/' || key.value === '*') {
          display = eval(a + lastOp + b).toString();
          lastOp = key.value
          a = display;
          b = null;
          capture = false;
        } 
      }
      break;
      
      case 'reset':
        reset();
        break;

    default:
      break;
  }
}

calcPad.addEventListener('click', calcControl, false);

function reset(){
  a = null;
  b = null;
  capture = true;
  display = '0';
}

function calcControl(e){
  if(e.target !== e.currentTarget){
    let result = calculator(e.target);
    screen.textContent = display;
  }  
}
