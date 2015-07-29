#!/bin/sh


docker build --tag=muon/photon .
docker run -e AMQP=10.0.2.15:5672 --name "photon" -d "muon/photon"

