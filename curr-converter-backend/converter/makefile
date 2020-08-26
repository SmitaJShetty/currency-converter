#TODO: testing all targets

zone = us-west1-a
appname= currency-converter-api
deploymentname = currency-converter-api-deployment
service_name = currency-converter-api-service
dockerimage = currency-converter-api-image
project_id = currency-converter-23009
machine_type = g1-small
chart_folder= ./converter-chart

.dbld:
   # setup docker build
    docker build --name @dockername .

.drun:
	#run docker container
	docker run --name @dockername -p @portnumber:@portnumber @dockerimage

.gcp_setup: gcp_cluster
	# push docker container to gcp 
	gcloud auth configure-docker
	docker push gcr.io/@project_id/@appname:v1

.gcp_cluster:
	# set up gcp project if not exists - gcp_project_setup 

	# set up gcp config and align to project in gcp

    # setup cluster
	gcloud container clusters create @clustername --zone @zone --machine-type @machine_type
	
.helmb:
	#install helm chart
	helm install @chart_folder convert-chart-1001
	
.helmdry:
	#dry run helm chart
	helm install --dry-run debug @chart_folder convert-chart-1001

.kgp:
	kubectl get pods

.kupdate:

	kubectl apply -f @deploymentname

.gcp-cleanup:
	kubectl delete service/@service_name
	kubectl delete deployments/@deploymentname
	gcloud containers clusters delete @clustername --zone @zone