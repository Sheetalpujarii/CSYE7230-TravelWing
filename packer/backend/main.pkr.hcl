packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "> 1"
    }
  }
}

variable "project_id" {
  description = "Google Cloud project ID"
}

variable "zone" {
  description = "Zone where the image will be built"
}

variable "disk_size" {
  description = "Disk size in GB"
  default     = 20
}

variable "disk_type" {
  description = "Disk type"
  default     = "pd-standard"
}

variable "source_image_family" {
  description = "The source image family for the machine image"
  default     = "centos-stream-8"
}

variable "image_family" {
  description = "Assigning a image family"
  default     = "csye6225"
}

variable "network" {
  description = "The network where the VM will be created"
  default     = "default"
}

variable "ssh_username" {
  description = "The username for SSH access"
  default     = "ubuntu"
}

variable "DB_PASSWORD" {
  description = "The username for SSH access"
  default     = "test"
}

variable "DB_USER" {
  description = "The username for SSH access"
  default     = "test"
}

variable "machine_type" {
  description = "The username for SSH access"
  default     = "e2-medium"
}

source "googlecompute" "centos-example" {
  project_id          = var.project_id
  source_image_family = var.source_image_family
  image_name          = "csye7305-${formatdate("YYYY-MM-DD-hh-mm-ss", timestamp())}"
  zone                = var.zone
  disk_size           = var.disk_size
  disk_type           = var.disk_type
  image_family        = var.image_family
  machine_type        = var.machine_type
  network             = var.network
  ssh_username        = var.ssh_username
}

build {
  sources = ["source.googlecompute.centos-example"]


  provisioner "shell" {
    scripts = ["packerconfig/scripts/usergroup.sh"]

  }

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/backend_main.zip"
  }
  provisioner "shell" {
    scripts = ["packerconfig/scripts/setup.sh", "packerconfig/scripts/webapp.sh"]
  }

  post-processor "manifest" {
    output = "image_manifest.json"
  }
}
