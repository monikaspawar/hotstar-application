# Hotstar Application - AWS Deployment

A React-based streaming platform application deployed on AWS using modern DevOps practices including containerization, Kubernetes orchestration, and CI/CD pipelines.

## 🚀 Features

- **React Frontend**: Modern streaming platform UI with movie browsing capabilities
- **Responsive Design**: Mobile-friendly interface with banner, navigation, and content rows
- **Movie Categories**: Latest releases, Disney movies, horror, romance, and more
- **Multi-language Support**: Content available in multiple languages
- **Platform Integration**: Support for various streaming platforms

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18.2.0, CSS3, HTML5
- **HTTP Client**: Axios for API requests
- **Containerization**: Docker
- **Orchestration**: Kubernetes (EKS)
- **CI/CD**: Jenkins Pipeline
- **Monitoring**: Prometheus with ServiceMonitor
- **Cloud Provider**: AWS

### Infrastructure Components
- **AWS EKS**: Kubernetes cluster for container orchestration
- **Docker Hub**: Container registry (`monikasapawar/hotstar`)
- **Load Balancer**: Kubernetes LoadBalancer service
- **Monitoring**: Prometheus metrics collection

## 📋 Prerequisites

- AWS CLI v2
- Docker
- kubectl
- eksctl
- Jenkins
- Node.js 18+
- npm

## 🛠️ Installation & Setup

### 1. Create EC2 Server

1. **Launch EC2 Instance**:
   - Instance Type: `t3.xlarge`
   - Storage: 30GB
   - Security Group: Allow ports 22, 8080, 9000, 3000

2. **Connect to Server**:
```bash
ssh -i your-key.pem ubuntu@your-server-ip
```

### 2. Install Required Tools on Server

Run the installation scripts in order:

```bash
# Make scripts executable
chmod +x installation-scripts/permissionexecute.sh
./installation-scripts/permissionexecute.sh

# Install AWS CLI
./installation-scripts/awscli.sh

# Install Docker
./installation-scripts/docker.sh

# Install kubectl
./installation-scripts/kubectl.sh

# Install eksctl
./installation-scripts/eksctl.sh

# Install Jenkins
./installation-scripts/jenkins.sh
```

### 3. Setup SonarQube Container

```bash
# Run SonarQube container
docker run -d --name sonar -p 9000:9000 sonarqube:lts-community

# Access SonarQube at http://your-server-ip:9000
# Default credentials: admin/admin
# Complete SonarQube setup and create project token
```

### 4. Configure Jenkins

1. **Access Jenkins**:
   - URL: `http://your-server-ip:8080`
   - Get initial password: `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`

2. **Install Required Plugins**:
   - SonarQube Scanner
   - Docker Pipeline
   - OWASP Dependency Check
   - NodeJS

3. **Configure Global Tools**:
   - Add JDK, NodeJS, SonarQube Scanner
   - Configure SonarQube server connection

### 5. Attach IAM User to Server

```bash
# Configure AWS credentials on server
aws configure
# Enter your IAM user credentials:
# AWS_ACCESS_KEY_ID: <your-access-key>
# AWS_SECRET_ACCESS_KEY: <your-secret-key>
# Default region: ap-south-1
# Default output format: json
```

### 2. Local Development (Optional)

```bash
# Clone the repository
git clone https://github.com/monikaspawar/hotstar-application.git
cd hotstar

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### 3. Run Jenkins Pipeline

1. **Create Jenkins Pipeline Job**:
   - New Item → Pipeline
   - Configure SCM: Git repository URL
   - Pipeline script from SCM: `K8S/Jenkinsfile`

2. **Run Pipeline**:
   - Build the project
   - Pipeline will handle: SonarQube analysis, OWASP scan, Docker build/push, deployment

## ☁️ AWS Deployment

### AWS IAM Setup

#### 1. Create IAM User for EKS

1. **Create New IAM User**:
   - Go to AWS Console → IAM → Users → Create User
   - Enter username (e.g., `hotstar-eks-user`)
   - Select "Programmatic access"

2. **Add Required Permissions**:
   - IAM - FullAccess
   - VPC - FullAccess
   - EC2 - FullAccess
   - CloudFormation - FullAccess
   - Administrator - Access

#### 2. Create AWS Credentials

1. **Generate Access Keys**:
   - Go to AWS Console → IAM → Users → Security Credentials
   - Create Access Key for CLI access

2. **Configure AWS CLI**:
```bash
# Configure AWS credentials
aws configure
# Enter:
# AWS_ACCESS_KEY_ID: <your-access-key>
# AWS_SECRET_ACCESS_KEY: <your-secret-key>
# Default region: ap-south-1
# Default output format: json
```

3. **Export Environment Variables** (Alternative):
```bash
export AWS_ACCESS_KEY_ID=<your-access-key>
export AWS_SECRET_ACCESS_KEY=<your-secret-key>
export AWS_DEFAULT_REGION=ap-south-1
```

### EKS Cluster Setup

#### Create EKS Cluster (After Pipeline Success)

1. **Create EKS Cluster**:
```bash
eksctl create cluster \
  --name hotstar-eks-cluster \
  --region ap-south-1 \
  --node-type t2.medium \
  --zones ap-south-1a,ap-south-1b
```

2. **Configure kubectl**:
```bash
aws eks update-kubeconfig --region ap-south-1 --name hotstar-eks-cluster
```

3. **Verify Cluster Access**:
```bash
# Verify cluster access
kubectl get nodes
```

### Kubernetes Deployment

```bash
# Deploy application using main.yml
kubectl apply -f K8S/main.yml

# Check deployment status
kubectl get pods
kubectl get services

