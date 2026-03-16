# RSVP Google Sheets + Email Setup Guide

This guide takes ~5 minutes. After setup, every RSVP submission will:
- ✅ Save to a Google Sheet (your database)
- ✅ Send you an email notification

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it **"Wedding RSVP Responses"**
4. In **Row 1**, add these headers:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Name | Phone | Guests | Attending | Message |

5. Keep this sheet open — you'll need the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

---

## Step 2: Create the Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New project"**
3. Replace **all** the code with the following:

```javascript
// ============================================
// Wedding RSVP - Google Apps Script
// ============================================

// ⚡ CONFIGURE THESE:
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE";   // From the Sheet URL
const NOTIFY_EMAIL = "pratiksonawane80@gmail.com"; // Your email
const SHEET_NAME = "Sheet1";                      // Sheet tab name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet and append row
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.phone,
      data.guests,
      data.attending,
      data.message || ""
    ]);
    
    // Send email notification
    const subject = `💍 New RSVP: ${data.name} (${data.attending})`;
    const body = `
New RSVP Response Received!
━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${data.name}
📱 Phone: ${data.phone}
👥 Guests: ${data.guests}
✅ Attending: ${data.attending}
💌 Message: ${data.message || "No message"}

⏰ Submitted: ${new Date(data.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

View all responses: https://docs.google.com/spreadsheets/d/${SHEET_ID}
    `;
    
    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this to verify setup
function testRSVP() {
  const testEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Test Guest",
        phone: "+91 98765 43210",
        guests: 2,
        attending: "Yes",
        message: "Congratulations! Can't wait!",
        timestamp: new Date().toISOString()
      })
    }
  };
  
  const result = doPost(testEvent);
  Logger.log(result.getContent());
}
```

4. **Update the constants** at the top:
   - `SHEET_ID` — paste your Google Sheet ID
   - `NOTIFY_EMAIL` — your email address

---

## Step 3: Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**  
2. Click the gear icon (⚙️) next to "Select type" → choose **"Web app"**
3. Set these options:
   - **Description**: "Wedding RSVP"
   - **Execute as**: "Me"
   - **Who has access**: **"Anyone"** ← Important!
4. Click **"Deploy"**
5. Click **"Authorize access"** and allow permissions
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## Step 4: Test It

1. In the Apps Script editor, select **`testRSVP`** from the dropdown
2. Click **▶ Run**
3. Check:
   - ✅ A row appeared in your Google Sheet
   - ✅ You received an email

---

## Step 5: Add the URL to Your Project

### For local development:
Edit `.env.local`:
```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
```

### For Vercel deployment:
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add:
   - **Name**: `GOOGLE_SCRIPT_URL`
   - **Value**: your Apps Script URL
3. **Redeploy** the project

---

## Done! 🎉

Every time someone fills the RSVP form:
1. Data is saved to your Google Sheet
2. You get an email notification
3. The guest sees a "Thank You" confirmation

You can view all responses anytime in your Google Sheet! 📊
