//Node Module to Add ImplementationGuide to FHIR Store
const fs = require('fs');
const {google} = require('googleapis');
const healthcare = google.healthcare('v1');
const cloudRegion = 'us-central1';
const projectId = 'fhirfly';
const datasetId = 'synthea';
const fhirStoreId = 'usdf';
const IG_DIRECTORY = 'C:\\Users\\Richard Braman\\Projects\\igs\\' + fhirStoreId + '\\site\\';
const bFormatNDJSON = false;

async function installIGtoFHIRStore(){
    var FhirIGBundle = createBundle();
    fs.readdir(IG_DIRECTORY, function(err, filenames) {
        if (err) {
        console.log ("Error reading data directory")
        return;
        }
        filenames.forEach(function(filename) {
            if ((filename.startsWith("Structure") || filename.startsWith("ValueSet") || filename.startsWith("CodeSystem")  || filename.startsWith("CapabilityStatement") || filename.startsWith("ImplementationGuide") || filename.startsWith("ImplementationGuide")) && filename.endsWith(".json")){
                try {
                    var content = fs.readFileSync(IG_DIRECTORY + filename);
                    var content = JSON.parse(content.toString());
                    addResourceToBundle(FhirIGBundle, content);
                    console.log("Added Resource to Bundle");
                }
                catch(err){
                    console.log("Error adding resource to bundle");
                }
            }
        });
        writeBundletoFS(FhirIGBundle);
//        const returnBundle = createFhirResource("Bundle", FhirIGBundle);
        console.log(returnBundle);
    });
}

function writeBundletoFS(budle){
    fs.writeFileSync(IG_DIRECTORY + "ig_bundle.json", JSON.stringify(bundle));
}

function createBundle(){
    bundle = {
        "resourceType": "Bundle",
        "type": "transaction",
        "entry": []
    }
    return bundle;
}

function addResourceToBundle(bundle, resource){
    resourceCount = bundle.entry.length;
    bundle.entry[resourceCount] = resource;
}


async function createFhirResource(resourceType, body) {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  // Replace the following body with the data for the resource you want to
  // create.
  google.options({auth, headers: {'Content-Type': 'application/fhir+json'}});

  const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;

  const request = {parent, type: resourceType, requestBody: JSON.stringify(body)};
  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir.create(
    request
  );
  console.log(`Created FHIR resource with ID ${resource.data.id}`);
  console.log(resource.data);
  return;
}

try{
    installIGtoFHIRStore();
    return;
}
catch(err){
    console.log(err);
return;
}