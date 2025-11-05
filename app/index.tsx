import { Redirect } from "expo-router";
import { pt, registerTranslation } from "react-native-paper-dates";
registerTranslation("pt", pt);

const App = () => <Redirect href="/(tabs)/objetivos" />;

export default App;
