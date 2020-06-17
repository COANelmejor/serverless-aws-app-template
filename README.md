# serverless-aws-app-template

Plantilla para crear una Web App sobre un dominio, usando Serverless para AWS

## Requisitos

* [Cuenta en Amazon Web Services](https://portal.aws.amazon.com/billing/signup#/start)
  * Esta plantilla utiliza AWS para crear la app serverless.
* [Usuario IAM](https://console.aws.amazon.com/iam/home?region=us-east-1#/users)
  * El usuario debe tener algunas políticas activadas. [(ver JSON)](###IAM-Role-Policy)
  * Esta política debe crearse separado del usuario IAM en un [Rol](https://console.aws.amazon.com/iam/home?region=us-east-1#/roles).
* [Serverless CLI](##Serverless-CLI)
  * Interfaz de Linea de comando de Serverless AWS
* ["serverless-domain-manager" plugin](###serverless-domain-manager)
  * Este plugin permite la unión entre la app en Lambda y un dominio.
* [Node ~10.x y NPM ~6.x](https://nodejs.org/)
  * Runtime e Instalador de Paquetes de Node

## Preparando el terreno

### Lee esto primero

Esta plantilla especifica con comentarios en el código que infomración debe ser modificada para poder usarse.

Los comentario aparecen asi: `[{Modificar - Proceso a Actualizar]`.

Puedes usar "`[{Modificar`" el buscador de tu editor para encontrarlos y modificarlos.

**Ejemplos:**

```yml
custom:
  customDomain:
    # {[Modificar - Dominio en el que se trabajará ]}
    domainName: example.com
    basePath: ''
    stage: ${self:provider.stage}
    createRoute53Record: true
```

```js
var mongoose = require('mongoose');
var userDB = require('./models/userModel');

// [{Modificar - Conexión a la Base de Datos}]
mongoose.connect('mongodb+srv://usuario:contrasenia@hostmongodb/db?retryWrites=true&w=majority', {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection
```

### Serverless-CLI

El Framework ["Severless"](https://serverless.com/) debe ser instalado de manera global en la computadora.

```bash
npm install -g serverless
```

#### Configurando Serveless

```bash
serverless config credentials --provider aws --key XXXXXXXXXXXXXXXXXXXX --secret XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX -o --verbose
```

### Serveress-CLI

## Apéndice

### IAM-Role-Policy

```JSON
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Resource": "*",
            "Action": [
                "apigateway:*",
                "cloudformation:CancelUpdateStack",
                "cloudformation:ContinueUpdateRollback",
                "cloudformation:CreateChangeSet",
                "cloudformation:CreateStack",
                "cloudformation:CreateUploadBucket",
                "cloudformation:DeleteStack",
                "cloudformation:Describe*",
                "cloudformation:EstimateTemplateCost",
                "cloudformation:ExecuteChangeSet",
                "cloudformation:Get*",
                "cloudformation:List*",
                "cloudformation:UpdateStack",
                "cloudformation:UpdateTerminationProtection",
                "cloudformation:ValidateTemplate",
                "dynamodb:CreateTable",
                "dynamodb:DeleteTable",
                "dynamodb:DescribeTable",
                "ec2:AttachInternetGateway",
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:CreateInternetGateway",
                "ec2:CreateNetworkAcl",
                "ec2:CreateNetworkAclEntry",
                "ec2:CreateRouteTable",
                "ec2:CreateSecurityGroup",
                "ec2:CreateSubnet",
                "ec2:CreateTags",
                "ec2:CreateVpc",
                "ec2:DeleteInternetGateway",
                "ec2:DeleteNetworkAcl",
                "ec2:DeleteNetworkAclEntry",
                "ec2:DeleteRouteTable",
                "ec2:DeleteSecurityGroup",
                "ec2:DeleteSubnet",
                "ec2:DeleteVpc",
                "ec2:Describe*",
                "ec2:DetachInternetGateway",
                "ec2:ModifyVpcAttribute",
                "events:DeleteRule",
                "events:DescribeRule",
                "events:ListRuleNamesByTarget",
                "events:ListRules",
                "events:ListTargetsByRule",
                "events:PutRule",
                "events:PutTargets",
                "events:RemoveTargets",
                "iam:CreateRole",
                "iam:DeleteRole",
                "iam:DeleteRolePolicy",
                "iam:GetRole",
                "iam:PassRole",
                "iam:PutRolePolicy",
                "iot:CreateTopicRule",
                "iot:DeleteTopicRule",
                "iot:DisableTopicRule",
                "iot:EnableTopicRule",
                "iot:ReplaceTopicRule",
                "kinesis:CreateStream",
                "kinesis:DeleteStream",
                "kinesis:DescribeStream",
                "lambda:*",
                "logs:CreateLogGroup",
                "logs:DeleteLogGroup",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:FilterLogEvents",
                "logs:GetLogEvents",
                "s3:CreateBucket",
                "s3:DeleteBucket",
                "s3:DeleteBucketPolicy",
                "s3:DeleteObject",
                "s3:DeleteObjectVersion",
                "s3:GetObject",
                "s3:GetObjectVersion",
                "s3:ListAllMyBuckets",
                "s3:ListBucket",
                "s3:PutBucketNotification",
                "s3:PutBucketPolicy",
                "s3:PutBucketTagging",
                "s3:PutBucketWebsite",
                "s3:PutEncryptionConfiguration",
                "s3:PutObject",
                "sns:CreateTopic",
                "sns:DeleteTopic",
                "sns:GetSubscriptionAttributes",
                "sns:GetTopicAttributes",
                "sns:ListSubscriptions",
                "sns:ListSubscriptionsByTopic",
                "sns:ListTopics",
                "sns:SetSubscriptionAttributes",
                "sns:SetTopicAttributes",
                "sns:Subscribe",
                "sns:Unsubscribe",
                "states:CreateStateMachine",
                "states:DeleteStateMachine",
                "ses:*"
            ]
        }
    ]
}
```