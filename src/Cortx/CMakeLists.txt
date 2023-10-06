cmake_minimum_required(VERSION 3.5)
project(Cortx)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++14 -pthread -g")

# Busca as bibliotecas necessárias
find_package(OpenCV REQUIRED)
find_package(Boost REQUIRED COMPONENTS system)

# Adiciona o executável do projeto
add_executable(Cortx main.cpp Cortx.cpp Processing/Detector.cpp)

# Define as bibliotecas a serem vinculadas com o executável
target_link_libraries(Cortx ${OpenCV_LIBS} ${Boost_LIBRARIES} pthread)
