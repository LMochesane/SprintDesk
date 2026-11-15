# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["SprintDesk.Api.csproj", "./"]
RUN dotnet restore "SprintDesk.Api.csproj"

# Copy the remaining source code and build
COPY . .
RUN dotnet publish "SprintDesk.Api.csproj" -c Release -o /app/publish

# Stage 2: Serve the application
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .

# Set environment variable to listen on port 8080 (Render's default)
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "SprintDesk.Api.dll"]