/**
* @file Eys.hpp
* @brief The Eys Server Header File.
*
* This file is part of the Evil Eyes project:
* - Website: http://www.aincrivelfabrica.com.br
* - GitHub: https://github.com/felipedepauli/evil-eyes
*
* License:
* Copyright (C) 2023 Felipe Camargo de Pauli
* All Rights Reserved.
*
* This source code is provided for viewing purposes only. No part of this source code
* may be used, modified, distributed, or sublicensed for any purpose without the
* express written consent of the copyright holder.
*/


#include "Eys.hpp"


// Constructor: Display a message indicating that the "eyes" are opening.
Eys::Eys(bool debug=false) : debug_(debug), frameInterval_(250) {
    std::cout << "[Eys::Info] Opening eyes!" << std::endl;
    nextFrameTime_ = std::chrono::steady_clock::now() + frameInterval_;
}

// Destructor: Display a message indicating that the "eyes" are closing.
Eys::~Eys() {
    std::cout << "[Eys::Info] Closing eyes." << std:: endl;
}

// Open the camera using the GStreamer pipeline.
int Eys::openEyes() {
    // The cap variable is a reference to a VideoCapture object, which is an OpenCV class for video capture.
    // It takes as an argument a string with the GStreamer pipeline used to open the Raspberry Pi camera.
    // std::string pipeline = "./debug.mp4 ! video/x-raw,framerate=30/1,width=640,height=480 ! videoconvert ! appsink";
    // std::string pipeline = "rpicamsrc ! video/x-raw,framerate=30/1,width=640,height=480 ! videoconvert ! appsink";
    if (debug_) {
        std::cout << "Debugging mode activated" << std::endl;
        cap.open("./debug.mp4");
    } else {
        cap.open(0);
    }
    // cap.open(pipeline, cv::CAP_GSTREAMER);
    cap.set(cv::CAP_PROP_FRAME_WIDTH, 320);
    cap.set(cv::CAP_PROP_FRAME_HEIGHT, 240);


    cap.set(cv::CAP_PROP_BUFFERSIZE, 1);


    // Check if the camera was successfully opened.
    // If not, print an error message and return -1, which will terminate the program immediately.
    if (!cap.isOpened()) {
        std::cerr << "[Eys::Error] Error opening eyes..." << std::endl;
        return -1;
    }
    return 0;
}


cv::Mat Eys::spark() {
    // Wait until it's time for the next frame
    std::this_thread::sleep_until(nextFrameTime_);

    cv::Mat frame;
    cap >> frame;
    if (!debug_) {
        cv::flip(frame, frame, -1);
    }

    // Calculate the time for the next frame
    nextFrameTime_ += frameInterval_;

    return frame;
}


