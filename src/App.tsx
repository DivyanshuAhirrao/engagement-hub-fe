import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@ui5/webcomponents-react";
import Header from "@components/Header";
import Dashboard from "@components/Dashboard";
import PropositionsList from "@components/PropositionsList";
import CreateProposition from "@components/forms/CreateProposition";
import PropositionDetails from "@components/PropositionDetails";
import EditProposition from "@components/forms/EditProposition";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/propositions" element={<PropositionsList />} />
            <Route path="/propositions/new" element={<CreateProposition />} />
            <Route path="/propositions/:id" element={<PropositionDetails />} />
            <Route
              path="/propositions/:id/edit"
              element={<EditProposition />}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
