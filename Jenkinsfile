pipeline {
    agent {node { label 'nodejs-slave' }}
    environment {
        APP_NAME = 'reactjs_hello_world'
        DOCKER_IMAGE = "tanhank2k1/${APP_NAME}:latest"
    }
    stages {
        stage('Checkout') {
            steps {
                // Check out the repository
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install the necessary npm packages
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                // Run tests (assuming there are tests configured in package.json)
                sh 'npm test'
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
                    // Create a Docker image for the app
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh """
                    if [ \$(docker ps -q -f name=${APP_NAME}) ]; then
                        docker stop ${APP_NAME}
                        docker rm ${APP_NAME}
                    fi
                    """
                    // Example deployment: Run the Docker container
                    sh "docker run -d -p 3000:80 --name ${APP_NAME} ${DOCKER_IMAGE}"
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
