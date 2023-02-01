const displayOperation=document.querySelector('.display-operation');
const displayResult=document.querySelector('.display-result');
const operators=document.querySelectorAll('.btn');
const numbers=document.querySelectorAll('.btn_number');

let key=true, operation, accumulated, replaced, result;

/* const checkOperation=/^[1-9][0-9]*(?:[/*+-][1-9][0-9]*)*$/; */ //Solamente números enteros positivos

/* const checkOperation=/^-?\d+(?:[.]\d+)?(?:[/*+-]-?\d+(?:[.]\d+)?)*$/; */ //Números enteros, decimales y negativos pero que pueden generar resultados inesperados en expresiones que empiecen en 0 ('012*2')

const checkOperation=/^-?([1-9]\d*[.]?\d*|0?[.]\d+|0[.]?)(?:[/*+-]-?([1-9]\d*[.]?\d*|0?[.]\d+|0[.]?))*$/; //Valores que podria manipular JS sin generar resultados inesperados (excepto '--')

const reg = /(--){1}/g; //Encontrar dos negativos juntos ('--') en toda la expresión

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
        operators[5].click();
    }
});

displayOperation.addEventListener('input', typing);

function typing(){
    if(checkOperation.test(displayOperation.value)){
        operators[5].disabled=false;
        operators[5].classList.add('btn-igual-enabled');
    }else{
        operators[5].disabled=true;
        operators[5].classList.remove('btn-igual-enabled')
    }
    displayResult.innerHTML='';
    key=true;
}

function operate(e){
    if(e>=0 && e<=4){
        if(displayOperation.value!==''){
            if(key){
                operation=displayOperation.value;
            }else{
                if(accumulated===displayOperation.value){
                    operation=result;
                }else{
                    operation=displayOperation.value;
                }
            }
            operation+=operators[e].textContent;
            displayOperation.value=operation;
            displayResult.innerHTML='';
            operation='';
            accumulated='';
            result='';
            key=true;
        }else{
            //Before e===1 || e===4
            if(e===0 || e===1 || e===4){
                operation=displayOperation.value;
                operation+=operators[e].textContent;
                displayOperation.value=operation;
                displayResult.innerHTML='';
                operation='';
                accumulated='';
                result='';
                key=true;
            }
        }
    }else if(e===5){
        if(displayOperation.value!==''){
            if(key){
                accumulated=displayOperation.value;
                replaced=accumulated.replace(reg, "+"); //Reemplazar '--' por '+'
                result=Math.round(eval(replaced)*100)/100;
                displayResult.innerHTML=result;
                key=false;
            }else{
                if(accumulated!==displayOperation.value){
                    accumulated=displayOperation.value;
                    replaced=accumulated.replace(reg, "+"); //Reemplazar '--' por '+'
                    result=Math.round(eval(replaced)*100)/100;
                    displayResult.innerHTML=result;
                }
            }
            replaced='';
        }
    }else if(e===6){
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
        operators[5].disabled=false;
        operators[5].classList.add('btn-igual-enabled');
    }else{
        operators[5].disabled=true;
        operators[5].classList.remove('btn-igual-enabled')
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
    result='';
    if(checkOperation.test(displayOperation.value)){
        operators[5].disabled=false;
        operators[5].classList.add('btn-igual-enabled');
    }else{
        operators[5].disabled=true;
        operators[5].classList.remove('btn-igual-enabled')
    }
    displayOperation.focus();
};