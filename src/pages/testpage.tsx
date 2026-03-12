import React from 'react';
import ReactDOM from 'react-dom/client';
import TestSeriesExplorer from '../components/TestSeriesExplorer';

const rootElement = document.getElementById('test-showcase-root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <TestSeriesExplorer />
    </React.StrictMode>
  );
}
