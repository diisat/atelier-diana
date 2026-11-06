FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -B dependency:go-offline
COPY src ./src
RUN mvn -B package -DskipTests

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
RUN groupadd --system atelier && useradd --system --gid atelier atelier
COPY --from=build /app/target/atelier-1.0.0.jar app.jar
USER atelier
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
