from flask import Flask, request, jsonify, render_template

app = Flask(__name__)
current_position = {"x": 0, "y": 0}

@app.route('/')
def home(): 
    return render_template('index.html')

@app.route('/update_position', methods=['POST'])
def update_position():
    data = request.get_json()
    if data and "x" in data and "y" in data:
        current_position["x"] = data["x"]
        current_position["y"] = data["y"]
        return "", 204
    return "Bad Request", 400

@app.route('/get_position', methods=['GET'])
def get_position():
    return jsonify(current_position)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)