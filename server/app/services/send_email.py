# services/send_email.py

import asyncio
import os
import smtplib
import time
import secrets

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from format.email_otp import get_otp_email_html


def _send_otp_email_sync(email: str, otp: str) -> bool:
    sender_email = os.getenv("MAIL_USERNAME")
    sender_password = os.getenv("MAIL_PASSWORD")

    if not sender_email or not sender_password:
        print("Email credentials are missing.")
        return False

    message = MIMEMultipart("alternative")

    message["Subject"] = "Scholars Portal - Account Verification"
    message["From"] = sender_email
    message["To"] = email

    # Get the HTML email format from the format folder
    html_content = get_otp_email_html(otp)

    message.attach(
        MIMEText(html_content, "html")
    )

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()

            server.login(
                sender_email,
                sender_password
            )

            server.sendmail(
                sender_email,
                email,
                message.as_string()
            )

        return True

    except Exception as error:
        print(f"Email sending failed: {error}")
        return False


async def send_otp_email(email: str, otp: str) -> bool:
    """
    Send OTP email asynchronously in a FastAPI application.
    """

    return await asyncio.to_thread(
        _send_otp_email_sync,
        email,
        otp
    )
# Temporary OTP storage
otp_storage = {}
def generate_otp(email: str) -> str:
    otp = str(secrets.randbelow(900000) + 100000)

    otp_storage[email] = {
        "otp": otp,
        "expires_at": time.time() + 300
    }

    return otp

def verify_otp(email: str, entered_otp: str) -> bool:

    stored_data = otp_storage.get(email)

    if not stored_data:
        return False

    # Check OTP expiry
    if time.time() > stored_data["expires_at"]:
        otp_storage.pop(email, None)
        return False

    # Check whether entered OTP is correct
    if secrets.compare_digest(
        stored_data["otp"],
        entered_otp
    ):
        # OTP verified successfully
        otp_storage.pop(email, None)
        return True

    return False