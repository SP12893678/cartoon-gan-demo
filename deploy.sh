set -e

npm run build

cd dist

git add -A
git commit -m 'deploy'

git push -f https://github.com/SP12893678/cartoon-gan-demo.git master:gh-pages

cd -