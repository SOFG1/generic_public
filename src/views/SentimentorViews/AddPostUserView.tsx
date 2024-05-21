import React, { useState } from "react"
import { ToolbarButton } from "../../UI/ToolbarButton"
import { useTranslation } from "react-i18next"
import { CreatePostIcon } from "../../UI/Svg"
import { Modal } from "../../UI/Modal"
import { AddPostComponent, AddUserComponent } from "../../components/SentimentorComponents"
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC"



const AddPostUserView = React.memo(() => {
    const { t } = useTranslation()
    const [opened, setOpened] = useState<boolean>(false)



    return <>
        <Modal show={opened} onClose={() => setOpened(false)}>
            <AddPostComponent />
            <AddUserComponent />
        </Modal>
        <ToolbarButton opened={opened} onClick={() => setOpened(true)}><p>{t("ranking_manual_post-title")}</p><CreatePostIcon />  </ToolbarButton>
    </>
})

export default withErrorBoundaryHOC(AddPostUserView)