#!/bin/bash

trap "echo 'Stopping sync...'; exit" SIGINT

while true; do
    rsync -avz --delete \
        /Users/vinaykumar/vinaysdk/vinayprotfolio/ \
        ibm-dev:/root/self-hosted/vinayprotfolio/
    sleep 3
done