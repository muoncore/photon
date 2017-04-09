FROM clojure:alpine
COPY . /muon/photon
WORKDIR /muon/photon
COPY resources/config.properties.vagrant /muon/photon/config.properties
ENTRYPOINT ["java", "-jar", "target/photon.jar"]
