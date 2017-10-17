import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "result-left-icon": {
        "marginTop": 20,
        "float": "right"
    },
    "result-left-icon i": {
        "background": "#7ba660",
        "color": "#fff",
        "width": 45,
        "height": 45,
        "borderRadius": 200,
        "lineHeight": 40,
        "textAlign": "center",
        "border": "2px solid #a0cb85",
        "fontSize": 22
    },
    "result-content h2": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "fontSize": 18
    },
    "content result-content a": {
        "color": "#5F5F5F"
    },
    "content result-content h2:first-letter": {
        "color": "#5F5F5F"
    },
    "who-post": {
        "textTransform": "uppercase",
        "fontWeight": "bold",
        "color": "#5F5F5F",
        "fontSize": 13
    },
    "category": {
        "color": "#f67363"
    },
    "username": {
        "color": "#6EC46C"
    },
    "category-color-1": {
        "color": "#f67363 !important"
    },
    "category-color-2": {
        "color": "#E8AE10 !important"
    },
    "category-color-3": {
        "color": "#1C10E8 !important"
    },
    "category-color-4": {
        "color": "#0CADE8 !important"
    },
    "category-color-5": {
        "color": "#FF5B00 !important"
    },
    "category-color-6": {
        "color": "#6C8DC4 !important"
    },
    "category-color-7": {
        "color": "#C4BB6C !important"
    },
    "question-content hr": {
        "marginTop": 10,
        "marginBottom": 18,
        "borderTop": "1px solid #f1f0f0"
    },
    "dot-icon": {
        "marginLeft": 5,
        "marginRight": 5,
        "fontSize": 5,
        "verticalAlign": "middle"
    },
    "result-section": {
        "paddingLeft": 20
    },
    "result-section h4": {
        "color": "#cacaca",
        "marginTop": 20
    },
    "result-left-icon > img": {
        "width": 50,
        "height": 50,
        "marginRight": -10
    }
});