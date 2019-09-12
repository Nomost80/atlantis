# The project
We had to develop a service oriented architecture with the following goals:
* Send metrics with an Arduino board with an IoT communication protocol (MQTT) to a message broker (emqx)
* Receive sensors metrics and do some aggregations
* Do an admin GUI for managing the customers devices
* Develop a mobile app for displaying the metrics, devices, aggregations based on filters to the customers
* Use OAuth2 authentication (Azure AD B2C)

# Constraints
* Use .NET or Java for some services and use relational databases
* Develop our own "aggregation engine" instead of using technologies like Spark Streaming

# Improvements
* Improve the code quality, we didn't have a lot of time
* Add testing
