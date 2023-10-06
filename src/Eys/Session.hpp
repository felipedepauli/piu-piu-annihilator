/**
 * @file   Session.hpp
 * @brief  The Session Header File.
 *
 * This file is part of the Evil Eyes project:
 *   - Website: http://www.aincrivelfabrica.com.br
 *   - GitHub: https://github.com/felipedepauli/evil-eyes
 *
 * License:
 *     Copyright (C) 2023 Felipe Camargo de Pauli
 *     All Rights Reserved.
 *
 *     This source code is provided for viewing purposes only. No part of this source code
 *     may be used, modified, distributed, or sublicensed for any purpose without the
 *     express written consent of the copyright holder.
 */

#include <boost/asio.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgcodecs/imgcodecs.hpp>
#include "./Eys.hpp"

using boost::asio::ip::tcp;

/**
 * @class Session
 * @brief Represents a session between the server and a client.
 */
class Session : public std::enable_shared_from_this<Session> {
public:
    /**
     * @brief Constructor for the Session class.
     * @param socket The socket representing the client connection.
     */
    Session(boost::asio::ip::tcp::socket socket, bool debug);

    /**
     * @brief Destructor for the Session class.
     */
    ~Session();

    /**
     * @brief Starts the session.
     */
    void start();

private:
    /**
     * @brief Sends a frame to the client.
     * @param frame The frame to be sent.
     */
    void send_frame(const cv::Mat& frame);

    /**
     * @brief Processes the client's requests.
     * @return The status of the process.
     */
    int process();

    Eys evilEys_;

    boost::asio::ip::tcp::socket socket_;  /**< The socket representing the client connection. */
    uint64_t received_header;  /**< The received header from the client. */
};