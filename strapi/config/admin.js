module.exports = ({ env }) => ({
  url: env('ADMIN_URL', 'http://localhost:9091/admin'),
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  forgotPassword: {
    from: env('SMTP_USER'),
    replyTo: env('SMTP_USER'),
    emailTemplate: {
      subject: 'Reset password - Strapi Admin',
      text: `We heard that you lost your password. Sorry about that!

Click this link to reset your password:

<%= url %>

Your reset code is the part after ?code= in the link above.

Thanks.`,
      html: `<p>We heard that you lost your password. Sorry about that!</p>
<p>But don't worry! Click the link below to reset your password:</p>
<p><a href="<%= url %>"><%= url %></a></p>
<p>Your reset code is the part after <code>?code=</code> in the link above.</p>
<p>Thanks.</p>`,
    },
  },
});