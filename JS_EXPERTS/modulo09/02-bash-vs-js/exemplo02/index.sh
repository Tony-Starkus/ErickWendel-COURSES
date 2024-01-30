sudo docker run -p "8080:80" -d nginx
sleep .5
curl --silent localhost:8080

CONTAINER_ID=$(sudo docker ps | grep nginx | awk '{print $1}')

echo logs
echo $CONTAINER_ID | xargs -I {id} sudo docker logs {id}

echo rm
echo $CONTAINER_ID | xargs -I {id} sudo docker rm -f logs {id}
