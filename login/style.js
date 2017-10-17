import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "login-container": {
        "height": 284,
        "width": 217,
        "background": "black",
        "borderTop": "2px solid red"
    },
    "head_title h4": {
        "color": "#ccc",
        "textAlign": "center",
        "fontSize": 14
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
        "width": 180,
        "height": 30,
        "textAlign": "center",
        "marginBottom": 4
    },
    "pictures1 img": {
        "width": 180,
        "height": 30,
        "textAlign": "center",
        "marginBottom": 4
    },
    "pictures2 img": {
        "width": 180,
        "height": 30,
        "textAlign": "center",
        "marginBottom": 4
    },
    "pictures3 img": {
        "width": 180,
        "height": 30,
        "textAlign": "center",
        "marginBottom": 4
    },
    "pictures4 img": {
        "width": 180,
        "height": 30,
        "textAlign": "center",
        "marginBottom": 4
    },
    "pictures5 img": {
        "width": 180,
        "height": 30,
        "textAlign": "center",
        "marginBottom": 4
    }
});