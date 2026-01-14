# Hotstar Clone - Secure CI/CD Pipeline with DevSecOps

A React-based Hotstar clone application implementing a complete DevSecOps CI/CD pipeline with security scanning, containerization, and Kubernetes deployment.

## 🚀 Features

- **React Frontend**: Modern UI mimicking Hotstar's interface
- **Movie/Content Browsing**: Genre-based content organization
- **Responsive Design**: Mobile and desktop compatible
- **TMDB Integration**: Real movie data via TMDB API

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **HTTP Client**: Axios 1.13.2
- **Build Tool**: React Scripts 5.0.1
- **Containerization**: Docker
- **Orchestration**: Kubernetes (EKS)
- **CI/CD**: Jenkins
- **Security Scanning**: SonarQube, OWASP Dependency Check, Docker Scout

## 📋 Prerequisites

- Node.js (Alpine-based for Docker)
- Docker
- Kubernetes cluster (AWS EKS)
- Jenkins with required plugins
- SonarQube server
- Docker Hub account

## 🔧 Installation

### Local Development

```bash
# Clone the repository
git clone https://github.com/monikaspawar/hotstar-application.git
cd hotstar

# Install dependencies
npm install

# Start development server
npm start
```

The application will run on `http://<AWS-SERVER-PUBLIC-IP>:3000`

### Using Installation Scripts

```bash
cd installation-scripts

# Make scripts executable
chmod +x permissionexecute.sh
./permissionexecute.sh

# Install required tools
./docker.sh
./kubectl.sh
./jenkins.sh
./awscli.sh
./eksctl.sh
```

## 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t hotstar .

# Run container
docker run -d -p 3000:3000 --name hotstar hotstar
```

Access the application at: `http://<AWS-SERVER-PUBLIC-IP>:3000`

## ☸️ Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f K8S/main.yml

# Apply ServiceMonitor for Prometheus
kubectl apply -f K8S/hotstar-servicemonitor.yml
```

## 🔐 DevSecOps Pipeline

The Jenkins pipeline includes:

1. **Clean Workspace**: Fresh build environment
2. **Source Code Checkout**: Pull from GitHub
3. **SonarQube Analysis**: Code quality and security analysis
4. **Quality Gate**: Enforce quality standards
5. **Dependency Installation**: npm install
6. **OWASP Dependency Check**: Vulnerability scanning
7. **Docker Scout FileSystem Scan**: Pre-build security scan
8. **Docker Build & Push**: Container image creation
9. **Docker Scout Image Scan**: Post-build security analysis
10. **Container Deployment**: Automated deployment

### Pipeline Configuration

```groovy
tools {
    jdk 'jdk'
    nodejs 'nodejs'
}

environment {
    SCANNER_HOME = tool 'sonar-scanner'
}
```

## 📁 Project Structure

```
hotstar/
├── src/
│   ├── components/       # React components (Banner, Nav, Genre, etc.)
│   ├── images/          # Static images
│   ├── App.js           # Main application component
│   └── index.js         # Entry point
├── public/
│   └── index.html       # HTML template
├── K8S/
│   ├── main.yml         # Kubernetes deployment manifest
│   ├── Jenkinsfile      # CI/CD pipeline definition
│   └── hotstar-servicemonitor.yml
├── installation-scripts/ # Setup scripts for tools
├── Dockerfile           # Container definition
└── package.json         # Dependencies and scripts
```

## 🧪 Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🔒 Security Features

- **SonarQube**: Static code analysis
- **OWASP Dependency Check**: Known vulnerability detection
- **Docker Scout**: Container security scanning
- **Quality Gates**: Automated quality enforcement

## 🌐 Environment Variables

Configure the following for TMDB API integration:
- TMDB API Key (in `request.jsx` or environment)

## 📊 Monitoring

ServiceMonitor configured for Prometheus metrics collection on the Kubernetes cluster.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is for educational purposes.

## 👥 Author

Monika Pawar

## 🔗 Links

- GitHub Repository: https://github.com/monikaspawar/hotstar-application.git
- Docker Hub: monikasapawar/hotstar

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.

## 🔧 Troubleshooting

**Image Pull Issues**:
```bash
# Check image availability
docker pull monikasapawar/hotstar:latest
```
