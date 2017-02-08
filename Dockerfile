FROM alpine:3.5

EXPOSE 4000/tcp
CMD ["./hitman"]

WORKDIR /app
COPY . /app
