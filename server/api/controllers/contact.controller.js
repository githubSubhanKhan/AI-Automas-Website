// const Contact = require("../models/contact.model");

// const createContact = async (req, res, next) => {
//   try {
//     const contact = await Contact.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Form submitted successfully",
//       data: contact
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createContact
// };

const Contact = require("../models/contact.model");
const nodemailer = require("nodemailer");

const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);

    // ----------- Nodemailer Setup -------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // HTML email content
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Role:</strong> ${contact.role}</p>
        <p><strong>Company Name:</strong> ${contact.companyName}</p>
        <p><strong>Company Website:</strong> ${contact.companyWebsite}</p>
        <p><strong>Company Size:</strong> ${contact.companySize}</p>
        <p><strong>Annual Revenue:</strong> ${contact.annualRevenue}</p>
        <p><strong>Project Budget:</strong> ${contact.projectBudget}</p>
        <p><strong>Services Interested:</strong> ${contact.services}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f8f8f8; padding: 10px; border-radius: 5px;">${contact.message}</p>
        <hr>
        <p style="font-size: 0.9em; color: #888;">Sent from your website contact form</p>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Submission: ${contact.name}`,
      html: emailHTML,
    });

    // Respond to frontend
    res.status(201).json({
      success: true,
      message: "Form submitted and email sent successfully",
      data: contact,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createContact,
};
