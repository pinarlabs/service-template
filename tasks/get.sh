curl https://codeload.github.com/pinarlabs/service-template/zip/main --output dl.zip
unzip dl.zip
cp -a service-template/. .
rm -r service-template
rm dl.zip