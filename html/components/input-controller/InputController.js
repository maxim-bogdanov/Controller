"use strict"
class InputController {

    #target;
    #eventBus = window;
    #bindedActions = {};
    #bindedActionsByKeyCode = {};

    static ACTION_ACTIVATED = "input-controller:action-activated";
    static ACTION_DEACTIVATED = "input-controller:action-deactivated";

    enabled = true;
    focused  = true;

    constructor(actionsToBind, target) {

        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        
        this.#target = target;
        this.bindActions(actionsToBind);

    }

    bindActions(actionsToBind) { 
        if(!actionsToBind) return;

        /* actionObject
            - actionName
            - keys
            - enabled
            - isActive
        */
        
        Object.keys(actionsToBind).forEach((actionName) => {
            const actionData = actionsToBind[actionName];
            this.#bindedActions[actionName] = {
                actionName: actionName,
                keys: actionData.keys,
                isActive: false,
                enabled: actionData.enabled === undefined ? true : actionData.enabled
            };
        });


        /* keyObejct
            - keyCode
            - isPressed
            - action = actionObject
        */

        for (let actionName in actionsToBind) {
            let codes = actionsToBind[actionName].keys;

            for (let code of codes) {
                const obj = this.#bindedActionsByKeyCode[code] = {};

                Object.keys(this.#bindedActions).forEach((bindedAction) => { 
                    const bind = this.#bindedActions[bindedAction];
                    if ((bind.keys).find(key => +key == +code)) {
                        obj.action = bind;
                    }
                });
                obj.isPressed = false;
            }
        }

        console.log('bindedActions');
        console.log(this.#bindedActions);

        console.log('bindedActionsByKeyCode');
        console.log(this.#bindedActionsByKeyCode);

    }

    attach(target) {
        console.log('attach', target);
        if(!target) {
            console.warn("target required");
            return;
        }
        this.#target = target;
        this.#target.addEventListener('keydown', this._onKeyDown);
        this.#target.addEventListener('keyup', this._onKeyUp);
        
    }

    detach() {
        if(!this.#target) return;
        this.#target.removeEventListener('keydown', this._onKeyDown);
        this.#target.removeEventListener('keyup', this._onKeyUp);
        this.#target = undefined;
    }

    enableController() {
        this.enabled = true;
    }

    disableController() {
        this.enabled = false;
    }

    enableAction(actionName) {
        const action = this.#bindedActions[actionName];
        if(!action) return;
        action.enabled = true;
    }

    disableAction(actionName) {
        const action = this.#bindedActions[actionName];
        if(!action) return;
        action.enabled = false;
    }

    isActionActive(actionName){
        const action = this.#bindedActions[actionName];
        return action && action.enabled && action.isActive;
    }

    isKeyPressed(keyCode) {
        const key = this.#bindedActionsByKeyCode[keyCode];
        if(key) return key.isPressed;
    }

 
    _activateAction( action ){
        if(!action || action.isActive ) return;
        action.isActive = true;
        this.#eventBus.dispatchEvent(new CustomEvent(InputController.ACTION_ACTIVATED, {
            detail: {
                actionName: action.actionName
            }
        }));
    }

    _deactivateAction( action ){
        if(!action || !action.isActive ) return;
        action.isActive = false;
        this.#eventBus.dispatchEvent(new CustomEvent(InputController.ACTION_DEACTIVATED, {
            detail: {
                actionName: action.actionName
            }
        }));
    }

    // Keyboard
    _onKeyDown(event) {
        const keyObject = this.#bindedActionsByKeyCode[event.keyCode];
        if (keyObject) {
            keyObject.isPressed = true;
            this._activateAction(keyObject.action);
        }
        // console.log(`Нажата клавиша ${event.keyCode}`);
    }

    _onKeyUp(event){
        const keyObject = this.#bindedActionsByKeyCode[event.keyCode];
        if (keyObject) {
            // console.log("Отжата");
            keyObject.isPressed = false;
            this._deactivateAction(keyObject.action);
        }
    }
    
    get getBindActions() {
        return this.#bindedActions;
    }

    moveHero(hero, actionName) {
        let num;
        switch(actionName){
            
            case 'jump':
                hero.style.transform = `rotate(${Math.random()*360}deg)`;
                break;

            case 'left':
                if (hero.style.right === "") num = 3;
                else num = parseInt(hero.style.right) + 3;
                hero.style.right = num + 'px';
                break;

            case 'right':
                if (hero.style.right === "") num = -3;
                else num = parseInt(hero.style.right) - 3;
                hero.style.right = num + 'px';
                break;

            case 'top':
                if (hero.style.bottom === "") num = 3;
                else num = parseInt(hero.style.bottom) + 3;
                hero.style.bottom = num + 'px';
                break;

            case 'down':
                if (hero.style.bottom === "") num = -3;
                else num = parseInt(hero.style.bottom) - 3;
                hero.style.bottom = num + 'px';
                break;
        }
    }
    

}

