const selected_answers = {}; 
const boxes = document.querySelectorAll('.choice-grid div'); 
const result = document.querySelector('#result');

for(const box of boxes){
  box.addEventListener('click',onClick);
}

function clickReset(event){
    result.classList.add('hidden'); 
     for (const key in selected_answers) {
        delete selected_answers[key];
    }
    console.log(selected_answers);
    for(const box of boxes){
        box.addEventListener('click',onClick);
        box.classList.remove('opacity');
        box.querySelector(".checkbox").src='./images/unchecked.png';
        box.classList.remove('selected'); 
    }
}

function choose_result(){
    if(selected_answers['one']===selected_answers['two'] || selected_answers['one']===selected_answers['three'])
      return selected_answers['one']
    if(selected_answers['two']===selected_answers['one'] || selected_answers['two']===selected_answers['three'])
       return selected_answers['two'];
    if(selected_answers['three']===selected_answers['one'] || selected_answers['three']===selected_answers['two'])
       return selected_answers['three'];
    return selected_answers['one'];   
  }


function insert_value(select){
    selected_answers[select.dataset.questionId]=select.dataset.choiceId;
    console.log(selected_answers);
    let i=0;
    for(let key in selected_answers)
        i++;
    console.log(i)
    if(i==3){
        for(const box of boxes){
            box.removeEventListener('click',onClick); 
        console.log('finito');
        const answers_result = choose_result();
        console.log(answers_result);
        const title=RESULTS_MAP[answers_result].title;
        const contents=RESULTS_MAP[answers_result].contents;
        console.log(title);
        console.log(contents);
        result.querySelector("h1").textContent=title;
        result.querySelector("p").textContent=contents;
        result.classList.remove('hidden');
    
        const reset = document.querySelector('.button');
        reset.addEventListener('click', clickReset);
    }
}

}
function opacity(select){
   const selected_answer = select.dataset.choiceId; 
   const answers=select.parentNode.querySelectorAll('div'); 
    for (const unselected_answer of answers){ 
        if (unselected_answer.dataset.choiceId!==selected_answer) {
            unselected_answer.classList.add('opacity');
            unselected_answer.querySelector(".checkbox").src='./images/unchecked.png';
            unselected_answer.classList.remove('selected')
        }
    }
}

function onClick(event){
    console.log("selezionato");
    const select = event.currentTarget;
    select.classList.add('selected'); 
    select.classList.remove('opacity'); 
    select.querySelector('.checkbox').src = './images/checked.png'
    opacity(select); 
    insert_value(select);
}

    

