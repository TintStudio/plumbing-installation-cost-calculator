document.addEventListener('DOMContentLoaded', () => {
    const stateSelect = document.getElementById('input-state');
    const zipInput = document.getElementById('input-zip');
    const sqftInput = document.getElementById('input-sqft');
    const bathInput = document.getElementById('input-baths');
    const sinkInput = document.getElementById('input-sinks');
    const toiletInput = document.getElementById('input-toilets');
    const showerInput = document.getElementById('input-showers');
    const heaterInput = document.getElementById('input-heaters');
    const calcBtn = document.getElementById('btn-calculate');
    const resetBtn = document.getElementById('btn-reset');
    const complexityBtns = document.querySelectorAll('.complexity-btn');
    const zipBadge = document.getElementById('zip-badge');
    const stepsContainer = document.getElementById('calculator-steps');
    const resultsContainer = document.getElementById('calculator-results');
    const leadGenContainer = document.getElementById('lead-gen');

    let selectedComplexity = 'medium';

    // 1. Populate States
    if (typeof STATE_MAPPING !== 'undefined') {
        STATE_MAPPING.all_states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            option.className = "text-[#0d1f35]";
            stateSelect.appendChild(option);
        });
    }

    // 2. Complexity Selection
    complexityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            complexityBtns.forEach(b => { b.classList.remove('border-orange-400', 'bg-white/20'); b.classList.add('border-white/20', 'bg-white/5'); });
            btn.classList.remove('border-white/20', 'bg-white/5');
            btn.classList.add('border-orange-400', 'bg-white/20');
            selectedComplexity = btn.dataset.val;
        });
    });

    // 3. ZIP Code Detection
    zipInput.addEventListener('input', (e) => {
        const zip = e.target.value;
        if (zip.length === 5) {
            const detection = LOCATION_DATA.detectStateFromZip(zip);
            if (detection) {
                stateSelect.value = detection.state;
                zipBadge.classList.remove('hidden');
                zipBadge.textContent = detection.city !== "Unknown" ? `Detected: ${detection.city}` : "Detected";
                stateSelect.classList.add('opacity-50');
            } else {
                zipBadge.classList.add('hidden');
                stateSelect.classList.remove('opacity-50');
            }
        } else {
            zipBadge.classList.add('hidden');
            stateSelect.classList.remove('opacity-50');
        }
    });

    // 4. Calculate Action
    calcBtn.addEventListener('click', () => {
        const inputs = {
            state: stateSelect.value,
            zip: zipInput.value,
            homeSize: parseFloat(sqftInput.value) || 0,
            bathrooms: parseFloat(bathInput.value) || 0,
            fixtures: {
                sink: parseFloat(sinkInput.value) || 0,
                toilet: parseFloat(toiletInput.value) || 0,
                shower: parseFloat(showerInput.value) || 0,
                water_heater: parseFloat(heaterInput.value) || 0
            },
            complexity: selectedComplexity
        };

        if (!inputs.state && !inputs.zip) {
            alert("Please select a state or enter a ZIP code.");
            return;
        }

        const result = Calculator.calculate(inputs);
        displayResults(result, inputs);
    });

    function displayResults(data, inputs) {
        stepsContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        leadGenContainer.classList.remove('hidden');

        document.getElementById('res-total').textContent = `$${data.average.toLocaleString()}`;
        document.getElementById('res-low').textContent = `$${data.low.toLocaleString()}`;
        document.getElementById('res-high').textContent = `$${data.high.toLocaleString()}`;
        document.getElementById('res-labor').textContent = `$${data.breakdown.labor.toLocaleString()}`;
        document.getElementById('res-materials').textContent = `$${data.breakdown.materials.toLocaleString()}`;
        document.getElementById('res-adj-region').textContent = `${data.breakdown.adjustments.state}x (State) / ${data.breakdown.adjustments.metro}x (City)`;

        if (inputs.zip) {
            document.getElementById('lead-zip').value = inputs.zip;
        }

        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // 5. Reset Action
    resetBtn.addEventListener('click', () => {
        stepsContainer.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
        leadGenContainer.classList.add('hidden');
        sqftInput.value = '';
        bathInput.value = '';
        zipInput.value = '';
        stateSelect.value = '';
        sinkInput.value = '0';
        toiletInput.value = '0';
        showerInput.value = '0';
        heaterInput.value = '0';
        stateSelect.classList.remove('opacity-50');
        zipBadge.classList.add('hidden');
    });
});
