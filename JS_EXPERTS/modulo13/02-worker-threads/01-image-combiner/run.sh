IMAGE_URL="https://w7.pngwing.com/pngs/144/202/png-transparent-heart-icon-symbol-love-red-transparent-background-vector-graphics-design-element-sign.png"
BACKGROUND_URL="https://w7.pngwing.com/pngs/273/1008/png-transparent-simple-page-border-transparent-background-curves.png"

curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
npx autocannon --renderStatusCodes -c500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"