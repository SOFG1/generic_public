import React, { useMemo } from "react"
import { SentimentorKeyword } from "../../store/sentimentor"
import Highlighter from "react-highlight-words"
import { removeStringAccents } from "../../utils/removeStringAccents"




interface IProps {
    text?: string //Text could be undefined in some posts
    keywords: SentimentorKeyword[]
}

const HighlightedKeywordsComponent = React.memo(({ text, keywords }: IProps) => {



    const keywordsList = useMemo(() => {
        const list: string[] = []
        keywords.forEach(word => {
          const arr = word.word?.split(" ") || []
          list.push(arr.join("-")) //Push cases separated by -
          list.push(arr.join("")) //Push cases when multiple keywords added as 1 word
          list.push(...arr) //Push each word separated by spaces
        })
        return list
      }, [keywords])


    return <Highlighter
        searchWords={keywordsList}
        autoEscape={true}
        textToHighlight={text || ""}
        sanitize={removeStringAccents}
    />
})


export default HighlightedKeywordsComponent