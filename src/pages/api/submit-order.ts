
import nodemailer from 'nodemailer';
import { OrderFormValues } from '@/types/order';

interface OrderRequest {
  order: {
    itemNumber: number;
    garmentType: string;
    materialType: string;
    brand: string;
    sizes: {
      size: string;
      colors: {
        color: string;
        quantity: string;
      }[];
    }[];
    printLocations: string[];
    designs: Record<string, string>;
  }[];
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    message?: string;
  };
  to: string;
}

export async function POST(req: Request) {
  try {
    const data: OrderRequest = await req.json();

    // Configurar el transportador de correo
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Crear el contenido HTML del correo
    const htmlContent = `
      <h2>New Order from ${data.contactInfo.fullName}</h2>
      <h3>Contact Information:</h3>
      <p>Email: ${data.contactInfo.email}</p>
      <p>Phone: ${data.contactInfo.phone}</p>
      ${data.contactInfo.company ? `<p>Company: ${data.contactInfo.company}</p>` : ''}
      ${data.contactInfo.message ? `<p>Message: ${data.contactInfo.message}</p>` : ''}
      
      <h3>Order Details:</h3>
      ${data.order.map((item, index) => `
        <h4>Item ${item.itemNumber}:</h4>
        <ul>
          <li>Garment Type: ${item.garmentType}</li>
          <li>Material: ${item.materialType}</li>
          <li>Brand: ${item.brand}</li>
          <li>Sizes and Colors:
            <ul>
              ${item.sizes.map(size => `
                <li>${size.size}: 
                  ${size.colors.map(color => 
                    `${color.quantity} - ${color.color}`
                  ).join(', ')}
                </li>
              `).join('')}
            </ul>
          </li>
          <li>Print Locations: ${item.printLocations.join(', ')}</li>
        </ul>
      `).join('')}
    `;

    // Enviar el correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.to,
      subject: `New Order from ${data.contactInfo.fullName}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Order submitted successfully" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return new Response(JSON.stringify({ error: "Failed to submit order" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
