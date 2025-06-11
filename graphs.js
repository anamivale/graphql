export async function getProjectsAndXp(token) {
    const response = await fetch('https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `
        {
  transaction(where: {eventId: {_eq: 75}, type : {_eq: "xp"}, amount:{_gt:1000}}) {
    amount
    path
  }
}
      `
        })
    });

    const resData = await response.json();
    const data = resData.data.transaction

    const projects = data.map(item => item.path.split("/").pop());
    const amounts = data.map(item => item.amount);

    // SVG dimensions and margins
    const svg = document.getElementById("barChart");
    const width = svg.getAttribute("width");
    const height = svg.getAttribute("height");
    const padding = 50;
    const barWidth = 5;
    const gap = 20;
    const maxY = Math.max(...amounts);


    const longestLabel = projects.reduce((a, b) => a.length > b.length ? a : b, '');
    const estimatedLabelHeight = longestLabel.length * 5;

    // Increase SVG height if needed
    const minRequiredHeight = parseInt(height) + estimatedLabelHeight;
    if (parseInt(height) < minRequiredHeight) {
        svg.setAttribute("height", minRequiredHeight);
    }

    data.forEach((item, i) => {
        const barHeight = (item.amount / maxY) * (height - 2 * padding);

        // Bar
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", padding + i * (barWidth + gap));
        rect.setAttribute("y", height - padding - barHeight);
        rect.setAttribute("width", barWidth);
        rect.setAttribute("height", barHeight);
        rect.setAttribute("fill", "#6694BA");
        svg.appendChild(rect);

        // Labels 
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const labelX = padding + i * (barWidth + gap) + barWidth / 2;
        const labelY = height - padding + 15;
        label.setAttribute("x", labelX);
        label.setAttribute("y", labelY);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("transform", `rotate(-45, ${labelX}, ${labelY})`);
        label.setAttribute("font-size", "12"); // Ensure readable size
        label.setAttribute("fill", "#333"); // Ensure good contrast
        label.textContent = item.path.split("/").pop();
        svg.appendChild(label);

        // Value above bar (unchanged)
        const value = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const valueX = padding + i * (barWidth + gap) + barWidth / 2;
        const valueY = height - padding - barHeight - 25;
        value.setAttribute("x", valueX);
        value.setAttribute("y", valueY);
        value.setAttribute("text-anchor", "middle");
        value.setAttribute("transform", `rotate(-90, ${valueX}, ${valueY})`);
        value.textContent = `${item.amount / 1000} kb`;
        svg.appendChild(value);
    });

    // y-axis line (unchanged)
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", padding);
    yAxis.setAttribute("y1", padding);
    yAxis.setAttribute("x2", padding);
    yAxis.setAttribute("y2", height - padding);
    yAxis.setAttribute("stroke", "#333");
    svg.appendChild(yAxis);

    // x-axis line (unchanged)
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", padding);
    xAxis.setAttribute("y1", height - padding);
    xAxis.setAttribute("x2", width - padding / 2);
    xAxis.setAttribute("y2", height - padding);
    xAxis.setAttribute("stroke", "#333");
    svg.appendChild(xAxis);
}



export function createPieChart(sumDownRatio, sumUpRatio, auditRatio) {
    
            const svg = document.getElementById("pieChart");
            const centerX = 200;
            const centerY = 200;
            const radius = 150;
            
       const data = [
            { label: 'Up', value: sumUpRatio, color: '#667eea' },
            { label: 'Down', value: sumDownRatio, color: '#764ba2' }
        ];
            
            // Calculate total
            const total = data.reduce((sum, item) => sum + item.value, 0);
            let currentAngle = -90; // Start from top
            
            data.forEach((item, index) => {
                const percentage = (item.value / total) * 100;
                const sliceAngle = (item.value / total) * 360;
                
                // Calculate path coordinates
                const startAngle = currentAngle * (Math.PI / 180);
                const endAngle = (currentAngle + sliceAngle) * (Math.PI / 180);
                
                const x1 = centerX + radius * Math.cos(startAngle);
                const y1 = centerY + radius * Math.sin(startAngle);
                const x2 = centerX + radius * Math.cos(endAngle);
                const y2 = centerY + radius * Math.sin(endAngle);
                
                const largeArcFlag = sliceAngle > 180 ? 1 : 0;
                
                const pathData = `
                    M ${centerX} ${centerY}
                    L ${x1} ${y1}
                    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                    Z
                `;
                
                // Create path element
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', pathData);
                path.setAttribute('fill', item.color);
                path.setAttribute('class', 'pie-slice');
                svg.appendChild(path);
                
                // Add label with percentage if slice is large enough
                if (percentage > 5) {
                    const labelAngle = currentAngle + sliceAngle / 2;
                    const labelRadius = radius * 0.7;
                    const labelX = centerX + labelRadius * Math.cos(labelAngle * (Math.PI / 180));
                    const labelY = centerY + labelRadius * Math.sin(labelAngle * (Math.PI / 180));
                    
                    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    text.setAttribute('x', labelX);
                    text.setAttribute('y', labelY - 5);
                    text.setAttribute('class', 'slice-label');
                    text.textContent = item.label;
                    svg.appendChild(text);
                    
                    const percentText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    percentText.setAttribute('x', labelX);
                    percentText.setAttribute('y', labelY + 8);
                    percentText.setAttribute('class', 'slice-label');
                    percentText.textContent = `${percentage.toFixed(1)}%`;
                    svg.appendChild(percentText);
                }
                
                currentAngle += sliceAngle;
            });
            
            // Add center circle with total
            const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            centerCircle.setAttribute('cx', centerX);
            centerCircle.setAttribute('cy', centerY);
            centerCircle.setAttribute('r', 40);
            centerCircle.setAttribute('fill', 'white');
            centerCircle.setAttribute('stroke', '#ddd');
            centerCircle.setAttribute('stroke-width', '2');
            svg.appendChild(centerCircle);
            
            // Add "Total" text
            const totalLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            totalLabel.setAttribute('x', centerX);
            totalLabel.setAttribute('y', centerY - 8);
            totalLabel.setAttribute('text-anchor', 'middle');
            totalLabel.setAttribute('dominant-baseline', 'central');
            totalLabel.setAttribute('font-size', '14');
            totalLabel.setAttribute('font-weight', 'bold');
            totalLabel.setAttribute('fill', '#333');
            totalLabel.textContent = 'Audit Ratio';
            svg.appendChild(totalLabel);
            
            // Add total value
            const totalValue = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            totalValue.setAttribute('x', centerX);
            totalValue.setAttribute('y', centerY + 8);
            totalValue.setAttribute('text-anchor', 'middle');
            totalValue.setAttribute('dominant-baseline', 'central');
            totalValue.setAttribute('font-size', '16');
            totalValue.setAttribute('font-weight', 'bold');
            totalValue.setAttribute('fill', '#666');
            totalValue.textContent = auditRatio.toFixed(2);
            svg.appendChild(totalValue);
        }