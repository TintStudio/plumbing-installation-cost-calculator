// Import PRICING_DATA and LOCATION_DATA (assuming they are loaded in the global scope)

const Calculator = {
    calculate: function(inputs) {
        let baseCost = 0;
        
        // 1. Base Sq Ft Cost
        const sqftRange = PRICING_DATA.base_sqft_cost;
        const avgSqftCost = (sqftRange.min + sqftRange.max) / 2;
        baseCost += inputs.homeSize * avgSqftCost;

        // 2. Bathroom Cost
        const bathRange = PRICING_DATA.bathroom_cost;
        const avgBathCost = (bathRange.min + bathRange.max) / 2;
        baseCost += inputs.bathrooms * avgBathCost;

        // 3. Fixture Cost
        let fixtureCostTotal = 0;
        for (const [key, count] of Object.entries(inputs.fixtures)) {
            if (PRICING_DATA.fixtures[key]) {
                const range = PRICING_DATA.fixtures[key];
                const avg = (range.min + range.max) / 2;
                fixtureCostTotal += count * avg;
            }
        }
        baseCost += fixtureCostTotal;

        // 4. Complexity Multiplier
        const complexityMult = PRICING_DATA.multipliers.complexity[inputs.complexity] || 1.0;
        baseCost *= complexityMult;

        // 5. State/ZIP Multiplier
        let stateMult = PRICING_DATA.multipliers.states[inputs.state] || 1.0;
        let metroAdjustment = 1.0;

        if (inputs.zip) {
            const detection = LOCATION_DATA.detectStateFromZip(inputs.zip);
            if (detection) {
                stateMult = PRICING_DATA.multipliers.states[detection.state] || 1.0;
                metroAdjustment = PRICING_DATA.multipliers.metro_adjustment[detection.adjustment] || 1.0;
            }
        }

        const finalCost = baseCost * stateMult * metroAdjustment;

        // 6. Range Calculation (+/- 20% for Low/High)
        return {
            average: Math.round(finalCost),
            low: Math.round(finalCost * 0.8),
            high: Math.round(finalCost * 1.2),
            breakdown: {
                labor: Math.round(finalCost * 0.6), // 60% Labor approx
                materials: Math.round(finalCost * 0.4), // 40% Materials approx
                adjustments: {
                    state: stateMult,
                    metro: metroAdjustment,
                    complexity: complexityMult
                }
            }
        };
    }
};
