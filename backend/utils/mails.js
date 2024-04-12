const fs = require('fs');
const pdf = require('html-pdf');
const axios = require('axios');

const auth = { username: "app", password: "random"};


const sendEmailWithPDF = async (data) => {
  try {
    // Generate the dynamic PDF
    const pdfContent = await generatePDF(data.data);

    // Create a temporary file for the PDF
    const pdfFilePath = 'temp.pdf';
    fs.writeFileSync(pdfFilePath, pdfContent);


    // Prepare email data
    const emailData = {
      from:  `Excited User <support@sravantikanchicsye6225.site>`,
      to: 'sravanti.kanchi@gmail.com',
      subject: 'TravelWing: your Generated Itinerary',
      text: "Hello! Thank you for choosing Travel Wing for your travel needs. We're thrilled to assist you in planning your journey. Please find the attached itinerary PDF for your reference. If you have any questions or need further assistance, feel free to reach out to us. Safe travels!",
      attachment: fs.createReadStream(pdfFilePath)
    };

    
   await axios.post(`https://api.mailgun.net/v3/sravantikanchicsye6225.site/messages`, emailData, {
      auth,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Delete the temporary PDF file
    fs.unlinkSync(pdfFilePath);

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}


async function generatePDF(data) {
  // Example HTML content for the PDF
  const htmlContent = `
  <html>
    <head>
      <title>Travel Itinerary</title>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        h1 {
          color: #333;
        }
        .itinerary-details {
          margin-top: 20px;
        }
        .itinerary-item {
          margin-bottom: 10px;
        }
        .itinerary-label {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>Travel Itinerary</h1>
      <div class="itinerary-details">
        <div class="itinerary-item">
          <span class="itinerary-label">Source:</span>
          <span>${data.source}</span>
        </div>
        <div class="itinerary-item">
          <span class="itinerary-label">Destination:</span>
          <span>${data.destination}</span>
        </div>
        <div class="itinerary-item">
          <span class="itinerary-label">Start Date:</span>
          <span>${data.startDate}</span>
        </div>
        <div class="itinerary-item">
          <span class="itinerary-label">End Date:</span>
          <span>${data.endDate}</span>
        </div>
        <div class="itinerary-item">
          <span class="itinerary-label">Generated Itinerary:</span>
          <span>${data.generatediItinerary.replace(/\n/g, '<br>')}</span>
        </div>      </div>
    </body>
  </html>
`;


  // Options for PDF generation (you can customize as needed)
  const options = {
    format: 'Letter',
    orientation: 'portrait',
    border: '10mm'
  };


  console.log(htmlContent, options);
  // Generate PDF from HTML content
  return new Promise((resolve, reject) => {
    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
}



module.exports.sendEmailWithPDF = sendEmailWithPDF;
