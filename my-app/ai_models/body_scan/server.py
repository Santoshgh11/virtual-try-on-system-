from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import os
import signal

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Store the scanning process globally
scanning_process = None

@app.route('/start-scanning', methods=['GET'])
def start_scanning():
    global scanning_process
    if scanning_process is None:  # Start only if not already running
        scanning_process = subprocess.Popen(['python', 'main_scanner.py'])
        return jsonify({"message": "Scanning started"}), 200
    else:
        return jsonify({"message": "Scanning is already running"}), 400

@app.route('/stop-scanning', methods=['GET'])
def stop_scanning():
    global scanning_process
    if scanning_process is not None:
        os.kill(scanning_process.pid, signal.SIGTERM)  # Kill the process
        scanning_process = None
        return jsonify({"message": "Scanning stopped"}), 200
    else:
        return jsonify({"message": "No scanning process found"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
