



let actions_to_bind = {
    left: {
        keys: [37, 65],
        enabled: true
    },
    top: {
        keys: [38, 87],
        enabled: true
    },
    right: {
        keys: [39, 68],
        enabled: true
    },
    down: {
        keys: [40, 83],
        enabled: true
    }
}

let test = new InputController(actions_to_bind, document);