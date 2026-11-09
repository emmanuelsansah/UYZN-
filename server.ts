import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// API route for AI Web Copy Generation
app.post('/api/generate-copy', async (req, res) => {
  try {
    const { brandName, industry, tone, sectionType, customPrompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(400).json({ 
        error: 'GEMINI_API_KEY is not configured in server environment. Please set GEMINI_API_KEY in Secrets.' 
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `You are a world-class senior UX web copywriter & conversion strategist. Generate high-converting, realistic, anti-slop copy for a modern website section.

Context:
- Brand Name: ${brandName || 'Aura Studio'}
- Industry/Niche: ${industry || 'Digital Technology & Web Development'}
- Tone of Voice: ${tone || 'Architectural & Authoritative'}
- Section Type: ${sectionType || 'Hero Section'}
- Additional Brief: ${customPrompt || 'Create compelling headline and value statement'}

Return ONLY a valid JSON object matching this schema without markdown formatting:
{
  "headline": "Captivating headline statement (6-12 words, no orphan trailing words)",
  "subheadline": "Clear, precise value proposition (1-2 sentences explaining outcomes)",
  "primaryCta": "Action button text (2-4 words)",
  "secondaryCta": "Secondary button text (2-4 words)",
  "kicker": "Short category or domain indicator (2-3 words)",
  "bulletPoints": [
    "Specific outcome or feature claim with quantitative context",
    "Specific outcome or feature claim with quantitative context",
    "Specific outcome or feature claim with quantitative context"
  ],
  "socialProof": "1-sentence quantitative proof or testimonial statement",
  "metaDescription": "SEO meta description under 150 characters"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = {
        headline: text.slice(0, 80),
        subheadline: text.slice(0, 160),
        primaryCta: 'Request Studio Proposal',
        secondaryCta: 'Explore Case Studies',
        kicker: 'Digital Architecture',
        bulletPoints: [
          'Sub-300ms core web vital load performance across all viewports',
          'Custom design system with scalable component library',
          'Conversion-focused user flows with integrated analytics'
        ],
        socialProof: '+184% average increase in qualified inbound leads within 90 days.',
        metaDescription: text.slice(0, 145)
      };
    }

    return res.json({ success: true, data: parsedData });
  } catch (err: any) {
    console.error('API copy generation error:', err);
    return res.status(500).json({ error: err.message || 'Failed to generate web copy' });
  }
});

// API route for AI Site Audit & Strategy Recommendation
app.post('/api/audit-website', async (req, res) => {
  try {
    const { siteType, audience, targetGoal } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `You are a digital design auditor and conversion optimization expert. Provide a strategic design recommendations report for building a high-performing website.

Target Site Type: ${siteType || 'Custom SaaS / Web Platform'}
Target Audience: ${audience || 'B2B Enterprise decision makers'}
Primary Business Goal: ${targetGoal || 'High-intent lead generation and trial signups'}

Return ONLY a valid JSON object matching this schema without markdown wrapping:
{
  "uxRecommendations": [
    "Specific UX improvement recommendation detailing layout and spatial hierarchy",
    "Specific UX improvement recommendation detailing responsive and touch interactions",
    "Specific UX improvement recommendation detailing copy structure and CTA positioning"
  ],
  "colorPalette": {
    "primaryName": "Electric Cobalt",
    "primaryHex": "#1E40AF",
    "secondaryHex": "#0F172A",
    "accentHex": "#F59E0B",
    "rationale": "High contrast deep canvas with authoritative primary CTA focus."
  },
  "typographyPairing": {
    "display": "Plus Jakarta Sans",
    "body": "DM Sans",
    "rationale": "Crisp geometric display for authoritative headers paired with warm readable sans."
  },
  "keySections": [
    "Hero Section with dynamic 16:9 media asset and 1-line CTA",
    "Bento Grid detailing 4 core architectural capabilities",
    "Quantified Case Studies with proof adjacency metrics",
    "Interactive Project Brief & Pricing Calculator"
  ],
  "conversionHooks": [
    "Single-line explicit CTA button stating exact output",
    "Social proof metrics placed immediately adjacent to service claims"
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = {
        uxRecommendations: [
          'Maintain strict 3-zone header layout with unboxed typography',
          'Use asymmetric bento grid for primary feature hierarchy',
          'Implement single-line CTA controls with zero text truncation'
        ],
        colorPalette: {
          primaryName: 'Electric Blue',
          primaryHex: '#2563EB',
          secondaryHex: '#0F172A',
          accentHex: '#F59E0B',
          rationale: 'Subtle slate neutral field with vibrant focal accent.'
        },
        typographyPairing: {
          display: 'Plus Jakarta Sans',
          body: 'DM Sans',
          rationale: 'Clean modern sans pair with tabular numerical support.'
        },
        keySections: [
          'Hero Section', 'Capabilities Grid', 'Case Studies', 'Interactive Estimator'
        ],
        conversionHooks: [
          'Direct outcome CTA buttons', 'Adjacent quantitative proof'
        ]
      };
    }
    return res.json({ success: true, data: parsedData });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Audit failed' });
  }
});

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
