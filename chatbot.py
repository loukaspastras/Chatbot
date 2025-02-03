import os
import json
import google.generativeai as genai

# Gemini setup
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

generation_config = {
    "temperature": 0.4,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

system_instruction = """You are a helpful and friendly assistant for "Αγγλικά Πάστρας" language school, located in Marousi, Attica, Greece, at 3 Odyssea Androutsou Street, postal code 15124. Our phone number is 2106123474. We specialize exclusively in English language instruction.

[Rest of your system prompt - same as before]
"""

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
    system_instruction=system_instruction,
)

chat_session = model.start_chat(history=[])  # Initialize chat history


def get_gemini_response(user_message):
    response = chat_session.send_message(user_message)

    try:
        json_response = json.loads(response.text)
        generated_text = json_response["candidates"][0]["content"]["parts"][0]["text"]
        return generated_text

    except json.JSONDecodeError:
        return response.text  # Return plain text

    except (KeyError, IndexError) as e:
        print(f"Error processing JSON response: {e}")
        print("Raw Response:", response.text)
        return "Error processing response"  # Or handle the error as you see fit
