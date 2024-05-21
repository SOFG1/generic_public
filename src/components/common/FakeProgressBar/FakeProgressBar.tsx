import React, { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";


const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledMessage = styled.p`
    font-size: 28px;
    margin:0 0 33px;
`


const StyledProgressBar = styled(ProgressBar)`
width: calc(100% - 30px);
    > div {
        border: 2px solid #000;
    }
`


interface IProps {
    text?: string
    className?: string
}

const FakeProgressBar = React.memo(({text, className}: IProps) => {
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        if (progress < 40) {
            setTimeout(() => {
                setProgress(p => p + 5)
            }, 500)
            return
        }
        if (progress < 60) {
            setTimeout(() => {
                setProgress(p => p + 5)
            }, 1000)
            return
        }
        if (progress < 80) {
            setTimeout(() => {
                setProgress(p => p + 1)
            }, 1500)
            return
        }
        if (progress < 97) {
            setTimeout(() => {
                setProgress(p => p + 1)
            }, 3000)
            return
        }
    }, [progress])

    return <StyledWrapper className={className}>
        {text && <StyledMessage>{text}</StyledMessage>}
        <StyledProgressBar completed={progress} bgColor="#000" baseBgColor="#fff" padding="4px" />
    </StyledWrapper>
})

export default FakeProgressBar