# VehicleDetector.py
import cv2
import numpy as np
from ultralytics import YOLO
from ultralytics.yolo.utils.plotting import Annotator


# Object classes used by YOLOv8
classNames = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F" ]

class Anihilator:
    # Constructor receives the path to the YOLOv8 model and the number of frames to skip
    def __init__(self, model_path='targets.pt'):
        
        print("Loading Targests model [{}]...".format(model_path))
        self.model = YOLO(model_path)
        print("Targets model loaded")

        # Create a list of colors for bounding boxes
        self.colors = [(0, 200, 0), (0, 0, 200), (200, 0, 0), (200, 200, 0), (0, 200, 200), (200, 0, 200)]

    def get_target(self, frame):
        results = self.model(frame, verbose=False)  # Use Yolov8 to detect vehicles
        annotator = Annotator(frame)
        
        bounding_box = None
        class_label = None

        for result in results:
            boxes = result.boxes
            for box in boxes:
                b = box.xyxy[0]  # get box coordinates in (top, left, bottom, right) format
                c = int(box.cls.item())
                conf = box.conf.item()

                if conf > 0.5:
                    label = f'{classNames[c]} {conf:.2f}'
                    color = self.colors[c % len(self.colors)]  # Assign a color based on class
                    annotator.box_label(b, label, color)

                    # Store the first bounding box and class label with confidence > 0.5
                    if bounding_box is None:
                        bounding_box = b
                        class_label = classNames[c]
                        break

        annotated_frame = annotator.result()

        # Return the annotated frame along with class and bounding box
        return annotated_frame, class_label, bounding_box

