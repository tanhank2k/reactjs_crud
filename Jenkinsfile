pipeline {
    agent { node { label 'nodejs-slave' } }
    
    environment {
        APP_NAME = 'reactjs_hello_world'
        GIT_COMMIT_ID = '' // Placeholder for commit ID, will be set dynamically
        DOCKER_IMAGE = ''  // Placeholder for image name with tag
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials' // Replace with your Jenkins credential ID
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Check out the repository and get the commit ID
                checkout scm
                script {
                    // Retrieve the short commit ID
                    GIT_COMMIT_ID = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    // Define the Docker image with the commit ID suffix
                    DOCKER_IMAGE = "tanhank2k1/${APP_NAME}:${GIT_COMMIT_ID}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install necessary npm packages
                sh 'npm install'
            }
        }
        
        stage('Build Application') {
            steps {
                // Build the React.js application for production
                sh 'npm run build'
            }
        }
        
        stage('Docker Build & Push') {
            steps {
                script {
                    // Authenticate with Docker using credentials
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Login to Docker
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                        
                        // Build the Docker image with the commit ID tag
                        sh "docker build -t ${DOCKER_IMAGE} ."
                        
                        // Push the Docker image to the repository
                        sh "docker push ${DOCKER_IMAGE}"
                        
                        // Logout of Docker
                        sh "docker logout"
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'The pipeline has completed successfully!'
        }
        failure {
            echo 'The pipeline has failed. Please check the logs.'
        }
    }
}
