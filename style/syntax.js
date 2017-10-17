import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "hljs": {
        "display": "block",
        "overflowX": "auto",
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5,
        "color": "#383a42",
        "background": "#ECF1F5"
    },
    "pre": {
        "background": "#ECF1F5",
        "border": "none",
        "marginTop": 10,
        "marginRight": 10,
        "marginBottom": 10,
        "marginLeft": 0
    },
    "hljs-comment": {
        "color": "#a0a1a7",
        "fontStyle": "italic"
    },
    "hljs-quote": {
        "color": "#a0a1a7",
        "fontStyle": "italic"
    },
    "hljs-doctag": {
        "color": "#a626a4"
    },
    "hljs-keyword": {
        "color": "#a626a4"
    },
    "hljs-formula": {
        "color": "#a626a4"
    },
    "hljs-section": {
        "color": "#e45649"
    },
    "hljs-name": {
        "color": "#e45649"
    },
    "hljs-selector-tag": {
        "color": "#e45649"
    },
    "hljs-deletion": {
        "color": "#e45649"
    },
    "hljs-subst": {
        "color": "#e45649"
    },
    "hljs-literal": {
        "color": "#0184bb"
    },
    "hljs-string": {
        "color": "#50a14f"
    },
    "hljs-regexp": {
        "color": "#50a14f"
    },
    "hljs-addition": {
        "color": "#50a14f"
    },
    "hljs-attribute": {
        "color": "#50a14f"
    },
    "hljs-meta-string": {
        "color": "#50a14f"
    },
    "hljs-built_in": {
        "color": "#c18401"
    },
    "hljs-class hljs-title": {
        "color": "#c18401"
    },
    "hljs-attr": {
        "color": "#986801"
    },
    "hljs-variable": {
        "color": "#986801"
    },
    "hljs-template-variable": {
        "color": "#986801"
    },
    "hljs-type": {
        "color": "#986801"
    },
    "hljs-selector-class": {
        "color": "#986801"
    },
    "hljs-selector-attr": {
        "color": "#986801"
    },
    "hljs-selector-pseudo": {
        "color": "#986801"
    },
    "hljs-number": {
        "color": "#986801"
    },
    "hljs-symbol": {
        "color": "#4078f2"
    },
    "hljs-bullet": {
        "color": "#4078f2"
    },
    "hljs-link": {
        "color": "#4078f2",
        "textDecoration": "underline"
    },
    "hljs-meta": {
        "color": "#4078f2"
    },
    "hljs-selector-id": {
        "color": "#4078f2"
    },
    "hljs-title": {
        "color": "#4078f2"
    },
    "hljs-emphasis": {
        "fontStyle": "italic"
    },
    "hljs-strong": {
        "fontWeight": "bold"
    },
    "side-menu a": {
        "display": "block",
        "width": "100%",
        "float": "left"
    },
    "login-container": {
        "height": 284,
        "width": "100%",
        "background": "white",
        "borderTop": "2px solid #37485F"
    },
    "login-modal modal-content": {
        "height": 200
    },
    "head_title h4": {
        "color": "#37485F",
        "textAlign": "center",
        "fontSize": 25,
        "fontFamily": "Roboto",
        "width": 400,
        "marginLeft": "auto",
        "marginRight": "auto",
        "marginTop": 20,
        "marginBottom": 20
    },
    "side-menu login-btn": {
        "border": "2px solid #37485F",
        "width": "85%",
        "paddingTop": 3,
        "paddingRight": 10,
        "paddingBottom": 3,
        "paddingLeft": 10,
        "textAlign": "center",
        "fontSize": 15,
        "marginLeft": 22,
        "backgroundColor": "#37485F",
        "color": "white",
        "transition": "0.2s",
        "transitionTimingFunction": "cubic-bezier(0.04, 3.21, 1, 1)"
    },
    "side-menu login-btn:hover": {
        "transform": "scale(1.1)",
        "backgroundColor": "#ECF1F5"
    },
    "pictures": {
        "textAlign": "center"
    },
    "pictures1": {
        "textAlign": "center"
    },
    "pictures2": {
        "textAlign": "center"
    },
    "pictures3": {
        "textAlign": "center"
    },
    "pictures4": {
        "textAlign": "center"
    },
    "pictures5": {
        "textAlign": "center"
    },
    "pictures img": {
        "width": 270,
        "height": 45,
        "textAlign": "center",
        "marginBottom": 4
    },
    "pictures1 img": {
        "width": 270,
        "height": 45,
        "textAlign": "center",
        "marginBottom": 4
    },
    "pictures2 img": {
        "width": 270,
        "height": 45,
        "textAlign": "center",
        "marginBottom": 4
    },
    "pictures3 img": {
        "width": 270,
        "height": 45,
        "textAlign": "center",
        "marginBottom": 4
    },
    "pictures4 img": {
        "width": 270,
        "height": 45,
        "textAlign": "center",
        "marginBottom": 4
    },
    "pictures5 img": {
        "width": 270,
        "height": 45,
        "textAlign": "center",
        "marginBottom": 4
    }
});