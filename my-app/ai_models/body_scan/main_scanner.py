import os
import cv2
import json
import numpy as np
from ShouldersScanner import get_shoulder_width
from ArmsScanner import get_arm_length
from TorsoScanner import get_torso_with_polygon

# ✅ Get the absolute path to the `public/ai_models/body_scan` directory
current_directory = os.path.dirname(os.path.abspath(__file__))  # Get current script directory
public_folder = os.path.abspath(os.path.join(current_directory, "../../public"))
output_json_path = os.path.join(public_folder, "dimensions.json")

# ✅ Ensure the public folder exists
os.makedirs(public_folder, exist_ok=True)

def run_all_scanners():
    # ✅ Initialize the webcam
    cap = cv2.VideoCapture(0)

    # ✅ Variables to store measurements
    shoulder_width = None
    arm_length = None
    torso_length = None
    torso_width = None

    print("Starting webcam for scanning all body parts. Press 'q' to exit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to capture frame from webcam. Exiting...")
            break

        # ✅ Clone the frame for displaying combined annotations
        annotated_frame = frame.copy()

        # ✅ 1. Shoulders Scanner
        shoulder_result, shoulder_annotated_frame = get_shoulder_width(frame)
        if shoulder_result is not None:
            shoulder_width = shoulder_result
            annotated_frame = shoulder_annotated_frame  # Add shoulder annotations

        # ✅ 2. Arms Scanner
        arm_result, arm_annotated_frame = get_arm_length(frame)
        if arm_result is not None:
            arm_length = arm_result
            # Overlay arm annotations on the main frame
            cv2.putText(annotated_frame, f"Arm Length: {arm_length:.2f} cm",
                        (50, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        # ✅ 3. Torso Scanner
        torso_result_length, torso_result_width, torso_annotated_frame = get_torso_with_polygon(frame)
        if torso_result_length is not None and torso_result_width is not None:
            torso_length = torso_result_length
            torso_width = torso_result_width
            # Overlay torso annotations on the main frame
            cv2.putText(annotated_frame, f"Torso Height: {torso_length:.2f} cm",
                        (50, 160), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 0, 0), 2)
            cv2.putText(annotated_frame, f"Torso Width: {torso_width:.2f} cm",
                        (50, 200), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 0, 0), 2)

        # ✅ Display the annotated frame with all measurements
        cv2.imshow("Body Scanner", annotated_frame)

        # ✅ Exit the webcam stream on pressing 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # ✅ Release webcam resources
    cap.release()
    cv2.destroyAllWindows()

    # ✅ Combine all results into a dictionary
    combined_dimensions = {
        "Shoulder Width (cm)": round(shoulder_width, 2) if shoulder_width else None,
        "Arm Length (cm)": round(arm_length, 2) if arm_length else None,
        "Torso Height (cm)": round(torso_length, 2) if torso_length else None,
        "Torso Width (cm)": round(torso_width, 2) if torso_width else None,
    }

    # ✅ Debug: Print generated dimensions
    print("Generated dimensions:", combined_dimensions)

    # ✅ Save combined dimensions to a JSON file
    try:
        with open(output_json_path, "w") as json_file:
            json.dump(combined_dimensions, json_file, indent=4)
        print(f"Dimensions saved successfully to {output_json_path}")
    except Exception as e:
        print(f"Error saving dimensions: {e}")

if __name__ == "__main__":
    print(f"Saving JSON to: {output_json_path}")  # ✅ Debugging Path Verification
    run_all_scanners()
