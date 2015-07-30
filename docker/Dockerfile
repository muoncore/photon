FROM clojure
COPY ../ /muon/photon
WORKDIR /muon/photon
#CMD echo "muonhost 10.0.2.15" > /etc/hosts
#CMD cp /muon/photon/resources/config.properties.example /muon/photon/resources/config.properties
ENTRYPOINT java -jar /muon/photon/app-standalone.jar
