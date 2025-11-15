const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    console.log('🚀 Starting PDF generation...');

    const htmlPath = path.join(__dirname, '..', 'public', 'cv-template.html');
    const photoPath = path.join(__dirname, '..', 'public', 'cedric-photo.jpg');
    const outputPath = path.join(__dirname, '..', 'public', 'Cedric-Ramos-CV.pdf');

    if (!fs.existsSync(htmlPath)) {
        console.error('❌ Error: cv-template.html not found!');
        process.exit(1);
    }

    let browser;
    try {
        console.log('📖 Reading HTML template...');
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Convert photo to base64 and embed it
        if (fs.existsSync(photoPath)) {
            console.log('🖼️  Embedding photo as base64...');
            const photoBuffer = fs.readFileSync(photoPath);
            const photoBase64 = photoBuffer.toString('base64');
            const photoDataUrl = `data:image/jpeg;base64,${photoBase64}`;
            htmlContent = htmlContent.replace('src="cedric-photo.jpg"', `src="${photoDataUrl}"`);
        }

        console.log('🌐 Launching browser...');
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        console.log('📄 Loading content...');
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });

        console.log('🖨️  Generating PDF...');
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });

        console.log('✅ PDF generated successfully!');
        console.log(`📍 Location: ${outputPath}`);

    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

generatePDF();