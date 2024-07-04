function checkIP() {
    const ipInput = document.getElementById('ipInput').value;
    const notification = document.getElementById('notification');
    const spinner = document.getElementById('spinner');
    const ipData = document.getElementById('ipData');

    notification.innerHTML = '';
    ipData.innerHTML = '';

    if (!validateIP(ipInput)) {
        notification.innerHTML = 'Invalid IP address.';
        return;
    }

    spinner.style.display = 'block';

    fetch(`https://thingproxy.freeboard.io/fetch/https://ip.cfvless.workers.dev/?ip=${ipInput}`)
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none';
            ipData.innerHTML = formatOutput(data);
        })
        .catch(error => {
            spinner.style.display = 'none';
            notification.innerHTML = 'Error fetching IP data.';
        });
}

function validateIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    return regex.test(ip);
}

function formatOutput(data) {
    if (!data || typeof data !== 'object') return '<div>No data available.</div>';

    const items = [];
    if (data.ip) items.push({ label: 'IP', value: data.ip });
    if (data.isp) items.push({ label: 'ISP', value: data.isp });
    if (data.country) items.push({ label: 'Country', value: data.country });
    if (data.city) items.push({ label: 'City', value: data.city });
    if (data.proxyStatus) items.push({ label: 'proxyStatus', value: data.proxyStatus });

    if (items.length === 0) return '<div>No data available.</div>';

    const outputItems = items.map(item => `
        <div class="output-item">
            <span class="output-key">${item.label}:</span>
            <span class="output-value">${item.value}</span>
        </div>
    `).join('');

    return outputItems;
}
