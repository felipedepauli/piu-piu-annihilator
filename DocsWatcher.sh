#!/bin/bash
while inotifywait -r -e modify src docs/doxygen/pages docs/doxygen/main_page.doxy; do
    doxygen Doxyfile
done