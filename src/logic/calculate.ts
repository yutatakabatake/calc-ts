export function calculate(button: string, state: State): State {
    if (isNumberButton(button)) {
        return handleNumberButton(button, state);
    }
    if (isOperatorButton(button)) {
        return handleOperationButon(button, state);
    }

    if (isDotButton(button)) {
        return handleDotButton(state);
    }

    if (isDeleteButton(button)) {
        return handleDeleteButton(state);
    }

    if (isAllClearButton(button)) {
        return handleAllClearButton();
    }

    if (isEqualButton(button)) {
        return handleEqualButton(state);
    }
    return state;
}

export interface State {
    current: string;
    operand: number;
    operator: string | null;
    isNextClear: boolean;
    history: string
}


function isNumberButton(button: string) {
    return (
        button === "0" ||
        button === "1" ||
        button === "2" ||
        button === "3" ||
        button === "4" ||
        button === "5" ||
        button === "6" ||
        button === "7" ||
        button === "8" ||
        button === "9"
    );
}

function handleNumberButton(button: string, state: State) {
    if (state.isNextClear) {
        return {
            current: button,
            operand: state.operand,
            operator: state.operator,
            isNextClear: false,
            history: state.operand === 0 ? button : state.history + button
        }
    }
    if (state.current === "0") {
        return {
            current: button,
            operand: state.operand,
            operator: state.operator,
            isNextClear: false,
            history: (state.history === "0" ? "" : state.history) + button
        }
    }
    return {
        current: state.current + button,
        operand: state.operand,
        operator: state.operator,
        isNextClear: false,
        history: state.history + button
    };
}

function isOperatorButton(button: string) {
    return button === '+' || button === '-';
}

function handleOperationButon(button: string, state: State): State {
    if (state.operator === null) {
        return {
            current: "0",
            operand: parseFloat(state.current),
            operator: button,
            isNextClear: true,
            history: state.current + button
        }
    }
    const nextValue = operate(state);
    return {
        current: `${nextValue}`,
        operand: nextValue,
        operator: button,
        isNextClear: true,
        history: state.history + button
    }

    throw new Error("Function not implemenmted.");
}

function isDotButton(button: string) {
    return button === '.';
}

function handleDotButton(state: State): State {
    if (state.current.indexOf('.') !== -1) {
        return state;
    }
    return {
        current: state.current + ".",
        operand: state.operand,
        operator: state.operator,
        isNextClear: false,
        history: state.history + "."
    }
}

function isDeleteButton(button: string) {
    return button === "D";
}

function handleDeleteButton(state: State) {
    if (state.current.length === 1) {
        return {
            current: "0",
            operand: state.operand,
            operator: state.operator,
            isNextClear: false,
            history: state.history
        }
    }
    return {
        current: state.current.substring(0, state.current.length - 1),
        operand: state.operand,
        operator: state.operator,
        isNextClear: false,
        history: state.history.substring(0, state.history.length - 1)
    }
}

function isAllClearButton(button: string) {
    return button === "AC";
}

function handleAllClearButton() {
    return {
        current: "0",
        operand: 0,
        operator: null,
        isNextClear: false,
        history: "0"
    }
}

function isEqualButton(button: string) {
    return button === '=';
}

function handleEqualButton(state: State) {
    if (state.operator === null) {
        return state;
    }
    const nextValue = operate(state)
    return {
        current: `${nextValue}`,
        operand: 0,
        operator: null,
        isNextClear: true,
        history: `${state.history} = ${nextValue}`
    };
}

function operate(state: State): number {
    const current = parseFloat(state.current);
    if (state.operator === "+") {
        return state.operand + current;
    }
    if (state.operator === "-") {
        return state.operand - current;
    }
    return current;
}