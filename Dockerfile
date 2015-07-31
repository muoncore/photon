FROM clojure
COPY . /muon/photon
WORKDIR /muon/photon
CMD cp /muon/photon/resources/config.properties.vagrant /muon/photon/resources/config.properties
ENTRYPOINT ["java"]
CMD ["-jar", "app-standalone.jar"]
