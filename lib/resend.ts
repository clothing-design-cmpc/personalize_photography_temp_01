import { Resend } from "resend";

// Server-side Resend instance for transactional emails
const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;
