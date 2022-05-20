import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    Calibri: require("./assets/fonts/calibri-regular.ttf"),
  });
};
