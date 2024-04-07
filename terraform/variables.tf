variable "project_id" {
  description = "The ID of the Google Cloud Platform project"
}

variable "region" {
  description = "The region where the resources will be created"
}
variable "vpc_config" {
  type        = map(any)
  description = "The VPC Configuration"
  default = {
    delete_default_routes_on_create = true
    auto_create_subnetworks         = false
    routing_mode                    = "REGIONAL"
  }
}

variable "subnets" {
  type = list(object({
    name                     = string
    ip_cidr_range            = string
    private_ip_google_access = bool
  }))
}

variable "webapp_route" {
  type        = map(any)
  description = "The webapp route configuration"
}

variable "webapp_route_tags" {
  type = list(string)
}

variable "webapp_route_priority" {
  type = string

}

variable "custom_image_family_name" {
  type = string
}

variable "vm_config" {
  description = "Configuration for the VM instance."
  type = object({
    name         = string
    machine_type = string
    zone         = string
    tags         = list(string)
    disk_type    = string
    disk_size    = number
    allow_http   = bool
    network_tier = string
    subnetwork   = string
  })
}


variable "allowport" {
  description = "Configuration of firewall for the VM instance."
  type = object({
    name          = string
    healthzname   = string
    protocol      = string
    source_ranges = list(string)
    ports         = list(string)
    target_tags   = list(string)
    priority      = number
  })
}

variable "denyall" {
  description = "Configuration off firewall for the VM instance."
  type = object({
    name          = string
    protocol      = string
    source_ranges = list(string)
    priority      = number
  })
}

variable "cloudsql" {
  description = "Configuration options for the Cloud SQL instance."
  type = object({
    name               = string
    database_version   = string
    delete_protection  = bool
    tier               = string
    availability_type  = string
    disk_type          = string
    disk_size          = number
    psc_enabled        = bool
    ipv4_enabled       = bool
    binary_log_enabled = bool
    enabled            = bool
  })
}

variable "database" {
  type = object({
    name   = string
    port   = string
    host   = string
    user   = string
    subnet = string
  })
}

variable "address_type" {
  type = string
}

variable "dns_zone" {
  type = string
}
variable "webapp_password" {
  type = object({
    length  = string
    special = string
  })
}

variable "domain_record" {
  type = object({
    name = string
    type = string
    ttl  = number
  })
}

variable "service_account" {
  type = object({
    id           = string
    scopes       = list(string)
    display_name = string
    iam_bindings = list(string)
  })
}

variable "pubsub_topic" {
  type = object({
    account_id                 = string
    display_name               = string
    name                       = string
    message_retention_duration = string
    role                       = string
  })
}

variable "pubsub_subscription" {
  type = object({
    account_id           = string
    display_name         = string
    name                 = string
    ack_deadline_seconds = number
    role                 = string
  })
}

variable "pubsub_cloudfunction" {
  type = object({
    account_id   = string
    role         = string
    display_name = string
    sqlrole      = string
  })
}

variable "archive_dir" {
  type = object({
    source_dir  = string
    output_path = string
  })
}

variable "cloudfunction" {
  type = object({
    name                          = string
    description                   = string
    runtime                       = string
    entry_point                   = string
    event_type                    = string
    retry_policy                  = string
    max_instance_count            = number
    available_memory              = string
    timeout_seconds               = number
    vpc_connector_egress_settings = string

  })
}
variable "cloudfunction_env" {
  type = object({
    mailgun_user     = string
    mailgun_password = string
  })
}

variable "vpc_connector" {
  type = object({
    name          = string
    ip_cidr_range = string
  })
}

variable "cbucket" {
  type = string
}


variable "autoscalar" {
  type = object({
    name                   = string
    min                    = string
    max                    = string
    cpu_utilization_target = number
    cool_down              = number
  })
}

variable "autohealing" {
  type = object({
    name                = string
    check_interval_sec  = number
    timeout_sec         = number
    healthy_threshold   = number
    unhealthy_threshold = number
    request_path        = string
    port                = string
  })
}


variable "MIG" {

  type = object({
    name               = string
    base_instance_name = string
    target_size        = number
    portname           = string
    port               = number
    initial_delay_sec  = number
    distributions      = list(string)
    dist_type          = string
  })

  default = {
    name               = "appserver-igm-1"
    base_instance_name = "app"
    target_size        = 2
    portname           = "my-port"
    port               = 8080
    initial_delay_sec  = 300
    distributions      = []
    dist_type          = "BALANCED"
  }

}

variable "lb_address" {
  type    = string
  default = "l7-xlb-static-ip"
}

variable "ssl" {
  type = object({
    name    = string
    domains = list(string)
  })
  default = {
    name    = "test-cert"
    domains = ["sravantikanchicsye6225.site."]
  }

}


variable "url_map" {
  type    = string
  default = "l7-xlb-url-map"
}

variable "https_proxy" {
  type    = string
  default = "l7-xlb-target-https-proxy"
}
variable "lb_forwarding_rule" {

  type = object({
    name       = string
    port_range = string
  })
  default = {
    name       = "l7-xlb-forwarding-rule"
    port_range = "443"
  }
}

variable "backend" {
  type = object({
    name                  = string
    protocol              = string
    port_name             = string
    load_balancing_scheme = string
    timeout_sec           = number
    balancing_mode        = string
    capacity_scaler       = number
  })
  default = {
    name                  = "l7-xlb-backend-service"
    protocol              = "HTTP"
    port_name             = "my-port"
    load_balancing_scheme = "EXTERNAL"
    timeout_sec           = 60
    balancing_mode        = "UTILIZATION"
    capacity_scaler       = 1.0

  }
}

