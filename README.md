# Email Sending Service

A simple web application to simulate sending emails using multiple email providers. This project demonstrates retry mechanisms, provider fallback, and an interactive user interface.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)


---

## Overview

The **Email Sending Service** is a frontend-only web application designed to send emails using simulated providers. It includes a retry mechanism, logging, and graceful fallback to alternate providers if one fails. The application features a responsive design and real-time notifications.

---

## Features

- **Multiple Email Providers**: Simulates fallback when one provider fails.
- **Retry Mechanism**: Retries up to 3 times before switching providers.
- **Queue System**: Handles multiple email requests efficiently.
- **Logs**: Displays a detailed log of sent and failed email attempts.
- **Toasts**: Real-time success or error notifications.
- **Duplicate Prevention**: Prevents duplicate emails from being sent.

---

## How It Works

1. User enters the recipient's email and message in the form.
2. On submission:
   - The app tries to send the email using the current provider.
   - If the provider fails, it retries up to 3 times.
   - After retries, it switches to the next provider and continues the process.
3. Logs are updated with the status of each attempt.
4. Toast notifications provide real-time feedback.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sunildaulatakar/email-sending-service.git

2. Navigate to the project directory:
cd email-sending-service

3. Open the index.html file in a browser to run the application.

4. Usage
Open the app in your browser.
Enter the recipient's email and your message in the form.
Click the "Send Email" button.
View real-time logs and notifications as the email is processed.

5. File Structure
email-sending-service/
├── index.html    # Main HTML file (UI structure)
├── style.css     # Styling for the application
├── script.js     # JavaScript logic (email sending logic)
├── README.md     # Project documentation

6. Technologies Used
HTML: Structure of the application.
CSS: Styling and responsive design.
JavaScript: Core functionality, email handling, and provider logic.


