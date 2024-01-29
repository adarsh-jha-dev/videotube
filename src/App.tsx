import "./App.css";
import Home from "./components/Home";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <main>
        <h1>This is the VideoTube Project</h1>
        <Home />
      </main>
    </ThemeProvider>
  );
}

export default App;
