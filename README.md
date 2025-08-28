# Wheel Spinner

A fun, interactive wheel spinner built with React and Tailwind CSS. Add names to the wheel and spin to pick a winner! 

## Features

- 🎯 **Rigged Selection**: Always selects "Yasin" (shh, it's a secret!)
- 🎨 **Clean UI**: Modern, responsive design with Tailwind CSS
- ⚡ **Fast**: Built with Vite for lightning-fast development
- 🚀 **Auto-Deploy**: GitHub Actions pipeline for automatic deployment to GitHub Pages

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wheel-spinner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Setup GitHub Pages Deployment

1. Push your code to a GitHub repository
2. Go to your repository settings
3. Navigate to "Pages" in the sidebar
4. Under "Source", select "GitHub Actions"
5. Push to the `main` branch to trigger the deployment

Your app will be available at: `https://yourusername.github.io/wheel-spinner/`

## How It Works

The wheel spinner includes a special "rigged" algorithm that ensures "Yasin" is always selected as the winner, regardless of the spin. The wheel still spins realistically and appears random to observers!

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **GitHub Actions**: CI/CD pipeline for automatic deployment

## License

This project is open source and available under the [MIT License](LICENSE).
