output "public_ip" {
    value =  "Your Ec2 IP is : ${aws_instance.Infra-server.public_ip}"
}
