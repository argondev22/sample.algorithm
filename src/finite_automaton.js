const input = [0, 1, 0, 1]

const STATUS = {
    a: 0,
    b: 1,
    c: 2,
}

const INPUT = [0, 1]

function AToB(status) {
    return status + 1
}

function BToC(status) {
    return status + 1
}

function CToA(status) {
    return status - 2
}

function newFA() {
    const INIT_STATUS = STATUS.a

    return function(status, input) {
        switch (input) {
            case INPUT[0]:
                return AToB(status)
            case INPUT[1]:
                return status
        }
    }

    returb 
    if (input === INPUT[0]) {
        return status + 1
    }
    if (input === INPUT[1]) {
        return status + 2
    }
    return status + input
}

const fa = fa(status, input)