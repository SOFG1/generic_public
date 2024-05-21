import React, {useMemo} from 'react';
import {useUserState} from "../store/user";
import {Navigate, useLocation} from "react-router-dom";
import {useUserActions} from "../store/user/hooks";
import { ERegistrationSteps } from "../types";
import { useMenu } from '../config/menu';
import { signUpUrl } from '../config/signUpUrl';

function HocPage({children}: {children: React.ReactNode}) {
    const {userInfo} = useUserState()
    const {pathname} = useLocation()
    const {onSetRegistrationStep} = useUserActions()
    const menu = useMenu()

    const menuItem = useMemo(() => {
        return menu.filter((item) => item.link === pathname)[0]
    }, [pathname, menu])

    const isNotGroup = useMemo(() => {
        if(userInfo && !userInfo?.group){
            onSetRegistrationStep(ERegistrationSteps.StepTwo)
            return true
        }
        return false
    }, [userInfo])

    const currentPermissionAccess = useMemo(() => {
        if (userInfo && menuItem) {
            const {permissions} = userInfo
            const page = menuItem.key.replace(' ', '_')
            return permissions[page]?.access || false
        }
        return false
    }, [userInfo, pathname])

    if (isNotGroup){
        return <Navigate to={signUpUrl}/>
    }


    if (!currentPermissionAccess) {
        if (pathname === '/') return null
        return <Navigate to={'/'}/>
    }

    return (
        <>
            {children}
        </>
    );
}

export default HocPage;