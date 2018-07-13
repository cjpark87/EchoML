#!/bin/bash

case "$1" in
    start)
        sudo docker run -d -p 8000:8000 -it --rm -e PORT='8000' -e MONGO_HOST='mongodb://10.49.200.88' -e MONGO_USERNAME='admin' -e MONGO_PASSWORD='nblcambridge' -e STORAGE_ACCOUNT='echomlannotation' -e STORAGE_ACCESS_KEY='rTXwqe9+hgWa8JtiujHk8kj3HOopXLFV49lTqurpdESK/rxR6cDXxTUpJgpEGYj6IDnniAlck+MdSIQzUftxhg==' echoml:latest
        ;;
    build)
        sudo docker build -t echoml .
        ;;
    stop)
        sudo docker kill $(sudo docker ps -q)
        ;;
    *)
        echo "Unrecognized argument"
        ;;
    esac
