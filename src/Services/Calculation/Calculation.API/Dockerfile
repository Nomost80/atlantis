FROM microsoft/dotnet:2.2.104-sdk-alpine AS base
RUN apk add --no-cache --update openjdk8-jre nss
RUN dotnet tool install --global dotnet-sonarscanner
ENV PATH "$PATH:/root/.dotnet/tools"

FROM base AS build
WORKDIR /src/Services/Calculation/Calculation.API
COPY *.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet build -c Release -o out

FROM base AS test
WORKDIR /src/Services/Calculation/Calculation.API.UnitTests
COPY *.csproj ./
RUN dotnet restore
COPY . ./
WORKDIR /src/Services/Calculation/Calculation.API.FunctionalTests
COPY *.csproj ./
RUN dotnet restore
COPY . ./
WORKDIR /src/Services/Calculation/Calculation.API
COPY *.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet sonarscanner begin /k:"calculation-api" /o:"nomost80-github" /d:sonar.host.url="https://sonarcloud.io" /d:sonar.login="44aa5a81c720443bb9aeba66c5bd526892317e8e" \
 /d:sonar.projectBaseDir=. /d:sonar.sources="." /d:.sonar.tests="../Calculation.API.UnitTests,../Calculation.API.FunctionalTests" \
 /d:sonar.cs.vstest.reportsPaths="../Calculation.API.UnitTests/TestResults/report.trx,../Calculation.API.FunctionalTests/TestResults/report.trx"
RUN dotnet build
RUN dotnet test ../Calculation.API.UnitTests --logger "trx;LogFileName=report.trx"
RUN dotnet test ../Calculation.API.FunctionalTests --logger "trx;LogFileName=report.trx"
RUN dotnet sonarscanner end /d:sonar.login="44aa5a81c720443bb9aeba66c5bd526892317e8e"

FROM build AS publish
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/dotnet:2.2.2-aspnetcore-runtime-alpine AS runtime
WORKDIR /src/Services/Calculation/Calculation.API
COPY --from=publish /src/Services/Calculation/Calculation.API/out .
ENTRYPOINT ["dotnet", "Calculation.API.dll"]