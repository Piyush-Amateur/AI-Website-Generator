# Smart Genesis - AI Website Generator

A modern, production-ready AI-powered website generator that creates beautiful, professional websites using OpenAI's GPT models.

## 🌟 Features

- **AI-Powered Generation**: Uses OpenAI GPT-4o-mini to generate custom websites
- **Real-time Preview**: Instant preview of generated websites in an isolated iframe
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Dark Mode**: Toggle between light and dark themes
- **Customizable**: Specify business details, industry, target audience, and color themes
- **Section Selection**: Choose which sections to include (About, Services, Products, etc.)
- **Production Ready**: Clean code, error handling, validation, and security measures

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client
- **Vanilla CSS** - Custom design system with CSS variables

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **OpenAI API** - AI code generation
- **Helmet** - Security middleware
- **Express Rate Limit** - API rate limiting

## 📋 Prerequisites

- Node.js 16+ and npm
- OpenAI API key

## 🛠️ Installation

### 1. Clone the repository
```bash
cd "d:/AI Website Builder OpenAI"
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd server
npm install
cd ..
```

### 4. Configure environment variables
The OpenAI API key is already configured in `server/.env`:
```env
OPENAI_API_KEY=your_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

## 🎯 Usage

### Development Mode

1. **Start the backend server** (in one terminal):
```bash
cd server
npm run dev
```

2. **Start the frontend** (in another terminal):
```bash
npm run dev
```

3. **Open your browser** and navigate to:
```
http://localhost:5173
```

### Production Build

1. **Build the frontend**:
```bash
npm run build
```

2. **Start the backend**:
```bash
cd server
npm start
```

## 📁 Project Structure

```
d:/AI Website Builder OpenAI/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── BusinessForm.jsx     # Input form for business details
│   │   ├── PreviewWindow.jsx    # Live preview component
│   │   ├── Loader.jsx           # Loading animation
│   │   └── ErrorBanner.jsx      # Error display
│   ├── services/                # API services
│   │   └── api.js               # API client
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Global styles
│   └── main.jsx                 # App entry point
├── server/                       # Backend source code
│   ├── controllers/             # Request handlers
│   │   └── generateController.js
│   ├── services/                # Business logic
│   │   └── openaiService.js     # OpenAI integration
│   ├── routes/                  # API routes
│   │   └── generateRoute.js
│   ├── middleware/              # Express middleware
│   │   └── rateLimiter.js
│   ├── utils/                   # Utility functions
│   │   ├── promptBuilder.js     # AI prompt construction
│   │   ├── sanitizer.js         # Code sanitization
│   │   └── validator.js         # Input validation
│   ├── .env                     # Environment variables
│   ├── server.js                # Server entry point
│   └── package.json             # Backend dependencies
├── index.html                   # HTML template
├── package.json                 # Frontend dependencies
├── vite.config.js               # Vite configuration
└── README.md                    # This file
```

## 🎨 Features in Detail

### Business Form
- Business name, industry, and target audience inputs
- Color theme customization
- Section selection (About, Services, Products, Contact, Testimonials, Gallery)
- Form validation

### AI Generation
- Uses OpenAI GPT-4o-mini model
- Generates React code using `React.createElement()` syntax
- Creates modern, responsive designs
- Includes inline styles with gradients and animations

### Preview Window
- Isolated iframe for safe code execution
- Real-time rendering
- Error handling with user-friendly messages
- Responsive preview

### Security
- Input validation and sanitization
- Rate limiting (5 requests per 15 minutes)
- Helmet security headers
- CORS protection
- Code sanitization to prevent XSS

## 🔧 Configuration

### Environment Variables

**Backend** (`server/.env`):
- `OPENAI_API_KEY` - Your OpenAI API key
- `PORT` - Server port (default: 5000)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:5173)

### Rate Limiting
Default: 5 requests per 15 minutes per IP
Configure in `server/middleware/rateLimiter.js`

## 🎨 Customization

### Styling
All styles are in `src/index.css` using CSS custom properties (variables).
Modify the `:root` section to change colors, spacing, shadows, etc.

### AI Prompt
Customize the AI generation prompt in `server/utils/promptBuilder.js`

## 🐛 Troubleshooting

### Backend won't start
- Ensure Node.js 16+ is installed
- Check if port 5000 is available
- Verify OpenAI API key is set in `.env`

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in `server/server.js`
- Verify `CLIENT_URL` in backend `.env`

### OpenAI API errors
- Check API key validity
- Verify account has credits
- Check rate limits on OpenAI dashboard

## 📝 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

## 📧 Support

For issues or questions, please check the troubleshooting section above.

---

**Built with ❤️ using React, Node.js, and OpenAI**
