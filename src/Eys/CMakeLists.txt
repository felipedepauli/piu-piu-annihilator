cmake_minimum_required(VERSION 3.10)
project(Eys)

option(CROSS_COMPILE_ARM "Cross compile for ARM" ON)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_SYSTEM_NAME Linux)

set(OpenCV_STATIC ON)

if(CROSS_COMPILE_ARM)
    set(OpenCV_DIR /home/fpauli/tools/opencv-4.5.4/build_arm) 
    set(CMAKE_FIND_LIBRARY_SUFFIXES ".a")
    set(CMAKE_EXE_LINKER_FLAGS "-static -static-libgcc -static-libstdc++")
else()
    find_package(Freetype REQUIRED)
    find_package(Iconv REQUIRED)
    set(OpenCV_DIR /home/fpauli/tools/opencv-4.5.4/build_pc)
endif()

if(CROSS_COMPILE_ARM)
    set(CMAKE_SYSTEM_PROCESSOR arm)
    set(CMAKE_BUILD_TYPE Release)
    set(tools /usr)
    set(CMAKE_C_COMPILER ${tools}/bin/arm-linux-gnueabihf-gcc)
    set(CMAKE_CXX_COMPILER ${tools}/bin/arm-linux-gnueabihf-g++)

    add_compile_options(-march=armv7-a -mfpu=neon-vfpv4 -mfloat-abi=hard -mtune=cortex-a72)

    set(EXECUTABLE_NAME Eys)
else()
    set(CMAKE_SYSTEM_PROCESSOR x86_64)
    set(CMAKE_BUILD_TYPE Debug)
    set(CMAKE_C_COMPILER gcc)
    set(CMAKE_CXX_COMPILER g++)

    add_compile_options(-march=native)

    set(EXECUTABLE_NAME Eys_x64)
endif()

# Enable testing
enable_testing()

# Find the required packages for the project
find_package(OpenCV REQUIRED)  # Adicione esta linha
find_package(Boost REQUIRED)
find_package(Threads REQUIRED)
find_package(GTest REQUIRED)

# Include the required directories
include_directories(${GTEST_INCLUDE_DIRS})

# Create the executable
add_executable(${EXECUTABLE_NAME} main.cpp WakeUP.cpp Session.cpp Eys.cpp)

# Link the required libraries
if(CROSS_COMPILE_ARM)
    target_link_libraries(${EXECUTABLE_NAME} ${OpenCV_LIBS} ${Boost_LIBRARIES}  Threads::Threads)
else()
    target_link_libraries(${EXECUTABLE_NAME} ${FREETYPE_LIBRARIES} ${OpenCV_LIBS} ${Boost_LIBRARIES}  Threads::Threads)
endif()

# add_executable(tests your_test_file.cpp)
# target_link_libraries(tests ${GTEST_BOTH_LIBRARIES} pthread)
