pipeline {

    agent any

     tools {
        'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 'docker'
     }

    stages{

        stage('Checkout'){
           steps{
                checkout scm
           }
        }

        stage('Npm install'){
          steps{
            nodejs('afb-node') {
              sh label: "npm install", script: 'npm install'
            }
          }
        }

        stage('Packaging'){
            steps{
                nodejs('afb-node') {
                    sh label: "build", script: 'ng build --prod --configuration=production --base-href /'
                }
            }
        }

        stage('Image docker en Construction...'){
	  when{
            branch 'master'
          }
          steps{
            script {

              def PROJECT = readJSON file: 'package.json'

              withDockerRegistry(credentialsId: "registry_auth", toolName: "docker", url: "https://gitlab.com") {
                  sh label: 'Docker build', script: "docker build -t gitlab.com/${PROJECT.name}:${PROJECT.version} .";
                  sh label: 'Push sur registry', script: "docker push gitlab.com/${PROJECT.name}:${PROJECT.version}"
                  sh label: 'Creation tag sur registry', script: "docker tag gitlab.com/${PROJECT.name}:${PROJECT.version} gitlab.com/${PROJECT.name}:latest"
                  sh label: 'Push sur registry image latest', script: "docker push gitlab.com/${PROJECT.name}:latest"
                  sh label: 'suppression de l\'image docker créee', script: "docker image rm gitlab.com/${PROJECT.name}:${PROJECT.version}"
              }
            }
          }
        }

      stage('Deploiement Image docker'){
	        when{
               branch 'master'
             }
             steps{
                script {
                    withDockerRegistry(credentialsId: "registry_auth", toolName: "docker", url: "https://gitlab.com") {
                        sh label: 'Docker Stack Deploy', script: 'docker stack deploy --with-registry-auth --compose-file docker-stack.yml devops';
                    }
                }
            }
         }
    }

    post{
        always{
            echo 'Cleaning the workspace ...'
            cleanWs notFailBuild: true
        }
    }
}
