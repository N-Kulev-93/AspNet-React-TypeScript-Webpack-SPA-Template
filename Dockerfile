FROM mcr.microsoft.com/dotnet/aspnet:10.0.5-noble-chiseled AS base
WORKDIR /app
EXPOSE 8085
EXPOSE 8086

FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine3.23 AS build
WORKDIR /app/src/Api
COPY /src/Api/Api.csproj .
RUN dotnet restore Api.csproj
WORKDIR /app/src/Api
COPY . .
RUN dotnet build Api.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish Api.csproj --no-restore -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_HTTP_PORTS=8085

ENTRYPOINT ["dotnet", "Api.dll"]
