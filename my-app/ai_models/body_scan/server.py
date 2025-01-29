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
# import json
# from ArmsScanner import get_arm_length
# from ShouldersScanner import get_shoulder_width
# from TorsoScanner import get_torso_with_polygon

# app = Flask(__name__)

# # Initialize MediaPipe Pose
# mp_pose = mp.solutions.pose
# pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.7, model_complexity=1)

# @app.route("/api/body-scan", methods=["POST"])
# def body_scan():
#     try:
#         cap = cv2.VideoCapture(0)
#         ret, frame = cap.read()
        
#         if not ret:
#             return jsonify({"error": "Failed to capture image"}), 500
        
#         # Run AI measurement models
#         arm_length_cm, _ = get_arm_length(frame)
#         shoulder_width_cm, _ = get_shoulder_width(frame)
#         torso_length_cm, torso_width_cm, _ = get_torso_with_polygon(frame)

#         measurements = {
#             "arm_length": round(arm_length_cm, 2),
#             "shoulder_width": round(shoulder_width_cm, 2),
#             "torso_length": round(torso_length_cm, 2),
#             "torso_width": round(torso_width_cm, 2)
#         }

#         cap.release()
#         cv2.destroyAllWindows()
        
#         print("Processed Measurements:", measurements)  # Log the measurements
#         return jsonify(measurements)

#     except Exception as e:
#         print(f"Error in body scan: {e}")
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)


# from flask import Flask, request, jsonify
# import cv2
# import mediapipe as mp
# import subprocess
# from flask_cors import CORS

# app = Flask(_name_)
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

# if _name_ == '_main_':
#     port = 5001  # Ensure this is the correct port
#     print(f"🚀 AI Model Server running on http://localhost:{port}")  # Print server URL
#     app.run(host='0.0.0.0', port=port)


# from flask import Flask, request, jsonify
# import cv2
# import mediapipe as mp
# import numpy as np
# import base64
# from io import BytesIO
# from PIL import Image
# from pymongo import MongoClient

# app = Flask(__name__)

# # Initialize MongoDB
# client = MongoClient("mongodb://localhost:27017/")
# db = client["body_scan_db"]
# collection = db["measurements"]

# mp_pose = mp.solutions.pose
# pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.7)

# def process_image(image_data):
#     """Extracts body measurements from image."""
#     try:
#         # Decode Base64 Image
#         image_bytes = base64.b64decode(image_data.split(",")[1])
#         image = np.array(Image.open(BytesIO(image_bytes)))

#         # Convert to RGB for MediaPipe processing
#         image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#         results = pose.process(image_rgb)

#         if results.pose_landmarks:
#             landmarks = results.pose_landmarks.landmark
#             body_measurements = {
#                 "arm_length": round(landmarks[mp_pose.PoseLandmark.LEFT_WRIST].y - landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y, 2),
#                 "shoulder_width": round(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER].x - landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].x, 2),
#                 "torso_length": round(landmarks[mp_pose.PoseLandmark.LEFT_HIP].y - landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y, 2)
#             }
#             # Save to MongoDB
#             collection.insert_one(body_measurements)
#             return body_measurements
#         else:
#             return None
#     except Exception as e:
#         return {"error": str(e)}

# @app.route('/api/body-scan', methods=['POST'])
# def body_scan():
#     try:
#         data = request.json
#         image_data = data.get("image")

#         if not image_data:
#             return jsonify({"error": "No image data received"}), 400

#         measurements = process_image(image_data)

#         if measurements:
#             return jsonify({"success": True, "measurements": measurements})
#         else:
#             return jsonify({"error": "Body not detected"}), 400

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)

# second last  


# from flask import Flask, request, jsonify
# import cv2
# import mediapipe as mp
# import numpy as np
# import base64
# from io import BytesIO
# from PIL import Image
# from pymongo import MongoClient

# app = Flask(__name__)

# # Initialize MongoDB
# client = MongoClient("mongodb://localhost:27017/")
# db = client["body_scan_db"]
# collection = db["measurements"]

# mp_pose = mp.solutions.pose
# pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.7)

# def process_image(image_data):
#     """Extracts body measurements from image."""
#     try:
#         # Decode Base64 Image
#         image_bytes = base64.b64decode(image_data.split(",")[1])
#         image = np.array(Image.open(BytesIO(image_bytes)))

#         # Print image size for debugging
#         print("📷 Image Received:", image.shape)

#         # Convert to RGB for MediaPipe processing
#         image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#         results = pose.process(image_rgb)

#         if results.pose_landmarks:
#             landmarks = results.pose_landmarks.landmark
#             body_measurements = {
#                 "arm_length": round(landmarks[mp_pose.PoseLandmark.LEFT_WRIST].y - landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y, 2),
#                 "shoulder_width": round(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER].x - landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].x, 2),
#                 "torso_length": round(landmarks[mp_pose.PoseLandmark.LEFT_HIP].y - landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y, 2)
#             }
#             # Save to MongoDB
#             collection.insert_one(body_measurements)
#             print("✅ Body Measurements Stored:", body_measurements)
#             return body_measurements
#         else:
#             print("❌ No Body Detected in Image")
#             return None
#     except Exception as e:
#         print("⚠️ Processing Error:", str(e))
#         return {"error": str(e)}

# @app.route('/api/body-scan', methods=['POST'])
# def body_scan():
#     try:
#         data = request.json
#         image_data = data.get("image")

#         if not image_data:
#             print("❌ No Image Data Received")
#             return jsonify({"error": "No image data received"}), 400

#         measurements = process_image(image_data)

#         if measurements:
#             return jsonify({"success": True, "measurements": measurements})
#         else:
#             return jsonify({"error": "Body not detected"}), 400

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)


from flask import Flask, request, jsonify
import cv2
import mediapipe as mp
import numpy as np
import base64
from io import BytesIO
from PIL import Image
from pymongo import MongoClient

app = Flask(__name__)

# Initialize MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["body_scan_db"]
collection = db["measurements"]

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.7)

def process_image(image_data):
    try:
        image_bytes = base64.b64decode(image_data.split(",")[1])
        image = np.array(Image.open(BytesIO(image_bytes)))
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = pose.process(image_rgb)

        if results.pose_landmarks:
            landmarks = results.pose_landmarks.landmark
            body_measurements = {
                "arm_length": round(landmarks[mp_pose.PoseLandmark.LEFT_WRIST].y - landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y, 2),
                "shoulder_width": round(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER].x - landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].x, 2),
                "torso_length": round(landmarks[mp_pose.PoseLandmark.LEFT_HIP].y - landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y, 2)
            }
            collection.insert_one(body_measurements)
            return body_measurements
        else:
            return None
    except Exception as e:
        return {"error": str(e)}

@app.route('/api/body-scan', methods=['POST'])
def body_scan():
    data = request.json
    image_data = data.get("image")

    if not image_data:
        return jsonify({"error": "No image data received"}), 400

    measurements = process_image(image_data)
    if measurements:
        return jsonify({"success": True, "measurements": measurements})
    else:
        return jsonify({"error": "Body not detected"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
