const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   FILE UPLOAD CONFIG
========================= */

const upload = multer({
  storage: multer.memoryStorage()
});

/* =========================
   MAIL TRANSPORTER
========================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kotteswarig04@gmail.com",
    pass: "fvdv xcds dbek qnwm "
  }
});

/* =========================
   FORM SUBMIT API
========================= */

app.post("/submit-form", upload.single("resume"), async (req, res) => {

  try {

    console.log("API HIT");

    const data = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send("Resume missing");
    }

    /* =========================
       BEAUTIFUL EMAIL TEMPLATE
    ========================= */

    const htmlTemplate = `
    
    <div style="
      max-width:800px;
      margin:auto;
      font-family:Arial, sans-serif;
      background:#f4f7fb;
      padding:30px;
    ">

      <div style="
        background:#ffffff;
        border-radius:12px;
        padding:30px;
        border:1px solid #e5e5e5;
      ">

        <h1 style="
          text-align:center;
          color:#1d4ed8;
          margin-bottom:10px;
        ">
          Career Form Submission
        </h1>

        <div style="
          width:80px;
          height:4px;
          background:#1d4ed8;
          margin:0 auto 30px;
          border-radius:10px;
        "></div>

        <!-- Candidate Details -->

        <div style="
          border:1px solid #e5e5e5;
          border-radius:10px;
          padding:20px;
          margin-bottom:25px;
        ">

          <h2 style="
            color:#2563eb;
            margin-bottom:20px;
          ">
            Candidate Details
          </h2>

          <table width="100%" cellpadding="10">

            <tr>
              <td><b>Full Name</b></td>
              <td>${data.fullname}</td>
            </tr>

            <tr>
              <td><b>Email</b></td>
              <td>${data.email}</td>
            </tr>

            <tr>
              <td><b>Phone</b></td>
              <td>${data.phone}</td>
            </tr>

            <tr>
              <td><b>Date of Birth</b></td>
              <td>${data.dob}</td>
            </tr>

            <tr>
              <td><b>Location</b></td>
              <td>${data.location}</td>
            </tr>

            <tr>
              <td><b>About</b></td>
              <td>${data.about}</td>
            </tr>

            <tr>
              <td><b>Role Applied</b></td>
              <td>${data.role}</td>
            </tr>

            <tr>
              <td><b>Expected Salary</b></td>
              <td>₹${data.salary}</td>
            </tr>

          </table>

        </div>

        <!-- Questions -->

        <div style="
          border:1px solid #e5e5e5;
          border-radius:10px;
          padding:20px;
          margin-bottom:20px;
        ">
          <h3 style="color:#111827;">
            1. When your creative ideas face rejection, what is your next move?
          </h3>

          <p style="line-height:1.8;color:#4b5563;">
            ${data.q1}
          </p>
        </div>

        <div style="
          border:1px solid #e5e5e5;
          border-radius:10px;
          padding:20px;
          margin-bottom:20px;
        ">
          <h3 style="color:#111827;">
            2. Describe the most unconventional idea you ever had and what made it different.
          </h3>

          <p style="line-height:1.8;color:#4b5563;">
            ${data.q2}
          </p>
        </div>

        <div style="
          border:1px solid #e5e5e5;
          border-radius:10px;
          padding:20px;
          margin-bottom:20px;
        ">
          <h3 style="color:#111827;">
            3. In a marketing campaign, what matters most to you — emotion, logic, or attention? Why?
          </h3>

          <p style="line-height:1.8;color:#4b5563;">
            ${data.q3}
          </p>
        </div>

        <div style="
          border:1px solid #e5e5e5;
          border-radius:10px;
          padding:20px;
          margin-bottom:20px;
        ">
          <h3 style="color:#111827;">
            4. You have limited resources and time to launch a brand campaign. How would you still make it unforgettable?
          </h3>

          <p style="line-height:1.8;color:#4b5563;">
            ${data.q4}
          </p>
        </div>

        <!-- Footer -->

        <div style="
          text-align:center;
          margin-top:40px;
          color:#6b7280;
          font-size:14px;
        ">
          Thank you for the opportunity! <br/>
          Looking forward to contributing and growing with your team.
        </div>

      </div>

    </div>
    `;

    /* =========================
       MAIL OPTIONS
    ========================= */

    const mailOptions = {
      from: "kotteswarig4@gmail.com",
      to: "kotteswarig4@gmail.com",
      subject: "Career Form Submission",
      html: htmlTemplate,

      attachments: [
        {
          filename: file.originalname,
          content: file.buffer
        }
      ]
    };

    /* =========================
       SEND MAIL
    ========================= */

    await transporter.sendMail(mailOptions);

    res.send("Mail Sent Successfully");

  } catch (err) {

    console.log(err);
    res.status(500).send("Mail Failed");

  }

});

/* =========================
   SERVER
========================= */

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});