FROM golang:latest

WORKDIR /app

COPY . .

RUN go mod init app

RUN go build -o /codeeducation

EXPOSE 8080

CMD ["/codeeducation"]