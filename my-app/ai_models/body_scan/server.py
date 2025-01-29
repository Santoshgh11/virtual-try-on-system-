# from flask import Flask, request, jsonify
# import cv2
# import mediapipe as mp

# app = Flask(__name__)

# @app.route('/api/body-scan', methods=['POST'])
# def body_scan():
#     body_data = request.json
#     # Use OpenCV and MediaPipe to process body scan data
#     # Perform the scan and return results
#     processed_data = process_body_scan(body_data)  # Function to process the data
#     return jsonify(processed_data)

# def process_body_scan(data):
#     # Implement your body scanning logic here using OpenCV and MediaPipe
#     return {"body_measurements": "sample data"}

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)



# from flask import Flask, request, jsonify
# import cv2
# import mediapipe as mp
# import subprocess
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS to allow frontend access

# @app.route('/api/body-scan', methods=['POST'])
# def body_scan():
#     try:
#         body_data = request.json
#         print("Received Body Scan Data:", body_data)

#         # Run OpenCV + MediaPipe Processing
#         processed_data = process_body_scan(body_data)

#         # Run additional scan scripts (Arms, Shoulders, Torso)
#         arm_result = subprocess.run(['python', 'ArmsScanner.py'], capture_output=True, text=True)
#         shoulder_result = subprocess.run(['python', 'ShouldersScanner.py'], capture_output=True, text=True)
#         torso_result = subprocess.run(['python', 'TorsoScanner.py'], capture_output=True, text=True)

#         # If any subprocess fails, return an error
#         if arm_result.returncode != 0 or shoulder_result.returncode != 0 or torso_result.returncode != 0:
#             return jsonify({'error': 'Scanning failed'}), 500

#         # Return all results
#         return jsonify({
#             'success': True,
#             'body_measurements': processed_data,
#             'arm_data': arm_result.stdout.strip(),
#             'shoulder_data': shoulder_result.stdout.strip(),
#             'torso_data': torso_result.stdout.strip()
#         })

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# def process_body_scan(data):
#     """Process body scan using OpenCV & MediaPipe"""
#     # Example: Extract image from request (if provided)
#     if "image" in data:
#         image_path = data["image"]
#         image = cv2.imread(image_path)
        
#         # Convert to RGB for MediaPipe processing
#         mp_drawing = mp.solutions.drawing_utils
#         mp_pose = mp.solutions.pose
#         with mp_pose.Pose(static_image_mode=True) as pose:
#             results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
#             if results.pose_landmarks:
#                 return {"pose_landmarks": str(results.pose_landmarks)}
    
#     return {"body_measurements": "No image provided"}

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001)  # Change to port 5001 to avoid conflicts







# from flask import Flask, request, jsonify
# import cv2
# import mediapipe as mp
# import subprocess
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# @app.route('/api/body-scan', methods=['POST'])
# def body_scan():
#     try:
#         body_data = request.json
#         print("✅ Received Body Scan Data:", body_data)

#         # Run OpenCV + MediaPipe Processing
#         processed_data = process_body_scan(body_data)

#         # Run additional scan scripts (Arms, Shoulders, Torso)
#         arm_result = subprocess.run(['python', 'ArmsScanner.py'], capture_output=True, text=True)
#         shoulder_result = subprocess.run(['python', 'ShouldersScanner.py'], capture_output=True, text=True)
#         torso_result = subprocess.run(['python', 'TorsoScanner.py'], capture_output=True, text=True)

#         # If any subprocess fails, return an error
#         if arm_result.returncode != 0 or shoulder_result.returncode != 0 or torso_result.returncode != 0:
#             return jsonify({'error': 'Scanning failed'}), 500

#         # Return all results
#         return jsonify({
#             'success': True,
#             'body_measurements': processed_data,
#             'arm_data': arm_result.stdout.strip(),
#             'shoulder_data': shoulder_result.stdout.strip(),
#             'torso_data': torso_result.stdout.strip()
#         })

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# def process_body_scan(data):
#     """Process body scan using OpenCV & MediaPipe"""
#     if "image" in data:
#         image_path = data["image"]
#         image = cv2.imread(image_path)

#         # Convert to RGB for MediaPipe processing
#         mp_drawing = mp.solutions.drawing_utils
#         mp_pose = mp.solutions.pose
#         with mp_pose.Pose(static_image_mode=True) as pose:
#             results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
#             if results.pose_landmarks:
#                 return {"pose_landmarks": str(results.pose_landmarks)}

#     return {"body_measurements": "No image provided"}

# if __name__ == '__main__':
#     port = 5001  # Ensure this is the correct port
#     print(f"🚀 AI Model Server running on http://localhost:{port}")  # Print server URL
#     app.run(host='0.0.0.0', port=port)






from flask import Flask, request, jsonify
import cv2
import mediapipe as mp
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend to communicate

@app.route('/api/body-scan', methods=['POST'])
def body_scan():
    try:
        body_data = request.json
        print("✅ Received Body Scan Data:", body_data)

        # Run OpenCV + MediaPipe Processing
        processed_data = process_body_scan(body_data)

        # Run additional scan scripts (Arms, Shoulders, Torso)
        arm_result = subprocess.run(['python', 'ArmsScanner.py'], capture_output=True, text=True)
        shoulder_result = subprocess.run(['python', 'ShouldersScanner.py'], capture_output=True, text=True)
        torso_result = subprocess.run(['python', 'TorsoScanner.py'], capture_output=True, text=True)

        # If any subprocess fails, return an error
        if arm_result.returncode != 0 or shoulder_result.returncode != 0 or torso_result.returncode != 0:
            return jsonify({'error': 'Scanning failed'}), 500

        # Return all results
        return jsonify({
            'success': True,
            'body_measurements': processed_data,
            'arm_data': arm_result.stdout.strip(),
            'shoulder_data': shoulder_result.stdout.strip(),
            'torso_data': torso_result.stdout.strip()
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def process_body_scan(data):
    """Process body scan using OpenCV & MediaPipe"""
    return {"body_measurements": "Sample Data"}

if __name__ == '__main__':
    port = 5001  # Ensure this is the correct port
    print(f"🚀 AI Model Server running on http://localhost:{port}")  # Print server URL
    app.run(host='0.0.0.0', port=port)

    
