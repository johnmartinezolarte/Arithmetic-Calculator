const displayOperation=document.querySelector('.display-operation');
const displayResult=document.querySelector('.display-result');
const operators=document.querySelectorAll('.btn');
const numbers=document.querySelectorAll('.btn_number');

let key=true, operation, result;

operators.forEach((x,i)=>{
    x.addEventListener('click', ()=>operate(i));
});

numbers.forEach((x,i)=>{
    x.value=i;
    x.addEventListener('click', ()=>enterNumber(i));
});

function operate(e){
    if(e>=0 && e<=3){
        if(displayOperation.value!==''){
            if(key){
                operation=displayOperation.value;
            }else{
                if(operation===displayOperation.value){
                    operation=result;
                }else{
                    operation=displayOperation.value;
                }
                key=true;
            }
            operation+=operators[e].textContent;
            displayOperation.value=operation;
            displayResult.innerHTML='';
        }
    }else if(e===4){
        if(displayOperation.value!==''){
            if(key){
                operation=displayOperation.value;
                result=Math.round(eval(operation)*100)/100;
                displayResult.innerHTML=result;
                key=false;
            }else{
                if(operation!==displayOperation.value){
                    operation=displayOperation.value;
                    result=Math.round(eval(operation)*100)/100;
                    displayResult.innerHTML=result;
                }
            }
        }
    }else if(e===5){
        if(displayOperation.value!==''){
            /* operation=displayOperation.value; */
            operation=operation.substring(0,operation.length-1);
            displayOperation.value=operation;
            displayResult.innerHTML='';
        }
    }else{
        if(displayOperation.value!==''){
            operation='';
            displayOperation.value='';
            displayResult.innerHTML='';
        }  
    }
};

function enterNumber(i){
    if(key){
        operation=displayOperation.value;
        operation+=numbers[i].value;
    }else{
/* 
        if(){

        } */






        operation=displayOperation.value;
        operation+=numbers[i].value;
        key=true;
    }
    displayOperation.value=operation;
    displayResult.innerHTML='';
};