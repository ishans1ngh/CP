# AI-Powered Weather Dashboard

A sophisticated weather application that uses artificial intelligence to provide personalized weather recommendations based on real-time weather data.

## Features

### Real-Time Weather Data
- Current weather conditions for any city worldwide
- 5-day weather forecast with detailed temperature ranges
- Live weather icons and dynamic background colors based on temperature
- Wind speed, humidity, UV index, and weather condition tracking

### AI-Powered Recommendations
The app uses advanced AI to analyze multiple weather parameters and provide personalized recommendations:
- Temperature analysis
- Humidity considerations
- Wind speed warnings
- UV index protection advice
- Personalized clothing suggestions
- Activity recommendations
- Health and safety tips

### City Information
- Automatic city facts from Wikipedia
- City images and descriptions
- Geographic context

## Technology Stack

### Frontend
- Vanilla JavaScript with jQuery
- Moment.js for date formatting
- Animate.css for smooth animations
- Responsive design with glassmorphism effects

### Backend
- Supabase Edge Functions powered by Deno
- PostgreSQL database for storing recommendation history
- AI integration using Claude API (with intelligent fallback)

### APIs Used
- WeatherAPI for current weather data
- OpenWeatherMap for 5-day forecasts
- Wikipedia API for city information
- Anthropic Claude API for AI recommendations

## How It Works

1. User enters a city name or uses the default city
2. Weather data is fetched from multiple APIs
3. The app sends weather parameters to the AI edge function
4. AI analyzes temperature, humidity, wind speed, and UV index
5. Personalized recommendations are generated and displayed
6. All recommendations are stored in the database for analysis

## Setup

1. The application is pre-configured with Supabase
2. Simply open index.html in a web browser
3. Or run the Python server: `python3 server.py`

## Database Schema

The app uses a PostgreSQL database with Row Level Security enabled:
- `weather_recommendations` table stores all AI-generated recommendations
- Each entry includes city, weather parameters, and the AI recommendation
- Public read access for transparency
- Automatic timestamp tracking

## AI Fallback System

If the AI service is unavailable, the app automatically falls back to a rule-based recommendation system that provides intelligent suggestions based on weather thresholds.