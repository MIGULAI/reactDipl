# оновлення папки статік
rm -r ../public/static
cp -r ./build/static ../public

# оновлення в'юшки
rm ../resources/views/index.blade.php
cp ../resources/views/index-main.blade.php ../resources/views/index.blade.php

# підключення js файлу до в'юшки
jsfile=$(find ./build/static/js/*.js)
sed -i "s/{budleJsTriger}/$(basename $jsfile)/g" ../resources/views/index.blade.php

# підключення css файлу до в'юшки
cssfile=$(find ./build/static/css/*.css)
sed -i "s/{budleCssTriger}/$(basename $cssfile)/g" ../resources/views/index.blade.php

# оновлення веб маніфесту
rm ../public/manifest.webmanifest
cp ./build/manifest.webmanifest ../public

# оновлення фавікону
rm ../public/favicon.ico
cp ./build/favicon.ico ../public

# оновлення png для маніфесту
