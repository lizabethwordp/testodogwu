#!/bin/bash
# Update the package index
sudo yum update -y

# Install Docker
sudo yum install docker -y

# Start Docker
sudo systemctl start docker

# Add the ec2-user to the docker group
sudo usermod -a -G docker ec2-user

# Enable Docker to start on boot
sudo systemctl enable docker

#Pull the Docker registry image from Docker Hub
sudo docker pull registry:2

#Run the Docker registry container
sudo docker run -d -p 5000:5000 --restart=always --name registry registry:2

#Download the ArgoCD binary
sudo curl -sSL -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64

#Make the downloaded binary executable
sudo chmod +x /usr/local/bin/argocd

#Add the ArgoCD binary to your system’s PATH
cat <<EOL > ~/.bashrc
export PATH=$PATH:/usr/local/bin
EOL

#Reload the .bashrc file to apply the changes
source ~/.bashrc