class KeyboardInputDevice extends InputDevice{
    
    //
    #bindedActionsByKeyCode = {};

    //
    _type = 'keyboard';
    #target;
    #eventBus = window;
    // inputController;

    /*
    init(){
        super.init();
    }
    */

    //
    bindActions( actionsToBind, inputControllerBindedActions ){

        for (let actionName in actionsToBind) {
            
            const actionData =  actionsToBind[actionName].inputDevicesData[this.type];
            if( !actionData ) continue;

            // const codes = actionsToBind[actionName].keys;
            const codes = actionData.keys;

            for (let code of codes) {
                const obj = this.#bindedActionsByKeyCode[code] = {};
                const bind = inputControllerBindedActions[actionName];
                obj.action = bind;

                obj.isPressed = false;
            }
        }
        // console.log('bindedActionsByKeyCode');
        // console.log(this.#bindedActionsByKeyCode);
        
    }

    //
    attach(target){
        this.#target = target;

        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);

        this.#target.addEventListener('keydown', this._onKeyDown);
        this.#target.addEventListener('keyup', this._onKeyUp);
    }

    //
    detach(){
        this.#target.removeEventListener('keydown', this._onKeyDown);
        this.#target.removeEventListener('keyup', this._onKeyUp);
        this.#target = undefined;
    }


    //
    isKeyPressed(keyCode) {
        const key = this.#bindedActionsByKeyCode[keyCode];
        if(key) return key.isPressed;
    }

    _onKeyDown(event) {
        const keyObject = this.#bindedActionsByKeyCode[event.keyCode];
        if (keyObject) {
            keyObject.isPressed = true;
            this.inputController.activateAction(keyObject.action);
        }
        // console.log(`Нажата клавиша ${event.keyCode}`);
    }

    _onKeyUp(event) {
        const keyObject = this.#bindedActionsByKeyCode[event.keyCode];
        if (keyObject) {
            // console.log("Отжата");
            keyObject.isPressed = false;
            this.inputController.deactivateAction(keyObject.action);
        }
    }     
    
}