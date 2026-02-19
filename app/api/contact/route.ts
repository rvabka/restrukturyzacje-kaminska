import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function sanitize(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function nl2br(text: string): string {
  return text.replace(/\n/g, '<br>');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SUBJECTS = ['restrukturyzacja', 'upadlosc-konsumencka', 'upadlosc-gospodarcza', 'inne'];

const SUBJECT_MAP: Record<string, string> = {
  'restrukturyzacja': 'Restrukturyzacja firmy',
  'upadlosc-konsumencka': 'Upadłość konsumencka',
  'upadlosc-gospodarcza': 'Upadłość gospodarcza',
  'inne': 'Inne',
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  turnstileToken: string;
}

function validateForm(data: ContactFormData): string | null {
  const { name, email, subject, message } = data;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return 'Wypełnij wszystkie wymagane pola.';
  }

  if (name.trim().length > 200) return 'Imię i nazwisko jest zbyt długie.';
  if (email.trim().length > 320) return 'Adres email jest zbyt długi.';
  if (data.phone && data.phone.trim().length > 30) return 'Numer telefonu jest zbyt długi.';
  if (message.trim().length > 5000) return 'Wiadomość jest zbyt długa (max 5000 znaków).';

  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Nieprawidłowy adres email.';
  }

  if (!VALID_SUBJECTS.includes(subject.trim())) {
    return 'Nieprawidłowy temat.';
  }

  return null;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not configured');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: ip,
      }),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

function buildEmailHtml(
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
): string {
  const phoneDisplay = phone || '<span style="color: #999;">Nie podano</span>';
  const messageHtml = nl2br(sanitize(message));
  const date = new Date().toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Warsaw',
  });

  return `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; max-width: 600px; width: 100%;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 40px 40px 30px 40px; text-align: center; border-bottom: 3px solid #fcb900;">
                            <h1 style="margin: 0; color: #262a35; font-size: 22px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase;">
                                Kancelaria Kamińska
                            </h1>
                            <div style="width: 60px; height: 2px; background-color: #fcb900; margin: 15px auto 0;"></div>
                        </td>
                    </tr>
                    <!-- Title bar -->
                    <tr>
                        <td style="background-color: #fcb900; padding: 16px 40px;">
                            <h2 style="margin: 0; color: #262a35; font-size: 15px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
                                Nowa wiadomość z formularza kontaktowego
                            </h2>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 16px 20px; background-color: #f5f5f5; border-left: 3px solid #fcb900;">
                                        <p style="margin: 0 0 4px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Imię i nazwisko</p>
                                        <p style="margin: 0; font-size: 16px; color: #262a35; font-weight: 600;">${sanitize(name)}</p>
                                    </td>
                                </tr>
                                <tr><td style="height: 8px;"></td></tr>
                                <tr>
                                    <td style="padding: 16px 20px; background-color: #f5f5f5; border-left: 3px solid #fcb900;">
                                        <p style="margin: 0 0 4px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Adres email</p>
                                        <p style="margin: 0; font-size: 16px; color: #262a35;">
                                            <a href="mailto:${sanitize(email)}" style="color: #fcb900; text-decoration: none;">${sanitize(email)}</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr><td style="height: 8px;"></td></tr>
                                <tr>
                                    <td style="padding: 16px 20px; background-color: #f5f5f5; border-left: 3px solid #fcb900;">
                                        <p style="margin: 0 0 4px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Telefon</p>
                                        <p style="margin: 0; font-size: 16px; color: #262a35;">${phone ? sanitize(phone) : phoneDisplay}</p>
                                    </td>
                                </tr>
                                <tr><td style="height: 8px;"></td></tr>
                                <tr>
                                    <td style="padding: 16px 20px; background-color: #f5f5f5; border-left: 3px solid #fcb900;">
                                        <p style="margin: 0 0 4px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Temat</p>
                                        <p style="margin: 0; font-size: 16px; color: #262a35; font-weight: 600;">${sanitize(subject)}</p>
                                    </td>
                                </tr>
                            </table>
                            <!-- Message -->
                            <div style="margin-bottom: 30px;">
                                <p style="margin: 0 0 12px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Treść wiadomości</p>
                                <div style="padding: 24px; background-color: #f5f5f5; border-left: 3px solid #fcb900; font-size: 15px; color: #424547; line-height: 1.7;">
                                    ${messageHtml}
                                </div>
                            </div>
                            <!-- Reply button -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <a href="mailto:${sanitize(email)}?subject=Re: ${sanitize(subject)}"
                                           style="display: inline-block; padding: 14px 40px; background-color: #fcb900; color: #262a35; text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
                                            Odpowiedz na wiadomość
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f5f5f5; padding: 30px 40px; text-align: center; border-top: 3px solid #fcb900;">
                            <p style="margin: 0 0 8px 0; color: #262a35; font-size: 12px; letter-spacing: 1px;">
                                Wiadomość wysłana ${date}
                            </p>
                            <p style="margin: 0; color: #999; font-size: 11px;">
                                Ta wiadomość została wygenerowana automatycznie z formularza kontaktowego.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

function buildEmailPlainText(
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
): string {
  return `Nowa wiadomość z formularza kontaktowego

Imię i nazwisko: ${name}
Email: ${email}
Telefon: ${phone || 'Nie podano'}
Temat: ${subject}

Treść wiadomości:
${message}`;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Zbyt wiele wiadomości. Spróbuj ponownie za 15 minut.' },
        { status: 429 },
      );
    }

    let body: ContactFormData;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Nieprawidłowe dane.' },
        { status: 400 },
      );
    }

    const validationError = validateForm(body);
    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError },
        { status: 400 },
      );
    }

    if (!body.turnstileToken?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Potwierdź, że nie jesteś robotem.' },
        { status: 400 },
      );
    }

    const turnstileValid = await verifyTurnstile(body.turnstileToken.trim(), ip);
    if (!turnstileValid) {
      return NextResponse.json(
        { success: false, message: 'Weryfikacja anty-bot nie powiodła się. Spróbuj ponownie.' },
        { status: 403 },
      );
    }

    const name = body.name.trim();
    const email = body.email.trim();
    const phone = body.phone?.trim() || '';
    const subject = body.subject.trim();
    const message = body.message.trim();
    const subjectLabel = SUBJECT_MAP[subject] || subject;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, 
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.MAIL_TO,
      replyTo: `"${name}" <${email}>`,
      subject: `Nowa wiadomość: ${subjectLabel} — ${name}`,
      html: buildEmailHtml(name, email, phone, subjectLabel, message),
      text: buildEmailPlainText(name, email, phone, subjectLabel, message),
    });

    return NextResponse.json({
      success: true,
      message: 'Wiadomość została wysłana pomyślnie.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.' },
      { status: 500 },
    );
  }
}
