let actionsToBind = {
    left: {
        keys: [37, 65],
        enabled: false
    },
    top: {
        keys: [38, 87],
        enabled: false
    },
    right: {
        keys: [39, 68],
        enabled: true
    },
    down: {
        keys: [40, 83],
        enabled: false
    }
};
let target = window;


// CONTROLLER INITIALIZATION

// const inputController = new InputController(actionsToBind, target);

const inputController = new InputController();
inputController.bindActions(actionsToBind);
inputController.attach(target);

// BUTTONS
function addButton( title, className, onClick ){
    let $button = document.createElement('button');
    $button.className = "button";
    $button.textContent = title;
    $button.classList.add(className);

    const $buttons = document.getElementsByClassName('buttons')[0];

    $button.addEventListener('click', onClick);
    $buttons.append($button);
}


addButton( 'аттач к элементу DOM', 'attach',function(){
    inputController.attach(window);
});

addButton( 'детач от элемента DOM', 'detach', function(){
    inputController.detach();
});

addButton( 'активация контроллера', 'enableController',function(){
    inputController.enableController();
});

addButton( 'деактивация контроллера', 'disableController', function(){
    inputController.disableController();
});

addButton( 'байнд доп. активности “прыжок”', 'bindActions', function(){

    inputController.bindActions({
        jump: {
            keys: [32]
        }
    });
});

// HERO MOVEMENT
const hero = document.getElementsByClassName('hero')[0];

window.addEventListener( InputController.ACTION_ACTIVATED, function(e){
    console.log('action activated:', e );
    // проверяем какая активность сработала и применяем к герою
});

window.addEventListener( InputController.ACTION_DEACTIVATED, function(e){
    console.log('action deactivated:', e );
    // проверяем какая активность сработала и применяем к герою
});

/*
window.addEventListener('keydown', function(event) {
    let keyCodeActiveButton = event.keyCode;
    activeButtons.push(keyCodeActiveButton);
    console.log(keyCodeActiveButton);
    console.log(activeButtons);
});

window.addEventListener('keyup', function(event) {
    let disactiveButton = activeButtons.pop();
});
*/

setInterval(function(){
    
    // if(inputController.isActionActive ('left')){
    //     // двигаем персонажа влево
    //     console.log('active');
    // }
    // if(inputController.isActionActive ('right')){
    //     // двигаем персонажа вправо
    //     console.log('active');
    // }
    // and so on

}, 33 );