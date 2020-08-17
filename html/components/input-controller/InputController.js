"use strict"
class InputController {

    #target;
    #eventBus = window;
    #actionsToBind = {};

    static ACTION_ACTIVATED = "input-controller:action-activated";
    static ACTION_DEACTIVATED = "input-controller:action-deactivated";

    enabled = true;
    focused  = true;

    constructor(actionsToBind, target) {
        this.#target = target;
        this.bindActions(actionsToBind);
    }

    bindActions(actionsToBind) { 
        if(!actionsToBind) return;
        const bindedActons = Object.assign({},actionsToBind);
        this.#actionsToBind = Object.assign(this.#actionsToBind, actionsToBind);
        console.log(this.#actionsToBind);
    }

    attach() {
        console.log('attach');
    }

    detach() {
        console.log('detach');
    }

    enableController() {
        this.enabled = true;
        console.log('enable');
    }

    disableController() {
        this.enabled = false;
        console.log('disable');
    }

    enableAction() {

    }

    disableAction() {

    }

    isActionActive(nameAction){
        if(!this.#actionsToBind) return;
        return (this.#actionsToBind[nameAction].enabled);
    }

    isKeyPressed() {

    }

    // bindJump() {
    //     if (actions_to_bind.hasOwnProperty('space')) return;
    //     actions_to_bind['space'].keys.push(32);
    //     actions_to_bind['space'].enabled = true;
    // }

}

