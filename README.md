# TaskList

A modern, responsive task manager built with React, Tailwind CSS, shadcn/ui-style components, lucide-react, Framer Motion, and localStorage.

## Features

- Add, edit inline, complete, delete tasks
- Work / Personal / Urgent categories
- High / Medium / Low priorities
- Drag-and-drop task reordering
- Due dates with overdue indicators
- Search + status/category/priority filters
- Dark/light theme persisted locally
- Completion progress bar
- Empty states with no dummy data
- Framer Motion add/delete animations
- Enter to add and Escape to cancel inline editing
- Delete confirmation modal
- Toast feedback on completion/deletion
- Automatic sorting by due date, then priority
- Fully client-side; no account or backend required

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` directory to Vercel, Netlify, Cloudflare Pages, GitHub Pages (with SPA routing configured), or any static hosting provider.

## Data

Tasks are stored in `localStorage` under `tasklist.tasks.v1`; theme preference is stored under `tasklist.theme.v1`.
