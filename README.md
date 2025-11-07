# Coming Soon Site

A meta "coming soon" page that says "coming soon is coming soon" because the coming soon page itself is elaborate and still being worked on.

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Deploy to Vercel

**Option 1: Using Vercel Dashboard (Recommended)**
1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the project
3. Vercel will automatically detect Next.js and deploy

**Option 2: Using Vercel CLI with Token**
```bash
export VERCEL_TOKEN=XLFfhVZS3nlkcOGMuDoD1HvT
vercel --token $VERCEL_TOKEN --prod --yes
```

**Option 3: Using the deployment script**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Option 4: Manual CLI login**
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- CSS3 (with animations)

