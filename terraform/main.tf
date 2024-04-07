terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.34.0"
    }
  }
}


provider "google" {
  project = var.project_id
  region  = var.region

}

provider "google-beta" {
  project = var.project_id
  region  = var.region

}

resource "google_compute_network" "my_vpc" {
  name = var.vpc_config.name
  delete_default_routes_on_create = var.vpc_config.delete_default_routes_on_create
  auto_create_subnetworks         = var.vpc_config.auto_create_subnetworks
  routing_mode                    = var.vpc_config.routing_mode

}

resource "google_compute_subnetwork" "subnets" {
  for_each = { for idx, subnet in var.subnets : idx => subnet }

  name                     = each.value.name
  region                   = var.region
  network                  = google_compute_network.my_vpc.self_link
  ip_cidr_range            = each.value.ip_cidr_range
  private_ip_google_access = each.value.private_ip_google_access
}


resource "google_compute_route" "webapp_route" {
  name             = var.webapp_route.name
  network          = google_compute_network.my_vpc.self_link
  dest_range       = var.webapp_route.dest_range
  next_hop_gateway = var.webapp_route.next_hop_gateway
  priority         = var.webapp_route_priority
  description      = "Route for webapp subnet"
  tags = var.webapp_route_tags
}

data "google_compute_image" "my_image" {
  family      = var.custom_image_family_name
  most_recent = true
}

resource "google_compute_firewall" "allow_8080" {
  name    = var.allowport.name
  network = google_compute_network.my_vpc.name
  allow {
    protocol = var.allowport.protocol
    ports    = var.allowport.ports
  }

  priority      = var.allowport.priority
  target_tags   = var.allowport.target_tags
  source_ranges = [google_compute_global_address.default.address]
  depends_on    = [google_compute_global_address.default]
}