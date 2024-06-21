provider "aws" {
  region     = "us-west-1"
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_KEY_ID
}
resource "aws_vpc" "testodogwu_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "testodogwu-vpc"
  }
}

 
resource "aws_subnet" "public_subnet" {
  vpc_id            = aws_vpc.testodogwu_vpc.id
  cidr_block        = "10.0.1.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "public-subnet"
  }
}
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.testodogwu_vpc.id
  tags = {
    Name = "testodogwu-igw"
  }
}
 
resource "aws_security_group" "instance_sg" {
  name        = "instance-sg"
  description = "Security group for EC2 instance"
  vpc_id      = aws_vpc.testodogwu_vpc.id
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
  ingress {
    description = "Allow app (port 3000) from anywhere"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Adjust CIDR block as per your needs (e.g., restrict to specific IPs)

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
resource "aws_route_table" "testodogwu_route_table" {
  vpc_id = aws_vpc.testodogwu_vpc.id
 
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}
 
# Associate Subnet with Route Table
resource "aws_route_table_association" "my_subnet_association" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.testodogwu_route_table.id
}
 
resource "aws_instance" "testodogwuInstance" {
  ami           = "{ami_id}"  
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public_subnet.id
  tags = {
    Name = "testodogwuInstance"
  }
  vpc_security_group_ids = [aws_security_group.instance_sg.id]
  user_data = file("data.sh")
}
output "instance_public_ip" {
  value = aws_instance.testodogwuInstance.public_ip
}
