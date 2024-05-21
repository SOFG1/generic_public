import React, {useMemo} from 'react'
import ReactWordcloud from "react-wordcloud";


// We moved WordCLoud into a separate memoized component in order to prevent redraws on select/deselect tags
const CloudComponent = React.memo(({ tags, onClick }: any) => {
    const callbacks = useMemo(() => {
      return {
        getWordColor: (tag: any) => tag.color,
        getWordTooltip: () => "",
        onWordClick: (tag: any) => {
          //Don't pass other properties only text and color
          onClick({text: tag.text, color: tag.color});
        },
      }
    }, [onClick])

  
    return (
      <ReactWordcloud
        callbacks={callbacks}
        words={tags}
        options={{
          rotationAngles: [0, 0],
          rotations: 0,
          padding: 5,
          fontSizes: [30, 60],
          fontWeight: "600",
        }}
      />
    );
  });

export default CloudComponent;
