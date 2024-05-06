pipeline {
    agent any

    environment {
        NODEJS_HOME = "C:\\Program Files\\nodejs" // Chemin complet vers l'installation de Node.js sur Windows
        PATH = "${env.NODEJS_HOME}\\bin;${env.PATH}"
        CHROME_BIN = 'C:\\chemin\\vers\\google-chrome.exe' // Chemin vers le binaire de Chrome
        DOCKER_HUB_REGISTRY = 'docker.io' // URL du registre Docker Hub
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat "${NODEJS_HOME}\\npm install"
                // bat "${NODEJS_HOME}\\npm install jest --save-dev"
                // bat "${NODEJS_HOME}\\npm install bcrypt"
            }
        }

        stage('Fix Permissions') {
            steps {
                // Fixer les permissions pour le répertoire du projet et node_modules
                bat 'icacls . /grant:r Jenkins:(OI)(CI)F /T /C'
            }
        }

        stage('Build') {
            steps {
                // bat 'node app.js'
                bat 'npm run build'
            }
        }

        stage('Build Docker image') {
            steps {
                bat 'docker build -t amalseghaier/departements:latest Dockerfile .'
                // Taguer l'image Docker avec une version
                bat 'docker tag amalseghaier/departements:latest amalseghaier/departements:latest'
            }
        }

        stage('Deploy Docker image') {
            steps {
                script {
                    // Poussez l'image Docker vers Docker Hub
                    withCredentials([string(credentialsId: 'token', variable: 'DOCKER_TOKEN')]) {
                        docker.withRegistry('https://index.docker.io/v1/', '12') {
                            // Poussez les images latest et taguées
                            docker.image('amalseghaier/departements:latest').push('latest')
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build succeeded!'
            // Ajoutez les actions post-build en cas de succès ici
        }

        failure {
            echo 'Build failed!'
            // Ajoutez les actions post-build en cas d'échec ici
        }
    }
}
