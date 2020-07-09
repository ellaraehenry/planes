import { Platform, StatusBar } from "react-native";
import Colors from './Colors'

const layout = {
  safeAreaContainer: {
    flex: 1,
    marginTop: Platform.OS === "android"
      ? StatusBar.currentHeight
      : 0,
    backgroundColor: Colors.background,
  }
}


export default layout;