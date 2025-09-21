import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

console.log("RESEND_API_KEY:", resend);

export default resend;