# Get LoadBalancer external IP
kubectl get svc hotstar-service
```

### Application Components

- **Deployment**: 2 replicas with hotstar container and metrics exporter
- **Service**: LoadBalancer type exposing port 80
- **ServiceMonitor**: Prometheus monitoring configuration

## 🔄 CI/CD Pipeline

The Jenkins pipeline includes:

1. **Code Quality**: SonarQube analysis with containerized SonarQube server
2. **Security Scanning**: OWASP dependency check
3. **Container Security**: Docker Scout scanning
4. **Build & Push**: Docker image to registry
5. **Deployment**: Automated container deployment

### SonarQube Container Setup

```bash
# Run SonarQube container for automated code analysis
docker run -d --name sonar -p 9000:9000 sonarqube:lts-community

# Access SonarQube at http://your-server-ip:9000
# Complete setup and generate project token for Jenkins integration
```

### Jenkins Pipeline Integration

1. **Configure SonarQube in Jenkins**:
   - Manage Jenkins → Configure System
   - Add SonarQube server: `http://your-server-ip:9000`
   - Add SonarQube token in credentials

2. **Pipeline Execution**:
   - Pipeline automatically triggers on code changes
   - Performs code quality analysis, security scans, and deployment

### Docker Scout Setup

```bash
# Login to Docker Hub
docker login    # Use credentials to login

# Set Docker socket permissions
sudo chmod 777 /var/run/docker.sock

# Install Docker Scout CLI
curl -sSfL https://raw.githubusercontent.com/docker/scout-cli/main/install.sh | sh -s -- -b /usr/local/bin
```

### Pipeline Configuration

```groovy
// Key pipeline stages
- Clean Workspace
- GitHub Checkout
- SonarQube Analysis (Containerized)
- Quality Gate
- Install Dependencies
- OWASP Security Scan
- Docker Scout FileSystem Scan
- Docker Build & Push
- Docker Scout Image Scan
- Container Deployment
```

## 📊 Monitoring

### Helm Installation

1. **Install Helm**:
```bash
# Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Verify installation
helm version
```

### Prometheus Setup with Helm

```bash
# Add Prometheus Helm repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack

# Check Prometheus pods
kubectl get pods -l "release=prometheus"
```

### Grafana Setup with Helm

```bash
# Add Grafana Helm repository
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Grafana
helm install grafana grafana/grafana

# Get Grafana admin password
kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

# Port forward to access Grafana
kubectl port-forward service/grafana 3000:80
```

### ServiceMonitor Configuration

```bash
# Deploy ServiceMonitor for application metrics
kubectl apply -f K8S/hotstar-servicemonitor.yml

# Verify ServiceMonitor
kubectl get servicemonitor
```

### Accessing Monitoring Services

```bash
# Access Prometheus
kubectl port-forward service/prometheus-kube-prometheus-prometheus 9090:9090

# Access Grafana
kubectl port-forward service/grafana 3000:80

# Access application metrics
kubectl port-forward service/hotstar-service 3000:80
```

## 🔒 Security & Ports

### Port Configuration

| Service | Port | Protocol | Description |
|---------|------|----------|-------------|
| Hotstar App | 3000 | HTTP | React application |
| SonarQube | 9000 | HTTP | Code quality analysis |
| Prometheus Metrics | 9100 | HTTP | Node exporter metrics |
| Kubernetes Service | 80 | HTTP | LoadBalancer external port |
| Jenkins | 8080 | HTTP | CI/CD pipeline (if applicable) |

### Security Features

- **OWASP Dependency Check**: Automated vulnerability scanning for dependencies
- **Docker Scout**: Container image security scanning
- **SonarQube**: Static code analysis for security vulnerabilities
- **Kubernetes RBAC**: Role-based access control for cluster resources
- **AWS EKS Security**: Managed Kubernetes with AWS security best practices

### Network Security

```bash
# Ensure proper firewall rules for required ports
# Allow inbound traffic on:
# - Port 3000 (Application)
# - Port 9000 (SonarQube)
# - Port 9100 (Metrics)
# - Port 80 (LoadBalancer)
```

### Security Best Practices

- Use least privilege access for AWS IAM roles
- Regularly update container images
- Monitor security scan results in CI/CD pipeline
- Implement network policies in Kubernetes
- Use secrets management for sensitive data

## 🔧 Configuration

### Environment Variables

- `PORT`: Application port (default: 3000)
- `NODE_ENV`: Environment mode

### Kubernetes Resources

- **CPU**: Not specified (uses cluster defaults)
- **Memory**: Not specified (uses cluster defaults)
- **Replicas**: 2 (configurable in main.yml)

## 🚦 Health Checks

The application includes:
- Container health monitoring via Kubernetes
- Prometheus metrics collection
- Load balancer health checks

## 📁 Project Structure

```
hotstar/
├── src/                    # React source code
│   ├── components/         # React components
│   ├── images/            # Static images
│   └── App.js             # Main application
├── K8S/                   # Kubernetes manifests
│   ├── main.yml           # Deployment & Service
│   ├── hotstar-servicemonitor.yml
│   └── Jenkinsfile        # CI/CD pipeline
├── installation-scripts/  # Setup scripts
├── public/                # Public assets
├── Dockerfile            # Container configuration
└── package.json          # Dependencies
```

## 🔍 Troubleshooting

### Common Issues

1. **Pod Not Starting**:
```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

2. **Service Not Accessible**:
```bash
kubectl get svc
kubectl describe svc hotstar-service
```

3. **Image Pull Issues**:
```bash
# Check image availability
docker pull monikasapawar/hotstar:latest
```
