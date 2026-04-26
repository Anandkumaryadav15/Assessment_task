class FrontendAgent {
  /**
   * Parses the user input to determine the core topic.
   */
  extractTopic(inputValue) {
    const lowerInput = inputValue.toLowerCase();
    let extractedTopic = inputValue;
    
    if (lowerInput.includes('blog')) {
      if (lowerInput.includes(' on ')) {
        extractedTopic = inputValue.split(/ on /i)[1];
      } else if (lowerInput.includes(' about ')) {
        extractedTopic = inputValue.split(/ about /i)[1];
      }
    }
    
    return extractedTopic;
  }

  /**
   * Prepares the payload to be sent to the Backend Agent.
   */
  preparePayload(action, topic, tone = null) {
    if (action === 'init') {
      return { action: 'init', topic };
    } else if (action === 'clarify') {
      return { action: 'clarify', topic, tone };
    }
    return {};
  }
}

export const frontendAgent = new FrontendAgent();
