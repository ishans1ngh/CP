# Weather App - Live Weather Dashboard

## Overview
A beautiful, interactive weather application that provides real-time weather information along with temperature-based suggestions and historical facts for any location worldwide.

## Features
- **Live Weather Data**: Real-time weather information including temperature, conditions, wind speed, and weather icons
- **Temperature-Based Suggestions**: Smart recommendations based on current temperature (what to wear, activities to do, safety tips)
- **Historical Facts**: Fun historical events that happened on the current date, fetched from the History Muffin Labs API
- **Dynamic Background**: Background color changes based on temperature (icy, cold, pleasant, hot)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Glassmorphism UI**: Modern, beautiful card-based interface with blur effects

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Libraries**: jQuery, Moment.js
- **APIs**:
  - WeatherAPI.com for weather data
  - History Muffin Labs API for historical facts
- **Server**: Python 3.11 (simple HTTP server on port 5000)

## Project Structure
```
.
├── index.html       # Main application file (HTML + CSS + JS)
├── server.py        # Python HTTP server
├── replit.md        # This documentation file
└── .gitignore       # Git ignore configuration
```

## How It Works

### Weather Information
1. User enters a city name or uses the default (Pune)
2. App fetches weather data from WeatherAPI.com
3. Displays temperature, conditions, wind speed, and weather icon
4. Background gradient changes based on temperature

### Temperature Suggestions
Based on the current temperature, the app provides personalized suggestions:
- **Below 0°C**: Heavy winter clothing, stay indoors, watch for ice
- **0-15°C**: Jacket/sweater, perfect for walks, coffee weather
- **15-30°C**: Light clothing, outdoor activities, picnics
- **Above 30°C**: Light breathable clothing, stay hydrated, avoid peak hours

### Historical Facts
- Fetches events that happened on the current date throughout history
- Displays 3 random historical events from different years
- Data sourced from Wikipedia via History Muffin Labs API

## APIs Used

### WeatherAPI.com
- **Endpoint**: `http://api.weatherapi.com/v1/current.json`
- **Purpose**: Real-time weather data
- **Data**: Temperature, conditions, wind speed, weather icons

### History Muffin Labs
- **Endpoint**: `https://history.muffinlabs.com/date/{month}/{day}`
- **Purpose**: Historical events by date
- **Data**: Events, births, deaths from history
- **License**: Wikipedia data (CC BY-SA 3.0)

## Development

### Running Locally
The app runs on port 5000 using a Python HTTP server:
```bash
python server.py
```

### Configuration
- Server binds to `0.0.0.0:5000` for Replit compatibility
- Cache-Control headers disabled to ensure fresh content in iframe previews

## Recent Changes (November 5, 2025)
- Added Temperature Suggestions box with dynamic recommendations
- Integrated Historical Facts API for daily trivia
- Redesigned layout to accommodate three boxes in responsive grid
- Enhanced UI with new card styles and animations
- Improved mobile responsiveness

## User Preferences
- Default city: Pune (can be changed by entering any city name)
- Temperature unit: Celsius (°C)

## Credits
Created by **Ishan, Karn and Hemant** | 2025 ©

Enhanced with additional features for improved user experience.
