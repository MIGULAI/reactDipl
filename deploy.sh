rm -r ../public/static
cp -r ./build/static ../public

rm ../resources/views/index.blade.php
cp ../resources/views/index-main.blade.php ../resources/views/index.blade.php

jsfile=$(find ./build/static/js/*.js)
sed -i "s/{budleJsTriger}/$(basename $jsfile)/g" ../resources/views/index.blade.php

cssfile=$(find ./build/static/css/*.css)
sed -i "s/{budleCssTriger}/$(basename $cssfile)/g" ../resources/views/index.blade.php