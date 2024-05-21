import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { Sentimentor } from "../../api/sentimentor"
import { desktopBp } from "../../styles/variables"


const StyledWrapper = styled.div`
    margin-bottom: 1.30vw;
    padding: 0.63vw 1.09vw;
    font-size: 0.63vw;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.20) inset;
    border-radius: 0.52vw;
    height: 3.39vw;
    box-sizing: border-box;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 7px;
    }
    @media screen and (max-width: ${desktopBp}) {
        margin-bottom: 16px;
        padding: 8px 14px;
        font-size: 8px;
        border-radius: 7px;
        height: 42px;
    }
`


interface IProps {
    parent_id: string
}

const PostCommentComponent = React.memo(({ parent_id }: IProps) => {
    const { token } = useUserState()
    const [comment, setComment] = useState<string>("")

    const fetchParentInfo = useCallback(async () => {
        if (token) {
            const [dataRes, dataErr] = await handle(Sentimentor.getPostParent(token, parent_id))
            if (dataRes) {
                setComment(dataRes.post_text)
            }
            if (dataErr) {
                
            }
        }
    }, [token, parent_id])



    useEffect(() => {
        fetchParentInfo()
    }, [fetchParentInfo])


    if(!comment) return null
    return <StyledWrapper>{comment}</StyledWrapper>
})


export default PostCommentComponent