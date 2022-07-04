FROM golang:1.13.1-alpine3.10 AS builder

WORKDIR /app

COPY *.go .

RUN go mod init app

RUN go build -o /codeeducation

# -------------------------------------------------------

FROM portainer/base:latest

WORKDIR /

COPY --from=builder /codeeducation /codeeducation

EXPOSE 8080

ENTRYPOINT ["/codeeducation"]