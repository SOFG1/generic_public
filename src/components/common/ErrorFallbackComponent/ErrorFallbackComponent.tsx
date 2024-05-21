import { useTranslation } from "react-i18next"
import styled from "styled-components"


const StyledMessage = styled.p`
padding: 10px;
`


const ErrorFallbackComponent = () => {
    const { t } = useTranslation()
    return <StyledMessage>{t("error_boundary_fallback")}</StyledMessage>
}


export default ErrorFallbackComponent