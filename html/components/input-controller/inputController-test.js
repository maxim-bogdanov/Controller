let actionsToBind = {
    left: {
        keys: [37, 65],
        // enabled: false
    },
    top: {
        keys: [38, 87],
        // enabled: false
    },
    right: {
        keys: [39, 68],
        // enabled: true
    },
    down: {
        keys: [40, 83],
        // enabled: false
    }

};

let target = window;
let eventBus = window;

// CONTROLLER INITIALIZATION

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


// eventBus.addEventListener( InputController.ACTION_ACTIVATED, function(e){
//     console.log('action activated:', e.detail );
//     inputController.moveHero(hero, e.detail.actionName);
//     // проверяем какая активность сработала и применяем к герою
// });

// eventBus.addEventListener( InputController.ACTION_DEACTIVATED, function(e){
//     console.log('action deactivated:', e.detail );
//     // проверяем какая активность сработала и применяем к герою
// });


setInterval(function(){

    Object.keys(actionsToBind).forEach(actionName => {
        if(inputController.isActionActive(actionName)){
            inputController.moveHero(hero, actionName);
        }
    });

    // if(inputController.isActionActive ('left')){
    //     // двигаем персонажа влево
    //     inputController.moveHero(hero, 'left');
    // }
    // if(inputController.isActionActive ('right')){
    //     // двигаем персонажа вправо
    //     inputController.moveHero(hero, 'right');
    // }
    // if(inputController.isActionActive ('top')){
    //     // двигаем персонажа вправо
    //     inputController.moveHero(hero, 'top');
    // }
    // if(inputController.isActionActive ('down')){
    //     // двигаем персонажа вправо
    //     inputController.moveHero(hero, 'down');
    // }

}, 33 );