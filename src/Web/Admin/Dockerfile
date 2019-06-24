FROM openjdk:8-jdk-alpine AS build
WORKDIR /src/Web/Admin
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM build AS test
RUN ./mvnw clean
RUN ./mvnw test
RUN ./mvnw org.jacoco:jacoco-maven-plugin:prepare-agent sonar:sonar

# build runtime image
FROM openjdk:8-jdk-alpine AS runtime
VOLUME /tmp
ARG DEPENDENCY=/src/Web/Admin/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","Admin.Application"]