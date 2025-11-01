# Simple Messaging App with kafka

## Set up the work enviroment

Run the following commands in your terminal:

```bash
docker compose up
```

To create the topic, in another terminal:

```zsh
sudo docker exec -it broker sh
cd opt/kafka/bin/
./kafka-topics.sh --create --topic message --bootstrap-server broker:29092
```

To create the producer, in another terminal:

```zsh
sudo docker exec -it broker sh
cd opt/kafka/bin/
./kafka-console-producer.sh  --topic message --bootstrap-server broker:29092
```

To create the consumer, in another terminal:

```zsh
sudo docker exec -it broker sh
cd opt/kafka/bin/
./kafka-console-consumer.sh --topic message --from-beginning --bootstrap-server broker:29092
```
