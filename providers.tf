terraform {
  required_providers {
   kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">=2.31.0"
    }
    aws = {
      version = "5.54.1"
    }
  }
}
