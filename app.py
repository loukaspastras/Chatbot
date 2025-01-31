from flask import Flask, send_from_directory, request, jsonify

app = Flask(__name__)

@app.route('/')
def serve_template():
    # Serve the template.html file from the static directory
    return send_from_directory('templates', 'index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    
    # Simple dummy response for now
    response = "αυτή είναι μία δοκιμαστική απάντηση"
    
    # Return a JSON response
    return jsonify({"message": response})

if __name__ == "__main__":
    app.run(debug=True)