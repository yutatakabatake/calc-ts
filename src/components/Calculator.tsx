import Display from './Display'
import ButtonPanel from './ButtonPanel'
import { calculate, type State } from '../logic/calculate'
import { useState } from 'react'
import History from './History';

function Calculator() {
    const [state, setState] = useState<State>({
        current: "0",
        operand: 0,
        operator: null,
        isNextClear: false,
        history: "0"
    });
    const buttonHandler = (code: string) => {
        const nextState = calculate(code, state);
        setState(nextState);
    }
    return (
        <div>
            <History history={state.history} />
            <Display value={state.current} />
            <ButtonPanel buttonHandler={buttonHandler} />
        </div>
    )
}

export default Calculator