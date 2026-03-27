const PRICING_DATA = {
    base_sqft_cost: { min: 8, max: 15 },
    bathroom_cost: { min: 1500, max: 6000 },
    fixtures: {
        sink: { min: 150, max: 600 },
        toilet: { min: 200, max: 800 },
        shower: { min: 800, max: 3500 },
        water_heater: { min: 900, max: 3500 },
        repipe: { min: 4000, max: 15000 }
    },
    multipliers: {
        complexity: {
            low: 1.0,
            medium: 1.2,
            high: 1.5
        },
        states: {
            // LOW COST (0.80 - 0.95)
            "Texas": 0.85, "Oklahoma": 0.80, "Arkansas": 0.82, "Alabama": 0.85, 
            "Mississippi": 0.80, "Kansas": 0.88, "Missouri": 0.90,
            // MEDIUM COST (1.00 - 1.20)
            "Florida": 1.10, "Georgia": 1.05, "North Carolina": 1.00, "Ohio": 1.00, 
            "Arizona": 1.15, "Nevada": 1.20, "Tennessee": 1.05,
            // HIGH COST (1.25 - 1.50)
            "California": 1.45, "New York": 1.50, "Washington": 1.35, "New Jersey": 1.40, 
            "Massachusetts": 1.45, "Colorado": 1.30,
            // Default for others
            "Default": 1.00
        },
        metro_adjustment: {
            low: 1.10,
            medium: 1.25,
            high: 1.40
        }
    }
};

const STATE_MAPPING = {
    // 50-state mapping logic or ZIP detection
    // For now, a simple list of all 50 states for the dropdown
    all_states: [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
        "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
        "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
        "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
        "Wisconsin", "Wyoming"
    ]
};
