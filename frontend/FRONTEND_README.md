# Seat Reservation System - Frontend

A modern React-based frontend for the Seat Reservation System for Interns, built with Redux for state management and Tailwind CSS for styling.

## 🚀 Features

### Admin Dashboard

-   **System Overview**: Real-time dashboard with statistics
-   **Seat Management**: Add, edit, delete, and manage seats
-   **Manual Seat Assignment**: Assign seats to interns manually
-   **Recent Activities**: Track all system activities
-   **Real-time Updates**: Live updates using Redux state management

### Components

-   **Responsive Design**: Works on desktop, tablet, and mobile
-   **Modern UI**: Clean and intuitive interface with Tailwind CSS
-   **Toast Notifications**: User-friendly feedback system
-   **Loading States**: Smooth loading indicators
-   **Form Validation**: Client-side validation with custom hooks
-   **Error Handling**: Comprehensive error handling and display

### State Management

-   **Redux Toolkit**: Modern Redux implementation
-   **Async Thunks**: Handle API calls with loading and error states
-   **Centralized State**: All admin functionality in dedicated slice
-   **Auto-refresh**: Automatic data refresh after operations

## 🛠️ Tech Stack

-   **React** 18+ - Frontend framework
-   **Redux Toolkit** - State management
-   **Tailwind CSS** - Styling framework
-   **Lucide React** - Icon library
-   **Axios** - HTTP client
-   **Vite** - Build tool and dev server

## 📋 Prerequisites

-   Node.js 16+ and npm
-   Backend API server running on `http://localhost:5000`

## 🔧 Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd seat-reservation-system-for-interns/frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    ```bash
    cp .env.example .env
    ```

    Edit `.env` with your configuration:

    ```env
    REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
    REACT_APP_ENVIRONMENT=development
    REACT_APP_APP_NAME=Seat Reservation System
    ```

4. **Start the development server**

    ```bash
    npm run dev
    ```

5. **Open your browser**
    ```
    http://localhost:5173
    ```

## 📁 Project Structure

```
frontend/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable components
│   │   ├── Toast.jsx         # Toast notification system
│   │   ├── Loading.jsx       # Loading components
│   │   ├── navbar.jsx        # Navigation bar
│   │   └── footer.jsx        # Footer component
│   ├── pages/                # Page components
│   │   └── dashboards/
│   │       └── admin/
│   │           └── adminOverview.jsx  # Main admin dashboard
│   ├── redux/                # Redux store and slices
│   │   ├── store.js         # Redux store configuration
│   │   ├── adminSlice.js    # Admin functionality slice
│   │   └── loginSlice.js    # Authentication slice
│   ├── hooks/                # Custom React hooks
│   │   └── index.js         # Form, modal, and utility hooks
│   ├── utils/                # Utility functions
│   │   └── api.js           # Axios configuration
│   ├── assets/              # Images and static files
│   ├── App.jsx              # Main app component
│   └── main.jsx             # App entry point
├── API_DOCUMENTATION.md      # Backend API documentation
├── .env.example             # Environment variables template
└── package.json             # Project dependencies
```

## 🔌 API Integration

The frontend is designed to work with a RESTful API. See `API_DOCUMENTATION.md` for complete endpoint specifications.

### Key API Endpoints Used:

-   `GET /admin/stats` - Dashboard statistics
-   `GET /admin/seats` - Get all seats
-   `POST /admin/seats` - Add new seat
-   `PUT /admin/seats/:id` - Update seat
-   `DELETE /admin/seats/:id` - Delete seat
-   `GET /admin/interns` - Get all interns
-   `POST /admin/assignments` - Create seat assignment
-   `GET /admin/activities` - Get recent activities

### Authentication

All API calls include JWT token in Authorization header:

```javascript
Authorization: Bearer <jwt_token>
```

## 🎯 Admin Overview Features

### Dashboard Statistics

-   Total seats count
-   Available seats
-   Occupied seats
-   Maintenance seats
-   Active interns count

### Quick Actions

-   **Add New Seat**: Create seats with validation
-   **Manual Assignment**: Assign seats to interns with date/time selection

### Real-time Activities

-   Seat assignments
-   New seat additions
-   Maintenance updates
-   System activities

### Form Validation

-   Required field validation
-   Seat number format validation (A01, B02, etc.)
-   Date validation (future dates only)
-   Error display and handling

### User Experience

-   Loading states for all operations
-   Success/error toast notifications
-   Responsive modal dialogs
-   Smooth animations and transitions

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style

-   ESLint configuration included
-   Consistent component structure
-   Custom hooks for reusable logic
-   Proper error boundaries

### State Management Patterns

```javascript
// Using Redux with async thunks
const dispatch = useDispatch();
const { seats, seatsLoading, seatsError } = useSelector((state) => state.admin);

// Dispatch async action
dispatch(fetchSeats());

// Handle form submission
const handleSubmit = (formData) => {
    dispatch(addSeat(formData));
};
```

### Custom Hooks Usage

```javascript
// Form management
const { values, errors, handleChange, validate } = useForm(
    initialValues,
    validationRules
);

// Modal state
const { isOpen, open, close } = useModal();

// Toast notifications
const { showSuccess, showError } = useToast();
```

## 🚨 Error Handling

### API Errors

-   Automatic token refresh on 401 errors
-   User-friendly error messages
-   Retry mechanisms for failed requests

### Form Validation

-   Real-time validation
-   Field-level error display
-   Submit prevention on validation errors

### Loading States

-   Component-level loading indicators
-   Global loading overlay for major operations
-   Skeleton loading for data fetching

## 🔐 Security

-   JWT token storage in localStorage
-   Automatic logout on token expiration
-   API request interceptors for authentication
-   Input sanitization and validation

## 📱 Responsive Design

-   Mobile-first approach
-   Tablet and desktop optimizations
-   Touch-friendly interface
-   Adaptive modal sizing

## 🧪 Testing

### Component Testing

```bash
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Testing Guidelines

-   Test all form validations
-   Test Redux actions and reducers
-   Test component rendering and interactions
-   Mock API calls for testing

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables for Production

```env
REACT_APP_API_BASE_URL=https://your-api-domain.com/api/v1
REACT_APP_ENVIRONMENT=production
```

### Deployment Options

-   **Vercel**: Automatic deployment from Git
-   **Netlify**: Static site hosting
-   **AWS S3 + CloudFront**: Scalable hosting
-   **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**

    - Check if backend server is running
    - Verify REACT_APP_API_BASE_URL in .env
    - Check CORS configuration on backend

2. **Authentication Issues**

    - Clear localStorage and login again
    - Check JWT token expiration
    - Verify backend authentication endpoints

3. **Build Issues**
    - Clear node_modules and reinstall
    - Check Node.js version compatibility
    - Verify all environment variables

### Getting Help

-   Check the console for error messages
-   Review the API documentation
-   Examine network requests in browser dev tools
-   Check Redux DevTools for state issues

## 📞 Support

For support, please contact the development team or create an issue in the repository.
