const display=document.querySelector('.display');
const operators=document.querySelectorAll('.btn');
const numbers=document.querySelectorAll('.btn_number');

let key=true, operation='', result;

operators.forEach((x,i)=>{
    x.addEventListener('click', ()=>operate(i));
});

numbers.forEach((x,i)=>{
    x.value=i;
    x.addEventListener('click', ()=>enterNumber(i));
});

function operate(e){
    if(e>=0 && e<=3){
        if(display.value!==''){
            if(key){
                operation=display.value;
            }else{
                if(operation===display.value){
                    operation=result;
                }else{
                    operation=display.value;
                }
            }
            operation+=operators[e].textContent;
            display.value=operation;
            key=true;
        }
    }else if(e===4){
        if(display.value!==''){
            if(key){
                operation=display.value;
                result=eval(operation);
                operation+=`=${result}`;
            }else{
                if(operation!==display.value){
                    operation=display.value;
                    result=eval(operation);
                    operation+=`=${result}`;
                }
            }
            display.value=operation;
            key=false;
        }
    }else if(e===5){
        if(display.value!==''){
            if(key){
                operation=operation.substring(0,operation.length-1);
            }else{
                if(operation!==display.value){
                    operation=operation.substring(0,operation.length-1);
                }
            }
            display.value=operation;
        }
    }else{
        if(display.value!==''){
            operation='';
            display.value='';
        }  
    }
};

function enterNumber(i){
    if(key){
        if(display.value===''){
            operation=numbers[i].value;
        }else{
            operation+=numbers[i].value;
        }
        display.value=operation;
    }else{
        if(operation===display.value){
            operation='';
            operation=numbers[i].value;
            display.value=operation;
        }else{
            operation=display.value;
            operation+=numbers[i].value;
        }
        display.value=operation;
        key=true;
    }
};