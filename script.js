class EmailProvider {
    constructor(name) {
      this.name = name;
      this.failRate = Math.random() > 0.5 ? 0.7 : 0.3; // Random failure rate
    }
  
    async send(email, message) {
      const shouldFail = Math.random() < this.failRate;
      if (shouldFail) {
        throw new Error(`${this.name} failed to send.`);
      }
      return `${this.name} successfully sent!`;
    }
  }
  
  class EmailService {
    constructor(providers) {
      this.providers = providers;
      this.currentProviderIndex = 0;
      this.retryCount = 3;
      this.rateLimit = 3;
      this.sentEmails = new Set();
      this.queue = [];
      this.isSending = false;
    }
  
    async sendEmail(email, message) {
      const emailId = `${email}:${message}`;
      if (this.sentEmails.has(emailId)) {
        this.log(`Duplicate email detected for ${email}.`);
        this.showToast("Duplicate email detected!", "error");
        return;
      }
  
      this.queue.push({ email, message });
      this.processQueue();
    }
  
    async processQueue() {
      if (this.isSending || this.queue.length === 0) return;
  
      this.isSending = true;
      const { email, message } = this.queue.shift();
  
      let attempts = 0;
      while (attempts < this.retryCount) {
        try {
          const provider = this.providers[this.currentProviderIndex];
          const result = await provider.send(email, message);
          this.log(result);
          this.sentEmails.add(`${email}:${message}`);
          this.showToast("Email sent successfully!", "success");
          break;
        } catch (error) {
          this.log(error.message);
          attempts++;
          if (attempts < this.retryCount) {
            this.log(`Retrying... (${attempts}/${this.retryCount})`);
            await this.sleep(attempts * 1000); // Exponential backoff
          } else {
            this.log("Switching provider...");
            this.showToast("Switching provider...", "error");
            this.currentProviderIndex =
              (this.currentProviderIndex + 1) % this.providers.length;
          }
        }
      }
      this.isSending = false;
      this.processQueue();
    }
  
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    log(message) {
      const logDiv = document.getElementById("log");
      logDiv.innerHTML += `<p>${message}</p>`;
      logDiv.scrollTop = logDiv.scrollHeight;
    }
  
    showToast(message, type) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.className = `toast show ${type}`;
      setTimeout(() => {
        toast.className = "toast";
      }, 3000);
    }
  }
  
  const provider1 = new EmailProvider("Provider1");
  const provider2 = new EmailProvider("Provider2");
  const emailService = new EmailService([provider1, provider2]);
  
  document.getElementById("emailForm").addEventListener("submit", async event => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    document.querySelector("button").disabled = true;
    emailService.sendEmail(email, message);
    document.querySelector("button").disabled = false;
  });
  