curl https://codeload.github.com/pinarlabs/service-template/zip/main --output dl.zip
unzip dl.zip
rm service-template-main/README.md
rm service-template-main/tasks/get.sh
cp -a service-template-main/. .
rm -r service-template-main
rm dl.zip
