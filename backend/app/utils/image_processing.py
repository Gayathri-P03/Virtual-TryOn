# backend/app/utils/image_processing.py

import cv2
import numpy as np
from mediapipe import solutions

# Initialize Mediapipe Pose detector (Windows-compatible)
pose_detector = solutions.pose.Pose(static_image_mode=True)
PoseLandmark = solutions.pose.PoseLandmark

def run_virtual_tryon(user_image_path: str, dress_image_path: str, output_path: str) -> str:
    """
    Overlay a dress image on a user image using perspective warp based on shoulders and hips.
    Works for PNG with alpha or RGB images.
    """
    # Read images
    user_img = cv2.imread(user_image_path)
    dress_img = cv2.imread(dress_image_path, cv2.IMREAD_UNCHANGED)

    if user_img is None or dress_img is None:
        raise ValueError("Invalid image paths")

    user_h, user_w = user_img.shape[:2]
    dress_h, dress_w = dress_img.shape[:2]

    # Pose detection
    user_rgb = cv2.cvtColor(user_img, cv2.COLOR_BGR2RGB)
    results = pose_detector.process(user_rgb)

    if results.pose_landmarks:
        lm = results.pose_landmarks.landmark

        # Body keypoints
        left_shoulder = lm[PoseLandmark.LEFT_SHOULDER]
        right_shoulder = lm[PoseLandmark.RIGHT_SHOULDER]
        left_hip = lm[PoseLandmark.LEFT_HIP]
        right_hip = lm[PoseLandmark.RIGHT_HIP]

        # Convert normalized coordinates to pixel
        pts_user = np.float32([
            [int(left_shoulder.x * user_w), int(left_shoulder.y * user_h)],  # top-left
            [int(right_shoulder.x * user_w), int(right_shoulder.y * user_h)], # top-right
            [int(right_hip.x * user_w), int(right_hip.y * user_h)],           # bottom-right
            [int(left_hip.x * user_w), int(left_hip.y * user_h)]              # bottom-left
        ])

        # Dress image corners
        pts_dress = np.float32([
            [0, 0],
            [dress_w - 1, 0],
            [dress_w - 1, dress_h - 1],
            [0, dress_h - 1]
        ])

        # Get perspective transform and warp
        M = cv2.getPerspectiveTransform(pts_dress, pts_user)
        warped_dress = cv2.warpPerspective(dress_img, M, (user_w, user_h), 
                                           borderMode=cv2.BORDER_TRANSPARENT)

        # Blend dress with user image
        if warped_dress.shape[2] == 4:  # has alpha
            alpha = warped_dress[:, :, 3] / 255.0
            for c in range(3):
                user_img[:, :, c] = (alpha * warped_dress[:, :, c] + (1 - alpha) * user_img[:, :, c])
        else:  # RGB dress
            mask = (warped_dress.sum(axis=2) > 0)  # non-black pixels
            for c in range(3):
                user_img[:, :, c][mask] = warped_dress[:, :, c][mask]

    # Save output
    cv2.imwrite(output_path, user_img)
    return output_path