import React, {useMemo} from "react";
import styled from "styled-components";
import { StartBottom } from "./StartBottom";
import StartRight from "./StartRight";

interface IProps {
    duration: number
    delay: number
    startPoint: 'bottom' | 'right' | 'left'
}

const StartLeft = styled(StartRight)`
    transform: rotateY(180deg);
`



//Place this item in a positioned element
const FillingBorderAnim = React.memo(({duration, delay, startPoint}: IProps) => {

    if(startPoint === 'bottom') {
        return <StartBottom duration={duration} delay={delay} />
    }

    if(startPoint === 'right') {
        return <StartRight duration={duration} delay={delay} />
    }

    
    if(startPoint === 'left') {
        return <StartLeft duration={duration} delay={delay} />
    }

    return <StartBottom duration={duration} delay={delay} />
});
export default FillingBorderAnim;
