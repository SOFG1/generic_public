import {useCallback, useEffect, useMemo, useState} from "react";
import {handle} from "../api";
import {RawData} from "../api/rawData";
import {useUserState} from "../store/user";

export function useDropdownFetch(slug: string,prefetch: string, len_input_prefetch: number, isForPreview: boolean, isDisabled?: boolean, dependentOption?: string| number | null) {
    const [dropdownFetch, setDropdownFetch] = useState<{item: string, value: string | number}[]>([]);
    const {token} = useUserState()

    const optionsNeeded = useMemo(() => {
        if (prefetch?.length > len_input_prefetch || (slug === 'street' && dependentOption) || slug || 'city') return true
        return false
    }, [slug, prefetch?.length, len_input_prefetch])

    const getData = useCallback( async () => {
        setDropdownFetch([])
        if (token && slug && optionsNeeded && !isForPreview) {

            const params: { filter_name: string, option?: string | number } = {
                filter_name: slug
            }
            if (len_input_prefetch > 0) {
                params.option = prefetch
            }
            if (dependentOption) {
                params.option = dependentOption
            }

            const [dataRes, dataErr] = await handle(RawData.getFilterData(params, token))
            if (dataRes) {
                const options:{item: string, value: string | number}[] = dataRes.map((item: [string] | [number, string] ) => {
                    if (item.length > 1) {
                        return {
                            item: item[1]?.toString(),
                            value: item[0]
                        }
                    } else {
                        return {
                            item: item[0]?.toString(),
                            value: item[0]
                        }
                    }
                })
                setDropdownFetch(options)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token, slug, prefetch,dependentOption, len_input_prefetch, optionsNeeded])

    useEffect(() => {
        if (typeof prefetch === 'string' && prefetch.length >= len_input_prefetch && !isDisabled) {
            getData()
        }
    }, [prefetch, len_input_prefetch, isDisabled, getData])

    return dropdownFetch.map(option => {
        if (typeof option.value === 'string') return {item: option.item.replaceAll(';',','), value: option.value.replaceAll(',',';')}
        return option
    })
}
