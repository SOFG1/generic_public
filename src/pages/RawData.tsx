import React, { useEffect, useMemo } from 'react';
import FiltersView from "../views/RawDataViews/FiltersView";
import {ContentDataView} from "../views/RawDataViews";
import { useRawDataActions } from "../store/rawData";
import { useUserState } from '../store/user';


const RawData = () => {

    const { getRawData } = useRawDataActions()


    useEffect(() => {
        getRawData()
    }, [])


    return (
        <>
            <FiltersView />
            <ContentDataView/>
        </>
    );
}

export default RawData;
