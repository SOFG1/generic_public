import React, { useEffect, useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { rtl_plugin, ltr_plugin } from "../../../utils/directionPlugin";
import plugins from "suneditor/src/plugins";

interface IProps {
  ref: React.ForwardedRef<any>,
  onChange?:(content:string)=>void,
  className?:string
}

const SunEditorComponent = React.forwardRef(({ onChange, className}: IProps, ref: any) => {
  return (
    <SunEditor
      onChange={onChange}
      setContents=""
      setDefaultStyle="font-size: 16px; max-width: 1000px; max-height: 400px; min-height: 350px; font-family: inherit;"
      lang="en"
      getSunEditorInstance={(i) => (ref.current = i)}
      height="auto"
      autoFocus={true}
      setOptions={{
        plugins: { ...plugins, rtl_plugin: rtl_plugin, ltr_plugin: ltr_plugin },
        rtl: document.body.dir === "rtl",
        buttonList: [
          ["undo", "redo"],
          [
            "formatBlock",
            "bold",
            "italic",
            "fontSize",
            "lineHeight",
            "fontColor",
            "hiliteColor",
            "underline",
            "strike",
            "list",
            "align",
            "font",
            "fullScreen",
            "indent",
            "outdent",
            "preview",
            "removeFormat",
          ],
          [
            "link",
            {
              name: "rtl_plugin",
              dataDisplay: "command",
              title: "Right to left",
              buttonClass: "",
              innerHTML: "<span>RTL</span>",
            },
            {
              name: "ltr_plugin",
              dataDisplay: "command",
              title: "Left to right",
              buttonClass: "",
              innerHTML: "<span>LTR</span>",
            },
          ],
        ],
        font: [
          "Arial",
          "Verdana",
          "Georgia",
          "Times New Roman",
          "Bellefair",
          "David Libre",
        ],
      }}
    />
  );
})

export default SunEditorComponent;
