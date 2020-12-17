FROM node:10-alpine

WORKDIR /app/

COPY --from=builder /app .

COPY --from=builder /app .

EXPOSE 4001

CMD ["node","src/"]