#!/usr/bin/env sh

# 终止一个错误
set -e

# 构建
yarn build

rm -rf dianligegege.github.io

mkdir dianligegege.github.io

# 进入生成的构建文件夹
# cd docs/.vuepress/dist

cp docs/.vuepress/dist/* dianligegege.github.io

# 如果你是要部署到自定义域名
# echo 'www.example.com' > CNAME

cd dianligegege.github.io

git add .
git commit -m $0

git push -f git@github.com:dianligegege/dianligegege.github.io.git master

# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -