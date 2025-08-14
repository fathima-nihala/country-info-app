# **🌍 Country Information App**

A comprehensive web application that provides detailed information about countries worldwide. Built with a modern tech stack including React, TypeScript, Tailwind CSS, and Node.js with Express.

## **📖Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## **✨Features**

### **Backend Features**
- RESTful API endpoints for country data
- Integration with REST Countries API
- Advanced search and filtering capabilities
- Comprehensive error handling
- TypeScript support for type safety

### **Frontend Features**
- **Country List Page**: Display all countries with cards showing basic information
- **Real-time Clock**: Shows current time for each country (12-hour format)
- **Lazy Loading**: Infinite scroll with batch loading for optimal performance
- **Advanced Search**: Search by country name, capital city, region, and timezone
- **Region Filtering**: Filter countries by geographical regions
- **Country Detail Page**: Comprehensive country information display
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Loading States**: Smooth loading animations and error handling

## **🛠 Tech Stack**

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for API requests
- **Cors** - Cross-origin resource sharing

### **Frontend**
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### **External APIs**
- **REST Countries API** - Country data source

## **Prerequisites**

Before running this application, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**
- **Git**

## **Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/country-information-app.git
cd country-information-app
```

### **2. Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The backend server will start on `http://localhost:5000`

### **3. Frontend Setup**
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

## **API Endpoints**

### **Base URL**
```
http://localhost:4000/api
```

### **Available Endpoints**

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/countries` | Fetch all countries | - |
| GET | `/countries/:code` | Fetch country by code | `code` (path parameter) |
| GET | `/countries/region/:region` | Filter by region | `region` (path parameter) |
| GET | `/countries/search` | Advanced search | `name`, `capital`, `region`, `timezone` |

### **Example API Calls**

```bash
# Get all countries
GET /api/countries

# Get country by code
GET /api/countries/US

# Get countries by region
GET /api/countries/region/Asia

# Search countries
GET /api/countries/search?name=India&region=Asia
GET /api/countries/search?capital=Tokyo
GET /api/countries/search?timezone=UTC+05:30
```

### **Response Format**

```json
{
  "success": true,
  "data": [
    {
      "name": {
        "common": "India",
        "official": "Republic of India"
      },
      "code": "IN",
      "capital": ["New Delhi"],
      "region": "Asia",
      "population": 1380004385,
      "flags": {
        "png": "https://flagcdn.com/w320/in.png",
        "svg": "https://flagcdn.com/in.svg"
      },
      "currencies": {
        "INR": {
          "name": "Indian rupee",
          "symbol": "₹"
        }
      },
      "languages": {
        "hin": "Hindi",
        "eng": "English"
      },
      "timezones": ["UTC+05:30"]
    }
  ],
  "count": 1
}
```

## **Frontend Features**

### **Country List Page**
- **Card Layout**: Each country displayed in an attractive card format
- **Real-time Clock**: Shows current local time for each country
- **Infinite Scroll**: Load more countries automatically as you scroll
- **Batch Loading**: Efficient loading of countries in batches
- **Search Bar**: Real-time search functionality
- **Region Filter**: Dropdown to filter by geographical regions

### **Country Detail Page**
- **Comprehensive Information**: Population, languages, currencies, capital
- **High-quality Flag**: SVG flag display
- **Geographic Data**: Region, subregion, and neighboring countries
- **Time Information**: Current local time and timezone details
- **Navigation**: Easy navigation back to country list

### **Search & Filter Options**
- **By Name**: Search countries by their common or official names
- **By Capital**: Find countries by their capital cities
- **By Region**: Filter countries by geographical regions
- **By Timezone**: Search countries by their timezone

### **Responsive Design**
- **Mobile-first**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablet screens
- **Desktop Optimized**: Full-featured desktop experience
- **Cross-browser**: Compatible with all modern browsers

## **Project Structure**

```
country-information-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── countryController.ts
│   │   ├── routes/
│   │   │   └── countryRoutes.ts
│   │   ├── services/
│   │   │   └── countryService.ts
│   │   ├── types/
│   │   │   └── country.types.ts
│   │   ├── utils/
│   │   │   └── errorHandler.ts
│   │   └── app.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CountryCard/
│   │   │   ├── CountryDetail/
│   │   │   ├── SearchBar/
│   │   │   ├── FilterDropdown/
│   │   │   └── LoadingSpinner/
│   │   ├── pages/
│   │   │   ├── CountryList/
│   │   │   └── CountryDetail/
│   │   ├── hooks/
│   │   │   ├── useCountries.ts
│   │   │   └── useInfiniteScroll.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── country.types.ts
│   │   ├── utils/
│   │   │   └── timeUtils.ts
│   │   └── App.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```

## **Usage**

### **Running in Development Mode**

1. **Start Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Application**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

### **Building for Production**

#### **Backend**
```bash
cd backend
npm run build
npm start
```

#### **Frontend**
```bash
cd frontend
npm run build
npm run preview
```

### **Key Features Usage**

1. **Browse Countries**: Visit the homepage to see all countries in card format
2. **Search**: Use the search bar to find specific countries
3. **Filter**: Select regions from the dropdown to filter countries
4. **View Details**: Click on any country card to view detailed information
5. **Infinite Scroll**: Scroll down to automatically load more countries
6. **Real-time Clock**: View current local time for each country

## **Environment Variables**

### **Backend (.env)**
```env
PORT=5000
NODE_ENV=development
REST_COUNTRIES_API_URL=https://restcountries.com/v3.1
```

### **Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## **Scripts**

### **Backend Scripts**
```json
{
  "dev": "nodemon src/app.ts",
  "build": "tsc",
  "start": "node dist/app.js",
  "test": "jest"
}
```

### **Frontend Scripts**
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
}
```

## **Contributing**

We welcome contributions to improve this project! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Ensure responsive design compatibility
- Follow existing code style and conventions

## **Troubleshooting**

### **Common Issues**

1. **CORS Errors**: Ensure backend CORS configuration allows frontend origin
2. **API Rate Limits**: REST Countries API has rate limits; implement caching if needed
3. **Build Errors**: Ensure all dependencies are installed and TypeScript configuration is correct
4. **Styling Issues**: Verify Tailwind CSS is properly configured and imported

### **Getting Help**

If you encounter issues:
1. Check the browser console for error messages
2. Verify API endpoints are responding correctly
3. Ensure all environment variables are set
4. Check network requests in browser developer tools



## **Acknowledgments**

- [REST Countries API](https://restcountries.com/) for providing comprehensive country data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the powerful UI library
- [Vite](https://vitejs.dev/) for the fast build tool and development server

---

**Built with ❤️ by [Your Name]**