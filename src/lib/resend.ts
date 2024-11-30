import { Resend } from 'resend';
// It helps to send the email programatically
export const resend = new Resend(process.env.RESEND_API_KEY);
// console.log(resend)