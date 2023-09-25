# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


VITE_OPENWEATHER_API_KEY=54l41n3n4v41m34rv0 npm start3 npm start // For Linux/macOS Bash
($env:VITE_OPENWEATHER_API_KEY="54l41n3n4v41m34rv0") -and (npm run dev) // For Windows PowerShell
set "VITE_OPENWEATHER_API_KEY=54l41n3n4v41m34rv0" && npm start // For Windows cmd.exe

const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY
// variable api_key now has the value set in startup