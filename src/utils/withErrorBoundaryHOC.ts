
import {ComponentType} from "react"
import { withErrorBoundary } from 'react-error-boundary'
import ErrorFallbackComponent from '../components/common/ErrorFallbackComponent/ErrorFallbackComponent'


export const withErrorBoundaryHOC = <Props>(Component: ComponentType<any>) => {
    return withErrorBoundary(Component, {
        FallbackComponent: ErrorFallbackComponent,
    })
}