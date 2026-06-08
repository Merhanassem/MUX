// ─── Owner notification email ─────────────────────────────────────────────────
export function ownerNotificationHtml({
  name, email, company, topic, budget, message,
}: {
  name: string; email: string; company?: string;
  topic?: string; budget?: string; message: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>New Lead — MUX Portfolio</title>
<style>
  body{margin:0;padding:0;background:#F7F5F1;font-family:'Helvetica Neue',Arial,sans-serif;}
  .wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06);}
  .header{background:#1A1A1A;padding:32px 40px;}
  .logo{font-size:22px;font-weight:900;color:#fff;letter-spacing:-0.04em;}
  .logo span{color:#F72585;}
  .badge{display:inline-block;background:#F72585;color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:999px;letter-spacing:0.08em;text-transform:uppercase;margin-top:12px;}
  .body{padding:40px;}
  .row{border-bottom:1px solid #F0EDE8;padding:14px 0;display:flex;gap:16px;}
  .row:last-child{border-bottom:none;}
  .label{font-size:11px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.1em;min-width:80px;padding-top:2px;}
  .value{font-size:15px;color:#1A1A1A;line-height:1.5;}
  .message-box{background:#F7F5F1;border-radius:12px;padding:20px;margin-top:8px;font-size:15px;color:#1A1A1A;line-height:1.7;white-space:pre-wrap;}
  .cta{margin-top:32px;text-align:center;}
  .cta a{display:inline-block;background:#F72585;color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 32px;border-radius:999px;}
  .footer{padding:24px 40px;text-align:center;font-size:12px;color:#999;background:#F7F5F1;}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="logo">M<span>U</span>X</div>
    <div class="badge">🔔 New Lead</div>
  </div>
  <div class="body">
    <div class="row"><div class="label">Name</div><div class="value">${escHtml(name)}</div></div>
    <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${escHtml(email)}" style="color:#F72585">${escHtml(email)}</a></div></div>
    ${company ? `<div class="row"><div class="label">Company</div><div class="value">${escHtml(company)}</div></div>` : ''}
    ${topic ? `<div class="row"><div class="label">Topic</div><div class="value">${escHtml(topic)}</div></div>` : ''}
    ${budget ? `<div class="row"><div class="label">Budget</div><div class="value">${escHtml(budget)}</div></div>` : ''}
    <div class="row" style="flex-direction:column">
      <div class="label">Message</div>
      <div class="message-box">${escHtml(message)}</div>
    </div>
    <div class="cta">
      <a href="mailto:${escHtml(email)}?subject=Re: Your inquiry via MUX Portfolio">Reply to ${escHtml(name)}</a>
    </div>
  </div>
  <div class="footer">MUX Portfolio · merhanassem22@gmail.com</div>
</div>
</body>
</html>`;
}

// ─── Visitor confirmation email ───────────────────────────────────────────────
export function visitorConfirmationHtml({ name }: { name: string }) {
  const firstName = escHtml(name.split(' ')[0]);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Got your message — Merhan Assem</title>
<style>
  body{margin:0;padding:0;background:#F7F5F1;font-family:'Helvetica Neue',Arial,sans-serif;}
  .wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06);}
  .header{background:#1A1A1A;padding:40px;text-align:center;}
  .logo{font-size:28px;font-weight:900;color:#fff;letter-spacing:-0.04em;}
  .logo span{color:#F72585;}
  .body{padding:48px 40px;text-align:center;}
  h1{font-size:28px;font-weight:700;color:#1A1A1A;margin:0 0 16px;line-height:1.2;}
  p{font-size:16px;color:#575757;line-height:1.75;margin:0 0 20px;}
  .divider{height:1px;background:#F0EDE8;margin:32px 0;}
  .cta a{display:inline-block;background:#1A1A1A;color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 32px;border-radius:999px;}
  .sig{margin-top:40px;font-size:15px;color:#1A1A1A;}
  .sig strong{display:block;font-size:17px;margin-top:4px;}
  .footer{padding:24px 40px;text-align:center;font-size:12px;color:#999;background:#F7F5F1;}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="logo">M<span>U</span>X</div>
  </div>
  <div class="body">
    <h1>Hi ${firstName}, got your message. 👋</h1>
    <p>Thanks for reaching out. I've received your message and will review it as soon as possible.</p>
    <p>In the meantime, feel free to explore more of my work.</p>
    <div class="divider"></div>
    <div class="cta"><a href="https://merhan.design/work">View my work →</a></div>
    <div class="sig">
      Talk soon,
      <strong>Merhan Assem</strong>
      Senior Product Designer
    </div>
  </div>
  <div class="footer">MUX Portfolio · merhanassem22@gmail.com · Cairo, Egypt</div>
</div>
</body>
</html>`;
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
