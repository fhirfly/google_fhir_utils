const {google} = require('googleapis');
const healthcare = google.healthcare('v1');

module.exports.importFhirResources = async (gcs_uri, cloudRegion, projectId, datasetId, fhirStore) =>
 {
    const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStore}`;
    try {
        const auth = await google.auth.getClient({
          scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
        google.options({auth, headers: {'Content-Type': 'application/fhir+json'}});
  
        // TODO(developer): uncomment these lines before running the sample
        const request = {
            name,
            resource: {
            contentStructure: 'RESOURCE',
            gcsSource: {
                uri: `gs://${gcsUri}`,
            },
            },
        };
        const operation = await healthcare.projects.locations.datasets.fhirStores.import(
            request
        );
        const operationName = operation.data.name;        
        const operationRequest = {name: operationName};        
        // Wait twenty seconds for the LRO to finish.
        await sleep(20000);
        // Check the LRO's status
        const operationStatus = await healthcare.projects.locations.datasets.operations.get(
            operationRequest
        );
        const success = operationStatus.data.metadata.counter.success;
        if (typeof success !== 'undefined') {
            console.log(
            `Import FHIR resources succeeded. ${success} resources imported.`
            );
        } else {
            console.log(
            'Imported FHIR resources failed. Details available in Cloud Logging at the following URL:\n',
            operationStatus.data.metadata.logsUrl
            );
        }
        }
        catch(err){
            console.log(err);
        }
}