import { sendEmail } from '@/lib/email'; // 🔹 Importamos la función de email.ts

export async function POST(req: Request) {
  try {
    // 📌 Recibimos los datos del formulario
    const { subject, text, html } = await req.json();
    
    // ✉️ Enviamos el correo
    await sendEmail({ subject, text, html });

    // ✅ Respuesta si el email se envió correctamente
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);

    // ❌ Respuesta si hubo un error
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
