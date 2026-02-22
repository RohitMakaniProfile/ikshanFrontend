# Ikshan Frontend (Vercel Deploy)

Sirf frontend — backend pehle se hosted hai (http://35.200.180.98).

## Local run

```bash
cd frontend
npm install
npm run dev
```

Browser: http://localhost:5173  
API calls Vite proxy se http://35.200.180.98 pe jayengi.

## Vercel par deploy

### 1. Repo se deploy (recommended)

1. [Vercel](https://vercel.com) pe login karo, **Add New Project**.
2. GitHub repo connect karo (life-sorter).
3. **Root Directory** set karo: `frontend` (Important).
4. **Framework Preset**: Vite (auto-detect ho jata hai).
5. **Environment Variable** add karo (Settings → Environment Variables):
   - `VITE_VERCEL_DEPLOY` = `true`  
   Isse saari `/api` requests Vercel rewrites se backend (35.200.180.98) pe proxy ho jayengi, CORS issue nahi aayega.
6. **Deploy** click karo.

### 2. Sirf frontend folder deploy (alag repo / manual)

Agar tum `frontend` folder ko alag repo ya zip se deploy kar rahe ho:

1. Vercel pe **Add New** → **Upload** ya naya repo.
2. Root = jo folder me `package.json`, `vite.config.js`, `src`, `public` hai.
3. Env: `VITE_VERCEL_DEPLOY` = `true`.
4. Deploy.

## Build

```bash
npm run build
```

Output: `dist/`. Preview: `npm run preview`.

## Backend

- API: http://35.200.180.98  
- Docs: http://35.200.180.98/docs  

Frontend isi backend se connected hai (legacy + v1 routes).
