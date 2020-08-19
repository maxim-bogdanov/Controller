class GesturesInputDevice extends InputDevice{
    
    //
    #bindedActionsBySwipe = {};

    //
    _type = 'gestures';
    #target;
    #eventBus = window;
    // #mouseCoord = [];
    #mouseStart= {x:0,y:0};

    // #swipeDirection;
    constructor(){
        super();
        this._mouseUp = this._mouseUp.bind(this);
    }

    //
    bindActions( actionsToBind, inputControllerBindedActions ){

        for (let actionName in actionsToBind) {
            
            const actionData =  actionsToBind[actionName].inputDevicesData[this.type];
            if( !actionData ) continue;

            const gesture = actionData.gesture;

            const obj = this.#bindedActionsBySwipe[gesture] = {};
            const bind = inputControllerBindedActions[actionName];
            obj.action = bind;

            // obj.isSwiped = false;
        }
        console.log('bindedActionsBySwipe');
        console.log(this.#bindedActionsBySwipe);
        
    }

    //
    attach(target){
        this.#target = target;

        this._mouseDown = this._mouseDown.bind(this);
        this._mouseUp = this._mouseUp.bind(this);

        this.#target.addEventListener('mousedown', this._mouseDown);
        this.#target.addEventListener('mouseup', this._mouseUp);
    }

    //
    detach(){
        this.#target.removeEventListener('mousedown', this._mouseDown);
        this.#target.removeEventListener('mouseup', this._mouseUp);
        this.#target = undefined;
    }


    //
    // isKeyPressed(keyCode) {
    //     const key = this.#bindedActionsByKeyCode[keyCode];
    //     if(key) return key.isPressed;
    // }

    _mouseDown(event) {
        // this.#mouseCoord.push(
        //     {
        //         x: event.clientX,
        //         y: event.clientY,
        //     }
        // );

        this.#mouseStart.x = event.clientX;
        this.#mouseStart.y = event.clientY;

        // const mouseObject = this.#bindedActionsBySwipe[this.#swipeDirection];
        // if (mouseObject) {
        //     mouseObject.isSwiped = false;
        //     this.inputController.deactivateAction(mouseObject.action);
        // }

    }

    _mouseUp(event) {

        const mouseEnd = {
            x: event.clientX,
            y: event.clientY
        };
        const moveTreshold = 5;

        const dx = mouseEnd.x - this.#mouseStart.x;
        const dy = mouseEnd.y - this.#mouseStart.y;
        const abs_dx = Math.abs(dx);
        const abs_dy = Math.abs(dy);

        
        if( abs_dx < moveTreshold && abs_dy < moveTreshold ){ // It's a Tap!
            if (!this.#bindedActionsBySwipe['swipeTap']) return;
            this.inputController.activateAction( this.#bindedActionsBySwipe['swipeTap'].action, true );
            return;
        } 

        let actionName = '';

        if( abs_dx > abs_dy ){ // Horizontal movement
            actionName = ( dx > 0 ) ? 'swipeRight' : 'swipeLeft';
        } else { // Vertical movement
            actionName = ( dy > 0 ) ? 'swipeDown' : 'swipeUp';
        }

        console.log('ACT', actionName, this.#bindedActionsBySwipe );

        this.inputController.activateAction( this.#bindedActionsBySwipe[actionName].action, true );

    }     
    
}