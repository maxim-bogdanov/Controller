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
            this.#bindedActions[actionName] = {
                actionName: actionName,
                keys: actionsToBind[actionName].keys,
                isActive: false,
                enabled: actionsToBind[actionName].enabled
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
        console.log('detach');
        if(!this.#target) return;
        this.#target.removeEventListener('keydown', this._onKeyDown);
        this.#target.removeEventListener('keyup', this._onKeyUp);
        this.#target = undefined;
    }

    enableController() {
        this.enabled = true;
        console.log('enable');
    }

    disableController() {
        this.enabled = false;
        console.log('disable');
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
        return action && action.isActive;
    }

    isKeyPressed(keyCode) {
        const key = this.#bindedActionsByKeyCode[keyCode];
        if(key) return key.isPressed;
    }

 
    // Keyboard
    _onKeyDown(event) {
        const keyDown = this.#bindedActionsByKeyCode[event.keyCode];
        if (keyDown) {
            keyDown.isPressed = true;
        }
        console.log(`Нажата клавиша ${event.keyCode}`);
    }

    _onKeyUp(event){
        const keyUp = this.#bindedActionsByKeyCode[event.keyCode];
        if (keyUp) {
            keyUp.isPressed = false;
        }
        console.log("Отжата");
    }

}

