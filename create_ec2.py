import boto3

ec2 = boto3.client(
    'ec2',
    aws_access_key_id=config['aws']['access_key'],
    aws_secret_access_key=config['aws']['secret'],
    region_name=config['aws']['region']
)

logger.debug("Creating EC2 Instance(s)...")
try:
    response = ec2.run_instances(
        ImageId=ec2_config['ubuntu_ami_id'],
        MinCount=1,
        MaxCount=ec2_config["no_of_instances"],
        KeyName=ec2_config['key_pair_id'],
        SecurityGroupIds=[ec2_config['security_group_id']],
        InstanceType=ec2_config['instance_type'],
        SubnetId=ec2_config['subnet_id'],
        Monitoring={'Enabled': True}
    )
except botocore.exceptions.ClientError, err:
    logger.error(err, exc_info=True)
    sys.exit(1)
