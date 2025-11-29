pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    docker.build("hotstar-app:${BUILD_NUMBER}")
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    docker.image("hotstar-app:${BUILD_NUMBER}").inside {
                        sh 'npm test'
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh 'docker stop hotstar-app || true'
                    sh 'docker rm hotstar-app || true'
                    sh "docker run -d --name hotstar-app -p 3000:3000 hotstar-app:${BUILD_NUMBER}"
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker system prune -f'
        }
    }
}