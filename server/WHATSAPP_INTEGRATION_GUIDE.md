# ELEGANCE SALOON — OFFICIAL WHATSAPP BUSINESS PLATFORM CLOUD API SETUP GUIDE

This guide provides end-to-end instructions for connecting **Elegance Saloon** with the official **Meta WhatsApp Business Cloud API**.

---

## 1. Prerequisites
1. A **Meta Developer Account**: [developers.facebook.com](https://developers.facebook.com/)
2. A **Meta Business Portfolio (Business Manager)**.
3. A verified business phone number that can receive SMS or phone calls for OTP verification (cannot be an active personal WhatsApp number at the same time).

---

## 2. Create and Configure Your Meta App

1. Go to **[Meta Developer Portal](https://developers.facebook.com/apps/)** and click **Create App**.
2. Select **Other** > **Business** as the app type.
3. Enter your App Name: `Elegance Saloon Assistant`.
4. In the App Dashboard, locate **WhatsApp** and click **Set up**.
5. Select or link your **Meta Business Portfolio**.

---

## 3. Obtain API Credentials

Once WhatsApp is added to your app:

### A. Phone Number ID & WhatsApp Business Account ID
1. In the left sidebar, navigate to **WhatsApp** > **API Setup**.
2. Under **Step 1: Select phone numbers**, you will find:
   - **Phone number ID**: (e.g., `105934892482394`)
   - **WhatsApp Business Account ID**: (e.g., `102938475628391`)
3. Copy both values into your `server/.env`:
   ```env
   WHATSAPP_PHONE_NUMBER_ID=105934892482394
   WHATSAPP_ACCOUNT_ID=102938475628391
   ```

### B. Permanent System User Access Token
> [!WARNING]
> The temporary token in "API Setup" expires after 24 hours. For production 24/7 uptime, create a Permanent System User Token:

1. Open **[Meta Business Settings](https://business.facebook.com/settings)**.
2. Under **Users**, click **System Users**.
3. Click **Add**, name it `Elegance_Saloon_Bot`, and select role **Admin**.
4. Click **Generate New Token**:
   - Select your App (`Elegance Saloon Assistant`).
   - Token expiration: **Never**.
   - Check the following permissions:
     - `whatsapp_business_messaging`
     - `whatsapp_business_management`
5. Copy the generated token and save it to `server/.env`:
   ```env
   WHATSAPP_ACCESS_TOKEN=EAAB...
   ```

---

## 4. Configure Webhooks (Receiving Incoming Messages)

1. Deploy the backend server to your production URL with SSL (e.g., `https://api.elegancesaloon.com`) or test locally using a secure tunnel like **ngrok**:
   ```bash
   ngrok http 5000
   # Provides: https://your-subdomain.ngrok-free.app
   ```
2. In the Meta Developer Portal, go to **WhatsApp** > **Configuration** > **Webhook**.
3. Click **Edit**:
   - **Callback URL**: `https://your-domain.com/api/whatsapp/webhook`
   - **Verify Token**: `elegance_saloon_secure_token_2026` (must match `WHATSAPP_VERIFY_TOKEN` in `server/.env`)
4. Click **Verify and Save**. Meta will send a GET request to verify the challenge.
5. Under **Webhook fields**, click **Manage** and subscribe to:
   - `messages` (Essential: receives incoming customer texts)
   - `message_template_status_update`

---

## 5. Live Testing & Verification

1. Send a WhatsApp message from your mobile phone to the salon number:
   - Type: `Hi`
2. The Elegance Saloon AI assistant will automatically reply:
   - Welcome greeting
   - 6 Interactive options (Services, Prices, Booking, Hours, Location, Concierge)
3. Type: `3` or `Book Balayage tomorrow at 3pm`
   - The assistant captures the customer's intent and records the request directly into the **Salon Admin Dashboard** (`/admin`).

---

## 6. Zero-Config Fallback (Website Direct WhatsApp)

Even before setting up the official Meta Cloud API webhook, visitors on the website can click any **"Book Appointment"** or **"Chat on WhatsApp"** button. The website uses standard international `https://wa.me/` protocol with pre-filled luxury consultation requests:
- Customer taps button.
- WhatsApp opens seamlessly on Mobile or WhatsApp Web on Desktop.
- Pre-filled message: *"Hello Elegance Saloon, I would like to enquire about [Service Name] on [Date]..."*
- Zero configuration required for instant client bookings!
