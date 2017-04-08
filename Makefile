.PHONY: docs test

all: clean target

run: target
	java -jar target/photon-*-standalone.jar --muon.url=wibble://happy


build: target
target:
	$(shell cp `lein do clean, cljsbuild once, uberjar | sed -n 's/^Created \(.*standalone\.jar\)/\1/p'` target/photon.jar)

docker:
	docker build . -t photon

publish: clean build docker
ifndef VERSION
	$(error VERSION is undefined for Photon Release)
endif
	docker tag photon simplicityitself-muon-image.jfrog.io/photon:$(VERSION)
	docker tag photon simplicityitself-muon-image.jfrog.io/photon:latest
	docker push simplicityitself-muon-image.jfrog.io/photon:latest
	docker push simplicityitself-muon-image.jfrog.io/photon:$(VERSION)


clean:
	lein clean
	rm -fR resources/public/ui/js

test: target
	lein midje
