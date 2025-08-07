# Codetrain Client

A modern React-based frontend application for the Codetrain coding platform. This client provides an intuitive interface for competitive programming, algorithm practice, and coding contests.

<div align="center">
  <img src="./demo.gif" alt="CodeTrain API Demo" width="1280"/>
</div>

## Features

### 🎯 Core Functionality
- **Problem Solving**: Browse and solve coding problems with real-time code submission
- **Contests**: Participate in coding competitions with leaderboards and rankings
- **Organizations**: Manage and join coding organizations
- **User Profiles**: Personalized dashboards with progress tracking
- **Authentication**: Secure login/signup with Google OAuth integration

### 🛠 Technical Features
- **Real-time Updates**: WebSocket integration via ActionCable
- **Code Editor**: Syntax-highlighted code editor with multiple language support
- **Responsive Design**: Mobile-friendly Bootstrap-based UI
- **Rich Text Editor**: WYSIWYG editor for problem descriptions
- **State Management**: Redux for efficient application state handling

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **State Management**: Redux with Redux Thunk
- **Routing**: React Router DOM 6
- **UI Framework**: Bootstrap 5.3.3
- **Authentication**: Google OAuth, JWT tokens
- **Real-time Communication**: Rails ActionCable
- **Code Editor**: React Textarea Code Editor
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (version 22 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codetrain-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The application will open at [http://localhost:8000](http://localhost:8000).

### Docker Setup

For containerized development:

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   ```
   http://localhost:8000
   ```

## Available Scripts

### Development
- `npm start` - Runs the app in development mode on port 8000
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/           # React components
│   ├── Auth/            # Authentication components
│   ├── Contests/        # Contest-related components
│   ├── Problems/        # Problem-solving interface
│   ├── Organizations/   # Organization management
│   └── helpers/         # Utility components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── assets/              # Static assets
└── router.js           # Application routing configuration
```

## Key Routes

- `/dashboard` - Main user dashboard
- `/problems` - Browse coding problems
- `/contests` - View and participate in contests
- `/organizations` - Manage organizations (admin)
- `/profile` - User profile management
- `/login` & `/signup` - Authentication

## Environment Configuration

The application uses the following environment variables:

- `PORT` - Application port (default: 8000)
- `NODE_ENV` - Environment mode (development/production)

## Features Overview

### Problem Solving
- Browse problems by difficulty and category
- Submit solutions with real-time feedback
- View submission history and attempts
- Track solving progress

### Contests
- Join public and private contests
- Real-time leaderboards
- Contest-specific problems
- Results and rankings

### Organizations
- Create and manage coding organizations
- Organization-specific contests and problems
- Member management (admin features)

### User Management
- Google OAuth integration
- JWT-based authentication
- User profiles with statistics
- Progress tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Follow React best practices and hooks patterns
- Use functional components with hooks
- Maintain consistent code formatting
- Write descriptive commit messages
- Test components before submitting PRs

## Deployment

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Docker Deployment
```bash
docker build -t codetrain-client .
docker run -p 8000:8000 codetrain-client
```

## License

This project is private and proprietary. All rights reserved.

## Support

For questions and support, please contact the development team or create an issue in the repository.

---

Built with ❤️ using React and modern web technologies.