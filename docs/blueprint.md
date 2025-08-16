# **App Name**: AviaSim

## Core Features:

- Flight Search UI: Implement UI elements for selecting origin and destination airports from a dropdown menu, and choosing a date from a calendar.
- Load Flight Data: Load flight data from a local JSON file containing flight details like airline, origin, destination, date, departure time, arrival time, and price.
- Display Flight Results: Filter and display flight results in styled cards based on user search criteria. Display will include a 'Book' button.
- Flight Detail Modal: Display a modal with detailed flight information upon clicking the 'Book' button on a flight card.
- Simulated Cart: Implement a 'Confirm' button in the modal to simulate adding the flight to a temporary cart (in-memory, not persistent).
- Cart Counter: Display a counter in the header showing the number of flights currently in the simulated cart.

## Style Guidelines:

- Primary color: Sky blue (#78B0F2) to evoke feelings of air travel and openness. This color conveys trust and reliability, which are important for a flight booking app.
- Background color: Light gray (#F0F4F7), which will create a clean and modern backdrop for the flight listings and other UI elements.
- Accent color: Coral orange (#F27878), which will draw attention to key interactive elements like the 'Search Flights' and 'Book' buttons.
- Body and headline font: 'Inter', a grotesque-style sans-serif, providing a clean and modern aesthetic suitable for both headlines and body text. 
- Use simple, consistent icons for flight details like departure/arrival times and locations.
- Card-based layout for flight listings, ensuring clear presentation of flight information.
- Subtle transition animations for loading flight data and displaying the modal.