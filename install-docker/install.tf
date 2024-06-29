# Generate SSH Key Pair
resource "tls_private_key" "docker_key_pair" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "docker_key_pair" {
  key_name   = "docker-keypair"
  public_key = tls_private_key.docker_key_pair.public_key_openssh
}

resource "aws_vpc" "docker_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "docker-vpc"
  }
}

 
resource "aws_subnet" "public_subnet" {
  vpc_id            = aws_vpc.docker_vpc.id
  cidr_block        = "10.0.1.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "public-subnet"
  }
}
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.docker_vpc.id
  tags = {
    Name = "docker-igw"
  }
}
 
resource "aws_security_group" "instance_sg" {
  name        = "instance-sg"
  description = "Security group for EC2 instance"
  vpc_id      = aws_vpc.docker_vpc.id
  ingress {
    description = "Allow SSH from anywhere"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "Allow ICMP from anywhere"
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # Ingress rule to allow traffic to NodePort range (example)
  ingress {
    from_port   = 30000
    to_port     = 32767
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow traffic from any IP address
  }

  # Add an ingress rule for HTTP (port 80) from specific IP range
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"]  # Replace with your IP range in CIDR notation
  }

  # Add an ingress rule for HTTPS (port 443) from specific IP range
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"]  # Replace with your IP range in CIDR notation
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "instance-sg"
  }
}
 
# Create Route Table
resource "aws_route_table" "docker_route_table" {
  vpc_id = aws_vpc.docker_vpc.id
 
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}
 
# Associate Subnet with Route Table
resource "aws_route_table_association" "my_subnet_association" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.docker_route_table.id
}
 
resource "aws_instance" "dockerInstance" {
  ami           = var.AWS_AMI_ID 
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public_subnet.id
  tags = {
    Name = "dockerInstance"
  }
  vpc_security_group_ids = [aws_security_group.instance_sg.id]
  user_data = file("install.sh")
}
output "instance_public_ip" {
  value = aws_instance.dockerInstance.public_ip
}