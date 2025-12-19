import Display from './Display'
import ButtonPanel from './ButtonPanel'
import { calculate, type ButtonCode, type State } from '../logic/calculate'
import { useState } from 'react'
import History from './History';

function Calculator() {
    const [state, setState] = useState<State>({
        current: "0",
        operand: 0,
        operator: null,
        isNextClear: false,
        display: "0",
        history: "0"
    });
    const buttonHandler = (code: ButtonCode) => {
        const nextState = calculate(code, state);
        setState(nextState);
    }
    return (
        <div>
            <History history={state.history} />
            <Display value={state.display} />
            <ButtonPanel buttonHandler={buttonHandler} />
        </div>
    )
}

export default Calculator