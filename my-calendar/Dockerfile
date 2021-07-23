FROM node:14-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
# リソース節約のため先にyarn installを実施
RUN yarn install
# docker build時に環境変数を受け取れるように宣言
ARG aws_access_key
ARG aws_secret_key
# 環境変数にセット
ENV REACT_APP_AWS_ACCESS_KEY=$aws_access_key
ENV REACT_APP_AWS_SECRET_KEY=$aws_secret_key
# build時に必要なディレクトリ・ファイルだけコピー
COPY public/ ./public/
COPY src/ ./src/
COPY .env.prod .
# eslintでエラーが出るため一旦コピー実施
COPY .eslintrc.json .
COPY .eslintignore .
RUN yarn build

FROM nginx:1.15-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
# フォアグラウンドで動くように
CMD ["nginx", "-g", "daemon off;"]
