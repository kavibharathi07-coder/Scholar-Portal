# format/email_otp.py

def get_otp_email_html(otp: str) -> str:
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0">
        <title>Scholars Portal - Account Verification</title>
    </head>

    <body style="
        margin: 0;
        padding: 0;
        background-color: #f3f4f6;
        font-family: Arial, Helvetica, sans-serif;
    ">

        <table width="100%" cellpadding="0" cellspacing="0"
               border="0"
               style="background-color:#f3f4f6;padding:40px 15px;">

            <tr>
                <td align="center">

                    <!-- Main Card -->
                    <table width="600" cellpadding="0" cellspacing="0"
                           border="0"
                           style="
                               width:100%;
                               max-width:600px;
                               background-color:#ffffff;
                               border-radius:16px;
                               overflow:hidden;
                               box-shadow:0 5px 20px rgba(0,0,0,0.08);
                           ">

                        <!-- Header -->
                        <tr>
                            <td align="center"
                                style="
                                    background-color:#2563eb;
                                    padding:30px 20px;
                                ">

                                <h1 style="
                                    margin:0;
                                    color:#ffffff;
                                    font-size:28px;
                                    font-weight:bold;
                                    letter-spacing:0.5px;
                                ">
                                    SCHOLARS PORTAL
                                </h1>

                                <p style="
                                    margin:8px 0 0;
                                    color:#dbeafe;
                                    font-size:15px;
                                ">
                                    Account Verification
                                </p>

                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td align="center"
                                style="padding:42px 25px 35px;">

                                <h2 style="
                                    margin:0 0 15px;
                                    color:#111827;
                                    font-size:26px;
                                ">
                                    Verify Your Email
                                </h2>

                                <p style="
                                    margin:0 auto;
                                    max-width:450px;
                                    color:#6b7280;
                                    font-size:15px;
                                    line-height:1.6;
                                ">
                                    Use the verification code below
                                    to verify your Scholars Portal account.
                                </p>

                                <!-- OTP Box -->
                                <table width="360"
                                       cellpadding="0"
                                       cellspacing="0"
                                       border="0"
                                       style="
                                           width:360px;
                                           max-width:100%;
                                           margin:30px auto 20px;
                                           background-color:#f8fbff;
                                           border:2px solid #2563eb;
                                           border-radius:12px;
                                       ">

                                    <tr>
                                        <td align="center"
                                            style="padding:20px 20px 12px;">

                                            <p style="
                                                margin:0;
                                                color:#2563eb;
                                                font-size:13px;
                                                font-weight:bold;
                                                letter-spacing:2px;
                                            ">
                                                VERIFICATION CODE
                                            </p>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:0 20px;">

                                            <div style="
                                                height:1px;
                                                background-color:#bfdbfe;
                                                line-height:1px;
                                            ">
                                                &nbsp;
                                            </div>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="center"
                                            style="padding:18px 15px 22px;">

                                            <span style="
                                                color:#2563eb;
                                                font-size:34px;
                                                font-weight:bold;
                                                letter-spacing:6px;
                                                white-space:nowrap;
                                            ">
                                                {otp}
                                            </span>

                                        </td>
                                    </tr>

                                </table>

                                <!-- OTP Expiry -->
                                <p style="
                                    margin:18px 0 0;
                                    color:#6b7280;
                                    font-size:14px;
                                ">
                                    This OTP is valid for
                                    <strong style="color:#2563eb;">
                                        5 minutes
                                    </strong>.
                                </p>

                                <!-- Security Message -->
                                <div style="
                                    margin-top:32px;
                                    text-align:center;
                                    color:#9ca3af;
                                    font-size:13px;
                                    line-height:1.8;
                                ">
                                    <div>
                                        If you did not request this code,
                                    </div>
                                    <div>
                                        please ignore this email.
                                    </div>
                                </div>

                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center"
                                style="
                                    padding:20px;
                                    background-color:#f9fafb;
                                    border-top:1px solid #e5e7eb;
                                ">

                                <p style="
                                    margin:0;
                                    color:#9ca3af;
                                    font-size:11px;
                                ">
                                    This is an automated email.
                                    Please do not reply.
                                </p>

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>

        </table>

    </body>
    </html>
    """