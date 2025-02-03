from flask import Flask, send_from_directory, request, jsonify
import chatbot  # Import the chatbot module

app = Flask(__name__)

@app.route('/')
def serve_template():
    return send_from_directory('templates', 'index.html')


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    gemini_response = chatbot.get_gemini_response(user_message)  # Call the function!

    return jsonify({"message": gemini_response})  # Return the response from Gemini


if __name__ == "__main__":
    app.run(debug=True)
