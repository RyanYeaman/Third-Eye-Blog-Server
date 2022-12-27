require('dotenv').config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email) => {
    try {
        await sgMail.send({
            to: `${email}`,
            from: "ryan.yeaman@icloud.com",
            subject: "test mail",
            text: "this is a test",
            html: "<h1>Thanks For Signing up For The Third Eye Newsletter</h1>",
        })
    } catch (error) {
        console.log(error)
        if (error.response) {
            throw error
        }
    }
}

module.exports = { sendEmail }