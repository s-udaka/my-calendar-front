FROM node:14-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
# リソース節約のため先にyarn installを実施
RUN yarn install
# build時に必要なディレクトリ・ファイルだけコピー
COPY public/ ./public/
COPY src/ ./src/
COPY .env.prod .
# eslintでエラーが出るため一旦コピー実施
COPY .eslintrc.json .
COPY .eslintignore .
# awsの認証情報ファイルはroot配下にコピー
COPY .aws/ /root/.aws/
# AWSSDKで認証情報を読み込めるようにするため
ENV AWS_SDK_LOAD_CONFIG=1
RUN yarn build

FROM nginx:1.15-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
# フォアグラウンドで動くように
CMD ["nginx", "-g", "daemon off;"]
