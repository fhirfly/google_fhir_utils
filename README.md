This is an npi module.

Run 
    npm install
to Install

Run
    node <scriptname>.js
    
Scripts:

1. Add IG to FHIR
add_ig_to_fhir_store.js
Adds specfied Implementation GUIDE to FHIR Store.  This enables Profile Validation on a given FHIR Store in the Google Cloud.   
ImplemetationGuides are downloadable distributions that contain a known file strucuture that defines the IGs data structure  
This file structure consists of JSON files for the following structural profile FHIR Resources: 
  Implemetation Guide
  Structured Definitions, 
  Code Systems, 
  Capability Statements, 
  Value Sets,
  CodeMaps,
The script parses through the specified IG_FOLDER (configured in the script) and organizes the resources into arrays
The script uploads each resource to the FHIR sTORE (configured in the script) with a POST Command to the Resource endpoint.

2.  Add Synthea Patients to FHIR
While google FHIR AI also supports de-identiifcation as a function, we are still rely on outputting from Synthena.  The first script generically 
uploads data from a folder location to Cloud Store and then executes an Import task to import the files from the bucket.



  
