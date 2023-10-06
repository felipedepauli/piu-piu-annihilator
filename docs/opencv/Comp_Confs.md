# OpenCV Configuration

The configuration can be done using the following syntax on the command line:
```bash
$ cmake -Doption=value ...
```
If you want to load an initial cache file, you can use the -C option to the command line:
```bash
$ cmake -C my_options.txt ...
```
You find almost all options in the opencv/CMakeLists.txt file. The easier way to see all the options is this:
```bash
$ mkdir build && cd build && cmake ../opencv && cmake -LH
```
-LH will list all options with a Help.

You can use extra modules to enhance your OpenCV. To do this, you can use on the command line the following option:
```bash
cmake -DOPENCV_EXTRA_MODULES_PATH=../opencv_contrib ../opencv
```
This is an example of how to install the opencv-contrib extra module.
If you want more than one extra module, you can separte them with semicolons.

```bash
cmake -DOPENCV_EXTRA_MODULES_PATH=../my_mod1\;../my_mod2 ../opencv
```


If you want to compile your program as static, you have to disable the following option:
```bash
cmake -DBUILD_SHARE_LIBS=OFF ../opencv
```
### Options naming conventions
There are three kinds of options used to control dependencies of the library, they have different prefixes:

- Options starting with WITH_ enable or disable a dependency
- Options starting with BUILD_ enable or disable building and using 3rdparty library bundled with OpenCV
- Options starting with HAVE_ indicate that dependency have been enabled, can be used to manually enable a dependency if automatic detection can not be used.

When WITH_ option is enabled:

If BUILD_ option is enabled, 3rdparty library will be built and enabled => HAVE_ set to ON
If BUILD_ option is disabled, 3rdparty library will be detected and enabled if found => HAVE_ set to ON if dependency is found









## My conf
```bash
$ cmake \
-DCMAKE_TOOLCHAIN_FILE=../platforms/linux/arm-gnueabi.toolchain.cmake \
-DCMAKE_BUILD_TYPE=Release \
-DOPENCV_EXTRA_MODULES_PATH=../../opencv_contrib-4.5.4/modules \
-DBUILD_SHARED_LIBS=OFF \
-DWITH_GSTREAMER=ON \
..
```bash

