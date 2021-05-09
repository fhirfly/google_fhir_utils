//Node Module
const cloudRegion = 'us-central1';
const projectId = 'fhirfly';
const datasetId = 'synthea';
const fhirStoreId = 'usdf';
const storage = import('./storage_bucket.js');
const importFHIR = import('./import_data.js');

storage.
importFHIR.importFhirResources(gcs_uri, cloudRegion, projectId, datasetId, fhirStore) ;

