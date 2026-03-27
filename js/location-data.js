const LOCATION_DATA = {
    zip_mapping: {
        "10001": { city: "New York City", state: "New York", adjustment: "high" },
        "90001": { city: "Los Angeles", state: "California", adjustment: "high" },
        "77001": { city: "Houston", state: "Texas", adjustment: "medium" },
        "33101": { city: "Miami", state: "Florida", adjustment: "medium" },
        // Expanded logic for major metros
        "94101": { city: "San Francisco", state: "California", adjustment: "high" },
        "98101": { city: "Seattle", state: "Washington", adjustment: "high" },
        "60601": { city: "Chicago", state: "Illinois", adjustment: "medium" }
    },
    state_to_zip_prefix: {
        "NY": "10", "CA": "90", "TX": "77", "FL": "33", "IL": "60", "WA": "98"
    },
    detectStateFromZip: function(zip) {
        if (this.zip_mapping[zip]) return this.zip_mapping[zip];
        
        // Simple prefix check for state detection if exact ZIP not found
        const prefix = zip.substring(0, 2);
        for (const [state, p] of Object.entries(this.state_to_zip_prefix)) {
            if (p === prefix) return { state: state, city: "Unknown", adjustment: "none" };
        }
        return null;
    }
};
