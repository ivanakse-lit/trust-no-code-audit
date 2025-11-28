import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './shared';
import AuditPage from './features/audit/AuditPage';
import ReportsPage from './features/reports/ReportsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/audit" replace />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
