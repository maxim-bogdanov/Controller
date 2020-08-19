"use strict"
class InputController {

    enabled = true;
    #target;
    #eventBus = window;
    #bindedActions = {};
    #inputDevices = [];

    static ACTION_ACTIVATED = "input-controller:action-activated";
    static ACTION_DEACTIVATED = "input-controller:action-deactivated";

    // enabled = true;
    // focused  = true;

    constructor(actionsToBind, target) {
       
        this.#target = target;
        this.bindActions(actionsToBind);
        // this.attach(target);

    }

    //
    addInputDevice( inputDevices ){
        if( !inputDevices ) return;
        if( !Array.isArray(inputDevices) ) inputDevices = [inputDevices];
        
        inputDevices.forEach((inputDevice) => {
            inputDevice.init( this );
            this.#inputDevices.push( inputDevice );
        });

        inputDevices.forEach((inputDevice) => {
            inputDevice.bindActions( actionsToBind, this.#bindedActions );
        });

        // console.log(inputDevices);
    }

    //
    bindActions(actionsToBind) { 
        if(!actionsToBind) return;
        
        Object.keys(actionsToBind).forEach((actionName) => {
            const actionData = actionsToBind[actionName];
            this.#bindedActions[actionName] = {
                actionName: actionName,
                // keys: actionData.keys,
                isActive: false,
                enabled: actionData.enabled === undefined ? true : actionData.enabled
            };
        });

        this.#inputDevices.forEach((inputDevice) => {
            inputDevice.bindActions( actionsToBind, this.#bindedActions );
        });


    }

    get getBindActions() {
        return this.#bindedActions;
    }

    attach(target) {
        console.log('attach', target);
        if(!target) {
            console.warn("target required");
            return;
        }
        this.#target = target;
        this.#inputDevices.forEach(function( inputDevice ){
            inputDevice.attach( target );
        });        
    }

    detach() {
        if(!this.#target) return;
        this.#inputDevices.forEach( (inputDevice) => {
            inputDevice.detach( this.#target );
        });

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
        return this.enabled && action && action.enabled && action.isActive;
    }

 
    activateAction( action, isOnce ){
        console.log('activateAction', action);
        if(!action || action.isActive ) return;
        if( !isOnce ) action.isActive = true;
        if(this.enabled){
            this.#eventBus.dispatchEvent(new CustomEvent(InputController.ACTION_ACTIVATED, {
                detail: {
                    actionName: action.actionName
                }
            }));
        }
    }

    deactivateAction( action ){
        if(!action || !action.isActive ) return;
        action.isActive = false;
        if(this.enabled){
            this.#eventBus.dispatchEvent(new CustomEvent(InputController.ACTION_DEACTIVATED, {
                detail: {
                    actionName: action.actionName
                }
            }));
        }
    }
}

