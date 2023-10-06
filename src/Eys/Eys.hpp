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


#include <boost/asio.hpp>
#include <memory>
#include <thread>
#include <vector>
#include <iostream>
#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgcodecs/imgcodecs.hpp>
#include <chrono>
#include <fstream>


using boost::asio::ip::tcp;


/**
* @class Eys
* @brief Main class for the Eys server.
*/
class Eys {
    public:
    /**
    * @brief Constructor for the Eys server.
    *
    * @param port The port on which the server will run.
    */
    Eys(bool debug);
    
    ~Eys();
    /**
    * @brief Opens the camera device.
    * @param cap Reference to the VideoCapture object.
    * @return 0 if the camera is opened successfully, -1 otherwise.
    */

    int openEyes();
    cv::Mat spark();

    private:
        cv::VideoCapture cap;
        bool debug_;
        std::chrono::steady_clock::time_point nextFrameTime_;  // New member
        std::chrono::milliseconds frameInterval_;  // New member

};
