let actionsToBind = {
    
    left: {
        enabled: true,
        inputDevicesData:{
            "keyboard":{
                keys: [37, 65]
            }
        }        
    },
    up: {
        inputDevicesData:{
            "keyboard":{
                keys: [38, 87],
            }
        }
    },
    right: {
        inputDevicesData:{
            "keyboard":{
                keys: [39, 68],
            }
        }    
    },
    down: {
        inputDevicesData:{
            "keyboard":{
                keys: [40, 83]
            }
        }    
        // enabled: false
    },


    moveLeft: {
        enabled: true,
        inputDevicesData:{
            "gestures":{
                "gesture": "swipeLeft"
            }
        }    
    },
    moveUp: {
        inputDevicesData:{
            "gestures":{
                "gesture": "swipeUp"
            }
        }    
    },
    moveRight: {
        inputDevicesData:{
            "gestures":{
                "gesture": "swipeRight"
            }
        }    
    },
    moveDown: {
        inputDevicesData:{
            "gestures":{
                "gesture": "swipeDown"
            }
        }    
    }

};

let target = window;
let eventBus = window;



// CONTROLLER INITIALIZATION
const inputController = new InputController();
inputController.addInputDevice( [new KeyboardInputDevice(), new GesturesInputDevice()] );

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
    inputController.attach(target);
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
            inputDevicesData:{
                "keyboard":{
                    keys: [32],
                }
            }
        },
        moveTap: {
            inputDevicesData:{
                "gestures":{
                    "gesture": "swipeTap"
                }
            }
        },
    });
});

// HERO MOVEMENT
const hero = document.getElementsByClassName('hero')[0];

eventBus.addEventListener( InputController.ACTION_ACTIVATED, function(e){
    console.log('action activated:', e.detail );
    let num;
    const step = 50;
    const time = .5;
    switch(e.detail.actionName){
        case 'moveLeft':
            TweenMax.to(hero,time,{
                left: parseFloat(hero.style.left||0) - step,
                ease: Elastic.easeInOut
            })
            break;
        case 'moveRight':
            TweenMax.to(hero,time,{
                left: parseFloat(hero.style.left||0) + step,
                ease: Elastic.easeInOut
            })
            break;
        case 'moveUp':
            TweenMax.to(hero,time,{
                top: parseFloat(hero.style.top||0) - step,
                ease: Elastic.easeInOut
            })
            break;
        case 'moveDown':
            TweenMax.to(hero,time,{
                top: parseFloat(hero.style.top||0) + step,
                ease: Elastic.easeInOut
            })
            break;
        case 'moveTap':
            hero.style.transform = `rotate(${Math.random()*360}deg)`;
            break;
        
    }
    // проверяем какая активность сработала и применяем к герою
});


// eventBus.addEventListener( InputController.ACTION_ACTIVATED, function(e){
//     console.log('action activated:', e.detail );
//     moveHero(hero, e.detail.actionName);
//     // проверяем какая активность сработала и применяем к герою
// });

// eventBus.addEventListener( InputController.ACTION_DEACTIVATED, function(e){
//     console.log('action deactivated:', e.detail );
//     // проверяем какая активность сработала и применяем к герою
// });


setInterval(function(){
    const bindActions = inputController.getBindActions;
    Object.keys(bindActions).forEach(actionName => {
        if(inputController.isActionActive(actionName)){
            moveHero(hero, actionName);
        }
    });
}, 33 );


function moveHero(hero, actionName) {
    let num;
    let step = 3;
    switch(actionName){
        
        case 'jump':
            hero.style.transform = `rotate(${Math.random()*360}deg)`;
            break;

        case 'left':
        // case 'moveLeft':
            if (hero.style.left === "") num = -step;
            else num = parseInt(hero.style.left) - step;
            hero.style.left = num + 'px';
            break;

        case 'right':
            if (hero.style.left === "") num = step;
            else num = parseInt(hero.style.left) + step;
            hero.style.left = num + 'px';
            break;

        case 'up':
            if (hero.style.top === "") num = step;
            else num = parseInt(hero.style.top) - step;
            hero.style.top = num + 'px';
            break;

        case 'down':
            if (hero.style.top === "") num = -step;
            else num = parseInt(hero.style.top) + step;
            hero.style.top = num + 'px';
            break;
        
    }
}