import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>BookSwap</h1>
      <p>Проект в разработке. Скоро здесь будет интерфейс.</p>
    </div>
  </StrictMode>,
);