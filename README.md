# term-project-hkmin-jelias7-nhkim-atang44 README

## Project Overview

### Project Name
**Music@Brown**

### Project Description
Music@Brown is a dynamic web application tailored for music enthusiasts to gain expose to small aritsts and events happening here at Brown. It provides a platform to explore and manage musical events, artist profiles, and integrates seamlessly with Spotify's API for enriched music-related content. The site uses an algorithm that takes into account users most listened to genres and current location to provide them with artist and event recommendations. The application is built using React for frontend development with Firebase for backend services, ensuring a robust and scalable architecture.

### Team Members and Contributions
- **Nick Kim (nhkim)**: Led the frontend development and integration and helped develop the backend infrastructure using Firebase. 
- **Henry Min (hkmin)**: Developed the backend infrastructure using Node.js and Firebase. Implemented data storage, retrieval, and authentication mechanisms.
- **Albert Tang (atang44)**: Developed the login/authentication system and worked on the algorithm
- **Johannes Elias (jelias7)**: focused on designing the algorithm and event location functionality through mapbox

**Total Estimated Time:** Approximately 100 hours.

**Repository Link:** [Music@Brown GitHub](https://github.com/cs0320-f23/term-project-hkmin-jelias7-nhkim-atang44)

## Design Choices

### High-Level Program Architecture
The application's architecture is divided into two primary segments:

**Frontend Development:**
- Implemented using React.js for its efficient rendering and state management capabilities.
- Spotify API is integrated to fetch real-time data about artists and users listening history.
- Responsive design principles are applied for optimal user experience.

**Backend Development:**
- Node.js is chosen for its scalability and compatibility with Firebase.
- Firebase Firestore is used for real-time database operations.
- Firebase Authentication handles secure user login and authentication processes.

### Data Flow and Component Structure
The application adopts a modular component structure, facilitating maintainability and scalability. Data flows from Firebase to the React frontend via custom hooks, ensuring real-time updates and efficient state management.

### Class/Interface Relationships
- `Artist`: Manages artist-related data, interacts with Spotify API for detailed information.
- `Event`: Handles event details including venue, date, and associated artists, leveraging Firebase for data persistence.
- `UserLogin`: Manages user sessions, handling authentication and state across the application.

### Data Structures
- **Maps and Hash Tables**: Used for efficient retrieval and storage of artist and event data.
- **Arrays and Lists**: Utilized in React state management and for handling collections of artists and events.

## Runtime and Space Optimizations
- **Efficient Firebase Queries**: Optimized queries to minimize data transfer and enhance performance.
- **State Management**: Utilized React's Context API for efficient state management and minimizing unnecessary renders.

## Errors and Bugs

### Known Bugs and Reproduction Steps
1. **Sorting may reset after going to a new page:**
   - **Reproduction Steps:** login with spotify, go to different parts of the website
   - **Effect:** sorting may be reset
   - **Status:** Not fixed yet but should be fixed by modifying some state variable

## Testing: N/A

## Building and Running the Program
- **Build Instructions:** Use `npm install` to compile the project and install the necessary dependencies (run the command in both the frontend and back end folders)
- **Running Locally:** Start the application using `npm run dev`. Ensure environment variables for Firebase and Spotify API are set.