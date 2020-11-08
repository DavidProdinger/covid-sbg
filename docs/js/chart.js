const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

const typeColors = {
    'gesamt': '#ffe119',
    'aktiv': '#e6194b',
    'genesen': '#3cb44b',
    'verstorben': '#000000'
}
function isMobile() {
    return window.innerWidth < 980;
}

let chart;

function destroy() {
    if (chart) {
        chart.destroy();
    }
}

function buildDistrictChart(gesamt, district, type) {
    const datasets = [];
    Object.keys(gesamt[district]).forEach((town, i) => {
        const data = [];
        Object.keys(gesamt[district][town][type]).map((date, x) => {
            data.push({
                x: date,
                y: parseInt(gesamt[district][town][type][date])
            });
        });
        datasets.push({
            label: town,
            data: data,
            borderColor: colors[i % colors.length],
            backgroundColor: 'transparent',
            hidden: false,
        })
    });
    if (district !== 'Salzburg Stadt') {
        datasets[0].hidden = true;
    }
    const ctx = document.getElementById(district);
    destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datasets[0].data.map(d => d.x.split("T")[0]),
            datasets
        },
        options: {
            legend: {
                position: isMobile() ? 'bottom' : 'left'
            },
            aspectRatio: isMobile() ? 0.5 : 2
        }
    });
}


function buildTownChart(gesamt, id) {
    const datasets = [];
    Object.keys(gesamt).forEach((type, i) => {
        const data = [];
        Object.keys(gesamt[type]).map((date, x) => {
            data.push({
                x: date,
                y: parseInt(gesamt[type][date])
            });
        });
        datasets.push({
            label: type,
            data: data,
            borderColor: typeColors[type],
            backgroundColor: 'transparent',
            hidden: false,
        })
    });
    datasets[0].hidden = true;
    const ctx = document.getElementById(id);
    destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datasets[0].data.map(d => d.x.split("T")[0]),
            datasets
        },
        options: {
            legend: {
                position: isMobile() ? 'bottom' : 'left'
            },
            aspectRatio: isMobile() ? 0.5 : 2
        }
    });
}