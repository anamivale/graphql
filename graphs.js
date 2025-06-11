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

