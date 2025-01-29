import cv2
import mediapipe as mp
import json
import os

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.7, model_complexity=1)

def calculate_distance(point1, point2):
    """
    Calculates the Euclidean distance between two points in pixels.
    """
    return ((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2) ** 0.5

def get_shoulder_width(frame, face_width_cm=16, scaling_adjustment=0.75):
    """
    Detects shoulders and calculates the shoulder width in centimeters.
    Args:
        frame: The input frame from the webcam.
        face_width_cm: Average human face width in cm (used for pixel-to-cm scaling).
        scaling_adjustment: A scaling adjustment factor to refine the calculated dimensions.
    Returns:
        Shoulder width in centimeters and the modified frame with annotations.
    """
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(frame_rgb)

    annotated_frame = frame.copy()  # Create a copy of the frame for annotations
    if results.pose_landmarks:
        landmarks = results.pose_landmarks.landmark

        height, width, _ = frame.shape

        # Draw all pose landmarks as small circles
        for landmark in landmarks:
            x = int(landmark.x * width)
            y = int(landmark.y * height)
            cv2.circle(annotated_frame, (x, y), 5, (0, 0, 255), -1)  # Red dots for landmarks

        # Extract shoulder landmarks (left and right shoulders)
        left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
        right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]

        # Convert normalized coordinates to pixels
        left_shoulder_px = (int(left_shoulder.x * width), int(left_shoulder.y * height))
        right_shoulder_px = (int(right_shoulder.x * width), int(right_shoulder.y * height))

        # Draw line connecting shoulders
        cv2.line(annotated_frame, left_shoulder_px, right_shoulder_px, (0, 255, 0), 2)

        # Calculate the distance between shoulders in pixels
        shoulder_width_px = calculate_distance(left_shoulder_px, right_shoulder_px)

        # Estimate pixel-to-cm ratio using face landmarks
        face_landmarks = [mp_pose.PoseLandmark.NOSE, mp_pose.PoseLandmark.LEFT_EAR]
        face_px_distance = calculate_distance(
            (int(landmarks[face_landmarks[0]].x * width), int(landmarks[face_landmarks[0]].y * height)),
            (int(landmarks[face_landmarks[1]].x * width), int(landmarks[face_landmarks[1]].y * height))
        )

        px_to_cm_ratio = face_width_cm / face_px_distance

        # Apply scaling adjustment to refine dimensions
        shoulder_width_cm = shoulder_width_px * px_to_cm_ratio * scaling_adjustment

        # Annotate shoulder width on the frame
        cv2.putText(annotated_frame, f"Shoulder Width: {shoulder_width_cm:.2f} cm",
                    (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 0), 2)

        return shoulder_width_cm, annotated_frame

    return None, annotated_frame  # Return frame even if landmarks are not detected

def main():
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Scale down the calculated shoulder width using the scaling_adjustment factor
        shoulder_width_cm, annotated_frame = get_shoulder_width(frame, scaling_adjustment=0.85)

        # Display the annotated frame
        cv2.imshow("Shoulder Scanner", annotated_frame)

        # Exit the stream on pressing 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
