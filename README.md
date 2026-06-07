# Indie-Streamer (Gay Listens)

An elegant, dark-themed indie music streaming web application built with React, Vite, and Tailwind CSS. The app features a layout inspired by modern music streaming services, with global audio controls and future integration with the Jamendo API.

## 🎵 Features

- **Global Audio State**: Seamless playback across page navigation using React Context.
- **Fixed Player Bar**: Bottom control bar with Play/Pause, Volume adjustment (with custom styling), track metadata (title, artist, album art), and toggles for Shuffle/Repeat.
- **Navigation Sidebar**: Quick access to Home, Search, Curated, and Library sections.
- **Responsive Layout**: Designed for modern displays with a clean, dark-mode-first theme.

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
src/
├── main.jsx                # Entry point
├── App.jsx                 # Layout and route definitions
├── index.css               # Tailwind directives and global styling
├── api/
│   └── jamendoClient.js    # Client bridge for Jamendo API
├── components/layout/
│   ├── Sidebar.jsx         # Sidebar navigation component
│   └── PlayerBar.jsx       # Bottom player control bar
├── context/
│   └── AudioContext.jsx    # Global audio provider and player state management
├── hooks/
│   └── useAudio.js         # Custom hook to consume AudioContext
└── pages/
    ├── Home.jsx            # Home page component
    └── Search.jsx          # Search page component
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## 📝 Future Development

- Complete the integration with the **Jamendo API** in `src/api/jamendoClient.js` to fetch real indie tracks.
- Connect the progress bar in `PlayerBar.jsx` to real-time audio playback (`currentTime` and `duration` from the `<audio>` element).
- Wire up the Shuffle & Repeat functionality.
- Build out the `/curated` and `/library` routes.

