if (window.ws && window.ws.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({ 
      demo_crat : localStorage.getItem("demo_crat"),
      conversation_id : conversation_id,
      "topic": "conversation_id "+ conversation_id,
      "response": "agree",
      "mouseCurvatureAnglePdf": [0.1, 0.1,],
      "interactionSimilarityScore": 50
    });
    window.ws.send(message);
    console.log("Sent:", message);
  }  else {
    // Create a new WebSocket connection to the server
    //window.ws = new WebSocket("wss://polis.local:5801");
    window.ws = new WebSocket("https://notifications.test-deployment.xyz");

    // When the WebSocket connection opens
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // When a message is received from the server
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data).message;
      console.log("Received:", message);
    };

    // When the WebSocket connection is closed
    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    // When there's an error with the WebSocket connection
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    setTimeout(function (){
      try {
        const message = JSON.stringify({ 
          demo_crat : localStorage.getItem("demo_crat"),
          conversation_id : conversation_id,
          topic: "conversation_id " + conversation_id,
          response: "pass",
          mouseCurvatureAnglePdf: [0.1, 0.1 ],
          interactionSimilarityScore: 50
        });
        window.ws.send(message);
      } catch (error) {
        console.log("issues with websocket")
      }

    }, 5000);
  }