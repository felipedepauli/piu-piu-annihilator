// WakeUP.hpp
/**
* @file WakeUP.hcpp
* @brief The WakeUP Server Source File.
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


#include "WakeUP.hpp"


// Constructor for the WakeUP server
WakeUP::WakeUP(short port, bool debug_mode) : acceptor_(io_context_, boost::asio::ip::tcp::endpoint(boost::asio::ip::tcp::v4(), port)), debug_mode_(debug_mode) {
    // Print a message indicating that the server has started
    std::cout << "[WakeUP::Info] Server started on port " << port << std::endl;

    // Start listening for connections
    listening();
}

// Run the server, starting the event loop for incoming connections
void WakeUP::run() {
    // Run the io_context object's event loop
    io_context_.run();
}


// Start an asynchronous operation to accept a new connection
void WakeUP::listening() {
    // Print a message indicating that the server is waiting for a new connection
    std::cout << "[WakeUP::Info] Waiting for new connection" << std::endl;


    // Initiate an asynchronous accept operation
    acceptor_.async_accept(

        // Connection accepted handler
        [this](boost::system::error_code ec, boost::asio::ip::tcp::socket socket) {

            // If there is no error
            if (!ec) {
                // Print a message indicating that a new connection has been accepted
                std::cout << "[WakeUP::Info] New connection accepted" << std::endl;

                // Create a new session and start it
                auto new_session = std::make_shared<Session>(std::move(socket), debug_mode_);

                // Create a new thread and associate new_session->start to it
                session_threads_.push_back(std::make_shared<std::thread>([new_session]() {

                    try {
                        // Start the session
                        new_session->start();
                    } catch (const std::exception& e) {
                        // If an exception is thrown, print a message indicating that the client has disconnected
                        std::cerr << "[WakeUP::Info] Client disconnected"<< std::endl;
                    } catch (...) {
                        // If an unknown exception is thrown, print an error message
                        std::cerr << "[WakeUP::Error] Unknown exception occurred in session" << std::endl;
                    }
                }));

            } else {
            // If there is an error, print an error message
                std::cerr << "[WakeUP::Error] Error accepting new connection: " << ec.message() << std::endl;
            }


        // After creating or not a new session, return to initial listening state
        listening();
    });
}