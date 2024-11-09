class WebAuthnAuthService {
    constructor({ authUrl }) {
      this.authUrl = authUrl;
    }
  
    // Initiates the WebAuthn login
    async initiateAuth(userId) {
      const response = await fetch(`${this.authUrl}/auth/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      return await response.json();
    }
  
    // Completes the WebAuthn authentication with the challenge response
    async completeAuth(userId, credential) {
      const response = await fetch(`${this.authUrl}/auth/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, response: credential }),
      });
      return await response.json();
    }
  
    async login(userId) {
      const challengeOptions = await this.initiateAuth(userId);
  
      const publicKeyCredential = await navigator.credentials.get({
        publicKey: challengeOptions,
      });
  
      const credential = {
        id: publicKeyCredential.id,
        rawId: Array.from(new Uint8Array(publicKeyCredential.rawId)),
        type: publicKeyCredential.type,
        response: {
          clientDataJSON: Array.from(new Uint8Array(publicKeyCredential.response.clientDataJSON)),
          authenticatorData: Array.from(new Uint8Array(publicKeyCredential.response.authenticatorData)),
          signature: Array.from(new Uint8Array(publicKeyCredential.response.signature)),
          userHandle: Array.from(new Uint8Array(publicKeyCredential.response.userHandle || [])),
        },
      };
  
      // Complete authentication and retrieve token
      return await this.completeAuth(userId, credential);
    }
  }
  
  // Usage example:
  const authService = new WebAuthnAuthService({ authUrl: 'http://localhost:3000' });
  authService.login('example-user-id').then((result) => {
    if (result.success) {
      console.log('Authenticated!', result.token);
      // Store token in local storage or cookie for user session
    } else {
      console.log('Authentication failed');
    }
  });
  