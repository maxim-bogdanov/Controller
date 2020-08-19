class GesturesInputDevice extends InputDevice{
    
    //
    #bindedActionsBySwipe = {};

    //
    _type = 'gestures';
    #target;
    #eventBus = window;
    // #mouseStart = {x:0,y:0};
    // #touchStart = {x:0,y:0};
    #gesturesStart = {x:0,y:0};

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

        this._touchStart = this._touchStart.bind(this);
        this._touchEnd = this._touchEnd.bind(this);

        this._mouseDown = this._mouseDown.bind(this);
        this._mouseUp = this._mouseUp.bind(this);

        this.#target.addEventListener('mousedown', this._mouseDown);
        this.#target.addEventListener('mouseup', this._mouseUp);

        this.#target.addEventListener('touchstart', this._touchStart);
        this.#target.addEventListener('touchend', this._touchEnd);
    }

    //
    detach(){
        this.#target.removeEventListener('mousedown', this._mouseDown);
        this.#target.removeEventListener('mouseup', this._mouseUp);

        this.#target.removeEventListener('touchstart', this._touchStart);
        this.#target.removeEventListener('touchend', this._touchEnd);
        
        this.#target = undefined;
    }


    //

    _touchStart(event) {
        this.#gesturesStart.x = event.changedTouches[0].clientX;
        this.#gesturesStart.y = event.changedTouches[0].clientY; 
    }

    _touchEnd(event) {
        const gesturesEnd = {
            x: event.changedTouches[0].clientX,
            y: event.changedTouches[0].clientY
        };
        
        this._gesturesLast(gesturesEnd);
    }

    _mouseDown(event) {
        this.#gesturesStart.x = event.clientX;
        this.#gesturesStart.y = event.clientY;
    }

    _mouseUp(event) {

        const gesturesEnd = {
            x: event.clientX,
            y: event.clientY
        };

        this._gesturesLast(gesturesEnd);
        
    }

    _gesturesLast(gesturesEnd) {
        const moveTreshold = 5;

        const dx = gesturesEnd.x - this.#gesturesStart.x;
        const dy = gesturesEnd.y - this.#gesturesStart.y;
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