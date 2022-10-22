const display=document.querySelector('.display');
const operators=document.querySelectorAll('.btn');
const numbers=document.querySelectorAll('.btn_number');

let key=true, operation='', accumulated='';

operators.forEach((x,i)=>{
    x.addEventListener('click', ()=>operate(i));
});

numbers.forEach((x,i)=>{
    x.value=i;
    x.addEventListener('click', ()=>enterNumber(i));
});

function operate(e){
    if(e>=0 && e<=3){
        operation+=operators[e].textContent;
        display.textContent=operation;
    }else if(e===4){

        if(operation===''){
            display.textContent='Error'
        }else{
            accumulated=operation;
            accumulated+=`=${eval(operation)}`;
            display.textContent=accumulated;
            /* operation='' */
            key=false;
        }
    }else if(e===5){
        if(operation!=='' && key){
            operation=operation.substring(0,operation.length-1)
            display.textContent=operation;

        }
    }else{
        operation=''
        display.textContent=''
    }
    

};





function enterNumber(i){
    if(key){
        if(operation===''){
            operation=numbers[i].value;
            display.textContent=operation;
        }else{
            operation+=numbers[i].value;
            display.textContent=operation;
        }
    }else{
        operation='';
        key=true;
        operation=numbers[i].value;
        display.textContent=operation;
    }
};







/* sum.addEventListener('click', ()=>{
    operator.textContent='+';
    values[1].value=values[0].value;
    values[0].value='';
    values[0].focus();
})
subtraction.addEventListener('click', ()=>{
    operator.textContent='-';
    values[1].value=values[0].value;
    values[0].value='';
    values[0].focus();
})
multiplication.addEventListener('click', ()=>{
    operator.textContent='*';
    values[1].value=values[0].value;
    values[0].value='';
    values[0].focus();
})
division.addEventListener('click', ()=>{
    operator.textContent='/';
    values[1].value=values[0].value;
    values[0].value='';
    values[0].focus();
})

values[0].addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13 && values[0].value!=='' && values[1].value!==''){
        equals.click();
    }
});

equals.addEventListener('click', ()=>{
    let a=+values[0].value;
    let b=+values[1].value;
    if(operator.textContent==='+'){
        display.innerText=b+a;
    }else if(operator.textContent==='-'){
        display.innerText=b-a;
    }else if(operator.textContent==='*'){
        display.innerText=b*a;
    }else if(operator.textContent==='/'){
        display.innerText=b/a;
    }else{
        display.innerText='Error';
    }
});

deleteAC.addEventListener('click', ()=>{
    operator.textContent='';
    display.innerText='';
    values[0].value='';
    values[1].value='';
}); */