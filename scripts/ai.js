const path = require('path');
const report_file = path.resolve(__dirname, "../static/report.json");

(async () => {
    const responce = await fetch("https://ai.img-converter.com/status");

    if (responce.status !== 200)
        return;

    const result = await responce.json();
    const fs = require('fs');

    if (!fs.existsSync(report_file))
        fs.writeFileSync(report_file, '[]');
    
    const reports = JSON.parse(fs.readFileSync(report_file, 'utf8'));
    reports.push({time: Date.now(), ...result});

    fs.writeFileSync(report_file, JSON.stringify(reports));
})()
