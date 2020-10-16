curl https://codeload.github.com/pinarlabs/service-template/zip/main --output dl.zip
unzip dl.zip
rm service-template/README.md
rm service-template/tasks/get.sh
cp -a service-template/. .
rm -r service-template
rm dl.zip
