import "./App.css"
import Layout from "./Layout";
import {DataProvider} from "./contexts/DataContext";

function App() {
    return <>
        <DataProvider>
            <Layout></Layout>
        </DataProvider>
    </>
}

export default App;
