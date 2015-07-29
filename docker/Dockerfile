FROM clojure
COPY . /muon/photon
WORKDIR /muon/photon
CMD echo "muonhost 10.0.2.15" > /etc/hosts
CMD cp /muon/photon/resources/config.properties.example /muon/photon/resources/config.properties
CMD mkdir -p /muon/photon/data
CMD lein cljsbuild once
ENTRYPOINT lein run
