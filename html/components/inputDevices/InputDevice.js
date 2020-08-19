class InputDevice {
    
    //
    inputController;

    //
    _type;
    constructor(type) {

    }

    get type() {
        return this._type;
    }

    //
    init( inputController ){
        this.inputController = inputController;
    }

    //
    bindActions( actionsToBind, inputControllerBindedActions ){
        console.warn(this._type,'bindActions method is not implemented.');
    }

    //
    attach(target){
        console.warn(this._type,'attach method is not implemented.');
    }

    //
    detach(){
        console.warn(this._type,'detach method is not implemented.');
    }
}

// let device = new Device("mouse");