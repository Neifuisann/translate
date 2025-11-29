
const GROQ_API_KEY = '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';

export const translateText = async (
  text: string,
  sourceLangName: string,
  targetLangName: string
): Promise<string> => {
  if (!text.trim()) return "";

  // Select logic based on target language
  let systemContent = "";
  // Using a robust, high-performance model available on Groq
  // "openai/gpt-oss-120b" from the snippet is likely not a valid public model ID,
  // so we fallback to Llama 3.3 70B Versatile for best results.
  const model = "openai/gpt-oss-120b"; 

  if (targetLangName === 'Vietnamese') {
    // Translation Mode: English -> Vietnamese
    systemContent = "You are a professional translator. Translate the user input from English to Vietnamese. Output only the translation.";
  } else {
    // Chemistry Solver Mode: Target is English (Concise)
    systemContent = `You are an expert Chemistry Professor and Problem Solver.
    
    Task: Solve the following chemistry problem or answer the chemistry question.
    Problem Type: ${sourceLangName}
    
    Constraints:
    1. Think carefully about the chemical principles, stoichiometry, molecular structure, and reaction mechanisms involved.
    2. Provide the FINAL ANSWER ONLY.
    3. The final response MUST be LESS THAN 50 WORDS.
    4. Do not include your internal monologue or step-by-step derivation in the final output, just the result and key reasoning if space permits.`;
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: text }
        ],
        temperature: 1,
        max_tokens: 4098, 
        top_p: 1,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API Error:", errorData);
      throw new Error(`Groq API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("Solver error:", error);
    throw new Error("Failed to process request.");
  }
};
