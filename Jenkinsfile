@Library('shared') _

pipeline {
    agent any

    stages {
        stage("Hello"){
            steps{
                script{
                 hello()   
                }
            }
        }

        stage("Dev") {
            steps {
                echo "Cloning from GitHub"

                git url: "https://github.com/charanaryan/Weather-App.git",
                    branch: "main"

                echo "Cloned successfully!"
            }
        }

        stage("Build") {
            steps {
                echo "This is the build phase"

                sh "docker build -t whether-app:latest ."

                echo "Completed Build Phase!!"
            }
        }

        stage("Test") {
            steps {
                echo "Starting Test Phase"

                echo "Completed Test Phase"
            }
        }

        stage("Deploy") {
            steps {
                echo "Pushing the image to Docker Hub"

                withCredentials([
                    usernamePassword(
                        credentialsId: "dockerHubCred",
                        usernameVariable: "dockerHubUser",
                        passwordVariable: "dockerHubPass"
                    )
                ]) {

                    sh '''
                        echo "$dockerHubPass" | docker login -u "$dockerHubUser" --password-stdin
                        docker image tag whether-app:latest "$dockerHubUser/whether-app:latest"
                        docker push "$dockerHubUser/whether-app:latest"
                    '''
                }

                echo "Pushed to Docker Hub!!"
            }
        }

        stage("Production") {
            steps {
                echo "Starting Production"

                sh '''
                    docker rm -f whether-app || true
                    docker-compose up -d
                '''

                echo "App is production ready"
            }
        }
    }
}
// done
