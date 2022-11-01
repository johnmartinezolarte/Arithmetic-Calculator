const displayOperation=document.querySelector('.display-operation');
const displayResult=document.querySelector('.display-result');
const operators=document.querySelectorAll('.btn');
const numbers=document.querySelectorAll('.btn_number');

let key=true, operation, accumulated, result;
const checkOperation=/^[1-9][0-9]*(?:[/*+-][1-9][0-9]*)*$/;

operators.forEach((x,i)=>{
    x.addEventListener('click', ()=>operate(i));
});

numbers.forEach((x,i)=>{
    x.value=i;
    x.addEventListener('click', ()=>enterNumber(i));
});

displayOperation.addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode===13){
        operators[4].click();
    }
});
displayOperation.addEventListener('input', typing);

function typing(){
    if(checkOperation.test(displayOperation.value)){
        operators[4].disabled=false;
        operators[4].classList.add('btn-igual-enabled');
    }else{
        operators[4].disabled=true;
        operators[4].classList.remove('btn-igual-enabled')
    }
    displayResult.innerHTML='';
    key=true;
}

function operate(e){
    if(e>=0 && e<=3){
        if(displayOperation.value!==''){
            if(key){
                operation=displayOperation.value;
            }else{
                if(accumulated===displayOperation.value){
                    operation=result;
                }else{
                    operation=displayOperation.value;
                }
                key=true;
            }
            operation+=operators[e].textContent;
            displayOperation.value=operation;
            displayResult.innerHTML='';
            operation='';
            accumulated='';
        }
    }else if(e===4){
        if(displayOperation.value!==''){
            if(key){
                accumulated=displayOperation.value;
                result=Math.round(eval(accumulated)*100)/100;
                displayResult.innerHTML=result;
                key=false;
            }else{
                if(accumulated!==displayOperation.value){
                    accumulated=displayOperation.value;
                    result=Math.round(eval(accumulated)*100)/100;
                    displayResult.innerHTML=result;
                }
            }
        }
    }else if(e===5){
        if(displayOperation.value!==''){
            operation=displayOperation.value;
            operation=operation.substring(0,operation.length-1);
            displayOperation.value=operation;
            displayResult.innerHTML='';
            operation='';
            accumulated='';
            key=true;
        }
    }else{
        if(displayOperation.value!==''){
            operation='';
            accumulated='';
            displayOperation.value='';
            displayResult.innerHTML='';
            key=true;
        }  
    }
    if(checkOperation.test(displayOperation.value)){
        operators[4].disabled=false;
        operators[4].classList.add('btn-igual-enabled');
    }else{
        operators[4].disabled=true;
        operators[4].classList.remove('btn-igual-enabled')
    }
    displayOperation.focus();
};

function enterNumber(i){
    if(key){
        operation=displayOperation.value;
        operation+=numbers[i].value;
    }else{
        if(accumulated===displayOperation.value){
            operation=numbers[i].value;
        }else{
            operation=displayOperation.value;
            operation+=numbers[i].value;
        }
        key=true;
    }
    displayOperation.value=operation;
    displayResult.innerHTML='';
    operation='';
    accumulated='';
    if(checkOperation.test(displayOperation.value)){
        operators[4].disabled=false;
        operators[4].classList.add('btn-igual-enabled');
    }else{
        operators[4].disabled=true;
        operators[4].classList.remove('btn-igual-enabled')
    }
    displayOperation.focus();
};