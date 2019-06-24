FROM microsoft/dotnet:2.2.104-sdk-alpine AS base
RUN apk add --no-cache --update openjdk8-jre nss
RUN dotnet tool install --global dotnet-sonarscanner
ENV PATH "$PATH:/root/.dotnet/tools"

FROM base AS build
WORKDIR /src/Services/Calculation/Calculation.Engine
COPY *.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet build -c Release -o out

FROM base AS test
WORKDIR /src/Services/Calculation/Calculation.Engine.UnitTests
COPY *.csproj ./
RUN dotnet restore
COPY . ./
WORKDIR /src/Services/Calculation/Calculation.Engine.FunctionalTests
COPY *.csproj ./
RUN dotnet restore
COPY . ./
WORKDIR /src/Services/Calculation/Calculation.Engine
COPY *.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet sonarscanner begin /k:"calculation-engine" /o:"nomost80-github" /d:sonar.host.url="https://sonarcloud.io" /d:sonar.login="44aa5a81c720443bb9aeba66c5bd526892317e8e" \
 /d:sonar.tests="../Calculation.Engine.UnitTests,../Calculation.Engine.FunctionalTests" \
 /d:sonar.cs.vstest.reportsPaths="../Calculation.Engine.UnitTests/TestResults/report.trx,../Calculation.Engine.FunctionalTests/TestResults/report.trx"
RUN dotnet build
RUN dotnet test ../Calculation.Engine.UnitTests --logger "trx;LogFileName=report.trx"
RUN dotnet test ../Calculation.Engine.FunctionalTests --logger "trx;LogFileName=report.trx"
RUN dotnet sonarscanner end /d:sonar.login="44aa5a81c720443bb9aeba66c5bd526892317e8e"

FROM build AS publish
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/dotnet:2.2.2-aspnetcore-runtime-alpine AS runtime
WORKDIR /src/Services/Calculation/Calculation.Engine
COPY --from=publish /src/Services/Calculation/Calculation.Engine/out .
ENTRYPOINT ["dotnet", "Calculation.Engine.dll"]