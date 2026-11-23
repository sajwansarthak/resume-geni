const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function generateInterviewReport ({ resume, selfDescription, jobDescription }){

    const prompt = `

    You are a Senior Software Engineering Interviewer.
    
    Analyze the candidate's resume, self description, and job description.
    
    Return ONLY valid JSON.
    
    The JSON MUST have EXACTLY this structure:
    
    {
      "title": "",
    
      "matchScore": 0,
    
      "technicalQuestions": [
    
        {
    
          "question": "",
    
          "intention": "",
    
          "answer": ""
    
        }
    
      ],
    
      "behaviourQuestions": [
    
        {
    
          "question": "",
    
          "intention": "",
    
          "answer": ""
    
        }
    
      ],
    
      "skillGap": [
    
        {
    
          "skill": "",
    
          "severity": "low"
    
        }
    
      ],
    
      "preparationPlan": [
    
        {
    
          "day": 1,
    
          "focus": "",
    
          "tasks": [
    
            "",
    
            ""
    
          ]
    
        }
    
      ]
    
    }
    
    Requirements:

    - title should be the job title extracted from the job description.
    
    - matchScore should be between 0 and 100.
    
    - Generate EXACTLY 10 technicalQuestions.
    
    - Each technical question must include:
    
      - question
    
      - intention
    
      - answer
    
    - Generate EXACTLY 8 behaviourQuestions.
    
    - Each behavioural question must include:
    
      - question
    
      - intention
    
      - answer
    
    - Generate AT LEAST 5 skillGap objects.
    
    - Each skill gap must contain:
    
      - skill
    
      - severity (low, medium, or high)
    
    - Generate a 14-day preparationPlan.
    
    - Each day must contain:
    
      - day
    
      - focus
    
      - tasks (minimum 2 tasks)
    
    DO NOT return arrays of strings.
    
    DO NOT omit any field.
    
    DO NOT include markdown or explanation.
    
    Resume:
    
    ${resume}
    
    Self Description:
    
    ${selfDescription}
    
    Job Description:
    
    ${jobDescription}
    
    `;


    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config:{
            responseMimeType: "application/json",
        }
    })
    const report = JSON.parse(response.text)
    return report
}

module.exports = generateInterviewReport