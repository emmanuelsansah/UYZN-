# Deploying UYZN Digital Hub to Vercel & Production

This guide outlines step-by-step instructions for deploying the **Unity Youth Zone Network (UYZN) Digital Hub** to **Vercel**, **GitHub**, or any modern web host.

---

## Method 1: Deploying via Vercel Web Dashboard (Recommended)

1. **Push to GitHub**:
   - Initialize a git repository if not already done:
     ```bash
     git init
     git add .
     git commit -m "Initial commit - UYZN Digital Hub"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/uyzn-digital-hub.git
     git push -u origin main
     ```

2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) and log in.
   - Select your GitHub repository `uyzn-digital-hub`.
   - Vercel will automatically detect **Vite** as the framework preset.

3. **Build Settings & Configuration**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables** (Optional for Gemini AI features):
   - Add Environment Variable:
     - `GEMINI_API_KEY`: *(Your Gemini API key from AI Studio / Google AI)*

5. **Deploy**:
   - Click **Deploy**. Vercel will compile the project and assign an official `.vercel.app` URL within 30 seconds!

---

## Method 2: Deploying via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Deploy directly from your terminal:
   ```bash
   vercel
   ```
   - Select your project scope and confirm `dist` as the build output directory.

3. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## Technical Build Commands

- **Development Server**: `npm run dev` (Runs backend Express server with Vite middleware on port 3000)
- **Production Build**: `npm run build` (Compiles React 19 app into `dist/` directory)
- **Type Checking**: `npm run lint` (`tsc --noEmit`)

---

## Features Included in Deployment

- Full static & dynamic single-page routing for all 10 public pages.
- Embedded local persistent database engine (`localStorage`) seeded with 18 catchment communities + 19th editable slot.
- Super Admin Dashboard with CSV/Excel export, printable PDF report generator, and audit logs.
- Community Coordinator Portal with community-isolated views.
- Public Member Verification & Digital ID Badge Generator.
- AI Career & TVET Skills Recommender.
